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
