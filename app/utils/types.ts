export type MarineWeatherData = {
  wave_height: number;
  wind_speed_10m: number;
  uv_index: number;
  temperature_2m: number;
  sea_surface_temperature: number;
  time: string;
};

export type MarineWeatherWithoutTime = Omit<MarineWeatherData, 'time'>;
