import React from 'react';
import MarineWeatherClient from './MarineWeatherClient';
import { getCurrentHourReadable } from '../utils/helperFunctions';
import { MarineWeatherData } from '../utils/types';

type ApiConfig = {
  name: string;
  endpoint: string;
  fields: string[];
};

async function fetchAndValidate(api: ApiConfig): Promise<Record<string, number | string>> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL || ''}${api.endpoint}?fields=${api.fields.join(',')}`;
  const res = await fetch(url, { cache: 'no-store' });
  const json = await res.json();

  const missing = api.fields.filter(field => json[field] === undefined);
  if (missing.length > 0) {
    throw new Error(`Missing ${api.name} fields: ${missing.join(', ')}`);
  }

  return json;
}

export default async function MarineWeatherServer() {
  try {
    const apis: ApiConfig[] = [
      {
        name: 'marine',
        endpoint: '/api/marine',
        fields: ['wave_height', 'sea_surface_temperature'],
      },
      {
        name: 'wind',
        endpoint: '/api/wind',
        fields: ['wind_speed_10m', 'uv_index', 'temperature_2m'],
      },
    ];

    const results = await Promise.all(apis.map(api => fetchAndValidate(api)));

    const combinedData = results.reduce((acc, cur) => ({ ...acc, ...cur }), {});
    const data: MarineWeatherData = {
      ...(combinedData as Omit<MarineWeatherData, 'time'>),
      time: getCurrentHourReadable(),
    };

    return <MarineWeatherClient data={data} />;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return <p className="text-red-600">Error loading weather data: {message}</p>;
  }
}
