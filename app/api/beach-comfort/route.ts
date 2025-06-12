import { NextRequest, NextResponse } from 'next/server';
import { InferenceClient } from "@huggingface/inference";

export async function POST(request: NextRequest) {
  try {
    const { waveHeight, windSpeed,uvIndex } = await request.json();

    // if (waveHeight === undefined || windSpeed === undefined || uvIndex === undefined) {
    //   return NextResponse.json({ error: 'Missing waveHeight or windSpeed' }, { status: 400 });
    // }

    // const prompt = `Given the wave height is ${waveHeight} meters and the wind speed is ${windSpeed} km/h at the beach, is it comfortable and safe for a day at the ocean and the beach? Please answer briefly and clearly.`;
    const prompt = `
    Wave height: ${waveHeight} meters
    Wind speed: ${windSpeed} km/h
    Uv index: ${uvIndex}

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
