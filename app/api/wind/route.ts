import { NextResponse } from 'next/server';

const TEL_AVIV = { lat: 32.08, lon: 34.78 };

export async function GET() {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${TEL_AVIV.lat}&longitude=${TEL_AVIV.lon}&hourly=wind_speed_10m,uv_index,temperature_2m&timezone=auto`;

    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch from Open-Meteo' }, { status: 500 });
    }

    const json = await response.json();

    if (!json.hourly?.time || !json.hourly.wind_speed_10m || !json.hourly.uv_index) {
      return NextResponse.json({ error: 'Incomplete weather data' }, { status: 404 });
    }

    const tz = 'Asia/Jerusalem';
    const formatter = new Intl.DateTimeFormat('sv-SE', {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
    });
    const parts = formatter.format(new Date()).split(' ');
    const now = `${parts[0]}T${parts[1]}`; // e.g., "2025-06-11T20"

    const index = json.hourly.time.findIndex((t: string) => t.startsWith(now));
    if (index === -1) {
      return NextResponse.json({ error: 'No data for current hour' }, { status: 404 });
    }
    console.log(json.hourly,"json.hourlyjson.hourly");
  
    const windSpeedMps = json.hourly.wind_speed_10m[index];
    const uvIndex = json.hourly.uv_index[index];
    const windSpeed = Math.trunc(windSpeedMps);
    const temp = json.hourly.temperature_2m[index]

    return NextResponse.json({ windSpeed, uvIndex,temp }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
