export type MarineWeatherData = {
  waveHeight: number;
  windSpeed: number;
  uvIndex: number;
  temperature: number;
  time: string;
};
export type MarineWeatherWithoutTime = Omit<MarineWeatherData, 'time'>;
