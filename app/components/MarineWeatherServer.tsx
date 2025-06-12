import React from 'react';
import MarineWeatherClient from './MarineWeatherClient';
import { getCurrentHourReadable } from '../utils/helperFunctions';
import { MarineWeatherData } from '../utils/types';



export default async function MarineWeatherServer() {
  try {
    const marineRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/marine`, {
      cache: 'no-store',
    });
    const marineJson = await marineRes.json();

    if (!marineJson.waveHeight || !marineJson.time) {
      throw new Error('Failed to get marine data');
    }

    const windRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/wind`, {
      cache: 'no-store',
    });
    const windJson = await windRes.json();

    console.log(windJson.uvIndex,"windJson.uvIndex");
    
    if (!windJson.windSpeed) {
      throw new Error('Failed to get wind speed');
    }

    const data: MarineWeatherData = {
      waveHeight: marineJson.waveHeight,
      windSpeed: windJson.windSpeed,
      uvIndex:windJson.uvIndex,
      time: getCurrentHourReadable(),
    };
    console.log(data,"datadatadata");
    
    return <MarineWeatherClient data={data} />;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return <p className="text-red-600">Error loading weather data: {message}</p>;
  }
}
