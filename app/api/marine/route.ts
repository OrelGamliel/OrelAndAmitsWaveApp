const TEL_AVIV = { lat: 32.08, lon: 34.78 };

export async function GET() {
  try {
    const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${TEL_AVIV.lat}&longitude=${TEL_AVIV.lon}&hourly=wave_height,wind_wave_height&timezone=auto`;

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch marine data' }), { status: 500 });
    }

    const json = await res.json();

    if (!json.hourly || !json.hourly.time) {
      return new Response(JSON.stringify({ error: 'No hourly data' }), { status: 404 });
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
    const now = `${parts[0]}T${parts[1]}`; // e.g., "2025-06-11T20"

    const index = json.hourly.time.findIndex((t: string) => t.startsWith(now));
    if (index === -1) {
      return new Response(JSON.stringify({ error: 'No data for current hour' }), { status: 404 });
    }

    const waveHeight = json.hourly.wave_height[index];
    const time = json.hourly.time[index];

    return new Response(
      JSON.stringify({ waveHeight, time }),
      { headers: { 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', detail: error.message }),
      { status: 500 }
    );
  }
}
