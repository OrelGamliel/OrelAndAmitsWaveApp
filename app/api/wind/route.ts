const TEL_AVIV = { lat: 32.08, lon: 34.78 };

export async function GET() {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${TEL_AVIV.lat}&longitude=${TEL_AVIV.lon}&hourly=wind_speed_10m&hourly=uv_index&timezone=auto`;

    const response = await fetch(url);
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch from Open-Meteo' }), { status: 500 });
    }

    const json = await response.json();

    if (!json.hourly || !json.hourly.time || !json.hourly.wind_speed_10m) {
      return new Response(JSON.stringify({ error: 'Incomplete weather data' }), { status: 404 });
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
      return new Response(JSON.stringify({ error: 'No data for current hour' }), { status: 404 });
    }

    const windSpeedMps = json.hourly.wind_speed_10m[index];
    const uvIndex = json.hourly.uv_index[index];
    const windSpeedKph = Math.trunc(windSpeedMps)

    console.log(json,"jsonjsonjsonjson");
    
    return new Response(JSON.stringify({ windSpeed: windSpeedKph,uvIndex:uvIndex }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), { status: 500 });
  }
}
