export function getCurrentHourReadable(timeZone = 'Asia/Jerusalem'): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24-hour format
    timeZone,
  };
  return now.toLocaleTimeString('en-GB', options);
}
export function extractHourFromIsoString(isoString: string): string {
  const timePart = isoString.split('T')[1]; // "05:35"
  const [hour, minute] = timePart.split(':'); // ["05", "35"]
  return `${hour}:${minute}`;
}
function getWaveScore(waveHeight: number) {
  if (waveHeight <= 0.2) return 1;
  if (waveHeight <= 0.5) return 0.9;
  if (waveHeight <= 0.7) return 0.5;
  if (waveHeight <= 0.9) return 0.2;
  return 0; // > 0.9m = bad beach day
}

function getWindScore(windSpeed: number) {
  if (windSpeed <= 10) return 1;
  if (windSpeed <= 22.5) return 0.8;
  if (windSpeed <= 30) return 0.5;
  return 0.2;
}
export function getBeachScore(waveHeight: number, windSpeed: number) {
  const waveScore = getWaveScore(waveHeight);
  const windScore = getWindScore(windSpeed);

  const weighted = waveScore * 0.75 + windScore * 0.25;
  return Math.round(weighted * 10); // 0–10 scale
}

export const getLabel = (score: number) => {
    if (score >= 8) return "🔥 מושלם";
    if (score >= 6) return "😊 טוב מאוד";
    if (score >= 4) return "🤔 ממוצע";
    if (score >= 2) return "😬 לא מומלץ";
    return "❌ שישרוף לו";
  };