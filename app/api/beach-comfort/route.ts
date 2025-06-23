import { NextRequest, NextResponse } from 'next/server';
import { InferenceClient } from "@huggingface/inference";
import { MarineWeatherData } from '@/app/utils/types';

export async function POST(request: NextRequest) {
  try {
    const { wave_height, wind_speed_10m,uv_index,temperature_2m,time,sea_surface_temperature }:MarineWeatherData = await request.json();

    const prompt = `
    Wave height: ${wave_height} meters (Wave height above 0.70 is getting uncomfortable)
    Wind speed: ${wind_speed_10m} km/h
    Uv index: ${uv_index}
    temperature: ${temperature_2m}
    time in the day: ${time}
    sea temp: ${sea_surface_temperature}
    As an expert beach advisor, is it comfortable and safe to spend a day at the beach under these conditions? 
    Answer in **one short sentence only**. Be clear and concise.
    `;
    // const prompt = `
    // גובה הגלים: ${waveHeight} מטרים  
    // מהירות הרוח: ${windSpeed} קמ"ש  

    // כמומחה לייעוץ חופים, האם נעים ובטוח לבלות יום בחוף בתנאים אלו?  

    // ענה במשפט אחד קצר בלבד בעברית. היה ברור ותמציתי.
    // `
    const HF_API_TOKEN = process.env.HF_API_TOKEN;
    const client = new InferenceClient(HF_API_TOKEN);

    // const chatCompletion = await client.chatCompletion({
    //   provider: "novita",
    //   model: "deepseek-ai/DeepSeek-R1",
    //   messages: [
    //     {
    //       role: "user",
    //       content: prompt,
    //     },
    //   ],
    // });
    console.log(prompt,"promptprompt");
    
    const chatCompletion = await client.chatCompletion({
        provider: "together",
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
    });


    const message = chatCompletion.choices?.[0]?.message?.content ?? "No valid AI response.";
    return NextResponse.json({ result: message });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message  || 'Internal server error' }, { status: 500 });
  }
}
