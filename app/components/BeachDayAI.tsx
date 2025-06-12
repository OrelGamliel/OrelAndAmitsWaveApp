'use client';

import React, { useEffect, useState } from 'react';

type Props = {
  waveHeight: number;
  windSpeed: number;
  uvIndex: number;
};

export default function BeachDayAI({ waveHeight, windSpeed,uvIndex }: Props) {
  const [aiResponse, setAiResponse] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getAIResponse() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('/api/beach-comfort', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ waveHeight, windSpeed,uvIndex }),
          
        });
        console.log(res,'orel');

        if (!res.ok) throw new Error('Failed to get AI response');
        
        const json = await res.json();
        setAiResponse(json.result ?? 'No response from AI');
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    getAIResponse();
  }, [waveHeight, windSpeed]);

  if (loading) return <p>Checking beach conditions with AI...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 max-w-md mx-auto bg-blue-50 rounded-lg shadow">
      {/* <h2 className="text-xl font-semibold mb-4">🌊 Beach Day AI Advisor</h2>
      <p><strong>Wave Height:</strong> {waveHeight.toFixed(2)} m</p>
      <p><strong>Wind Speed:</strong> {windSpeed.toFixed(1)} km/h</p> */}
      <hr className="my-4" />
      <h3 className="font-semibold mb-2">המלצת הAI הסיני👁️‍🗨️</h3>
      <p>{aiResponse}</p>
    </div>
  );
}
