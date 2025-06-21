import { NextRequest, NextResponse } from 'next/server';

const TEL_AVIV = { lat: 32.08, lon: 34.78 };

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fieldsParam = searchParams.get('fields');
    
    const fields = fieldsParam ? fieldsParam.split(',') : ['wave_height', 'sea_surface_temperature'];

    const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${TEL_AVIV.lat}&longitude=${TEL_AVIV.lon}&hourly=${fields.join(',')}&timezone=auto`;

    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch marine data' }, { status: 500 });
    }

    const json = await res.json();
    const hourly = json.hourly;

    if (!hourly?.time) {
      return NextResponse.json({ error: 'No hourly time data found' }, { status: 404 });
    }

    // Format time for matching
    const tz = 'Asia/Jerusalem';
    const formatter = new Intl.DateTimeFormat('sv-SE', {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
    });

    const [date, hour] = formatter.format(new Date()).split(' ');
    const now = `${date}T${hour}`;

    const index = hourly.time.findIndex((t: string) => t.startsWith(now));
    if (index === -1) {
      return NextResponse.json({ error: `No data found for time: ${now}` }, { status: 404 });
    }

    const response: Record<string, any> = {
      time: hourly.time[index],
    };

    const missingFields: string[] = [];

    for (const field of fields) {
      const value = hourly[field]?.[index];
      if (value === undefined) {
        missingFields.push(field);
      } else {
        response[field] = value;
      }
    }

    if (missingFields.length > 0) {
      return NextResponse.json({ error: `No data found for: ${missingFields.join(', ')}` }, { status: 404 });
    }
    console.log(response,"responseresponseresponse");

    return NextResponse.json(response, { status: 200 });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Internal server error', detail: message }, { status: 500 });
  }
}