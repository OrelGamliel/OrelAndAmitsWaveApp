import { NextResponse } from 'next/server';

const TEL_AVIV = { lat: 32.08, lon: 34.78 };

export async function GET(request: Request) {
  try {
    const urlObj = new URL(request.url);
    const fieldsParam = urlObj.searchParams.get('fields');
    // default fields if none specified
    const fields = fieldsParam ? fieldsParam.split(',') : ['wind_speed_10m', 'uv_index', 'temperature_2m'];

    // build URL dynamically with requested fields
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${TEL_AVIV.lat}&longitude=${TEL_AVIV.lon}&hourly=${fields.join(',')}&timezone=auto`;

    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch from Open-Meteo' }, { status: 500 });
    }

    const json = await response.json();

    if (!json.hourly?.time) {
      return NextResponse.json({ error: 'No hourly time data found' }, { status: 404 });
    }

    // format current date hour in API format
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

    const missingFields = fields.filter(field => !json.hourly[field]);
    if (missingFields.length > 0) {
      return NextResponse.json({ error: `No data found for fields: ${missingFields.join(', ')}` }, { status: 404 });
    }

    const result: Record<string, any> = {};
    for (const field of fields) {
      let value = json.hourly[field][index];

      if (field === 'wind_speed_10m') {
        value = Math.trunc(value);
      }

      result[field] = value;
    }

    return NextResponse.json(result, { status: 200 });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
