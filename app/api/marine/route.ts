import { NextResponse } from 'next/server';

const TEL_AVIV = { lat: 32.08, lon: 34.78 };

export async function GET() {
  try {
    const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${TEL_AVIV.lat}&longitude=${TEL_AVIV.lon}&hourly=wave_height,wind_wave_height&timezone=auto`;

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch marine data' }, { status: 500 });
    }

    const json = await res.json();

    if (!json.hourly || !json.hourly.time) {
      return NextResponse.json({ error: 'No hourly data' }, { status: 404 });
    }

    // Format current date to match API time format
    const tz = 'Asia/Jerusalem';
    const formatter = new Intl.DateTimeFormat('sv-SE', {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
    });

    const parts = formatter.format(new Date()).split(' ');
    const now = `${parts[0]}T${parts[1]}`; 

    const index = json.hourly.time.findIndex((t: string) => t.startsWith(now));
    if (index === -1) {
      return NextResponse.json({ error: 'No data for current hour' }, { status: 404 });
    }

    const waveHeight = json.hourly.wave_height[index];
    const time = json.hourly.time[index];

    return NextResponse.json({ waveHeight, time }, { status: 200 });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Internal server error', detail: message }, { status: 500 });
  }
}
