import React from 'react';

type WeatherDetailsProps = {
  data: Record<string, string | number>;
};

const labelMap: Record<string, string> = {
  wave_height: '🌊 גובה גלים',
  wind_speed_10m: '💨 מהירות רוח',
  uv_index: '🔆 רמת קרינה',
  temperature_2m: '🌡️ טמפרטורה',
  sea_surface_temperature: '🌊 טמפרטורת הים',
};

const unitMap: Record<string, string> = {
  wave_height: ' מטר',
  wind_speed_10m: ' קמ״ש',
  uv_index: '',
  temperature_2m: '°C',
  sea_surface_temperature: '°C',
};

export default function WeatherDetails({ data }: WeatherDetailsProps) {
  return (
    <>
    <div className="my-4 text-sm text-gray-800 space-y-2 bg-blue-50 rounded-lg p-4">
      {Object.entries(data)
        .filter(([key]) => key !== 'time') 
        .map(([key, value]) => (
          <p key={key}>
            <strong>{labelMap[key] ?? key}:</strong> {value}
            {unitMap[key] ?? ''}
          </p>
        ))}
    </div>
    </>
  );
}
