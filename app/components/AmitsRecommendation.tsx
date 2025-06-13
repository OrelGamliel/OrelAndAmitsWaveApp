'use client';

import React from 'react';

type Props = {
  waveHeight: number; // in meters
  windSpeed: number;  // in km/h
  uvIndex?: number;   // optional, for future use
};

export default function AmitsRecommendation({ waveHeight, windSpeed }: Props) {
    
  // Base values for "middle mark"
  const BASE_WAVE = 0.5; // meters
  const BASE_WIND = 9;   // km/h

  // Calculate deltas
  const waveDelta = waveHeight - BASE_WAVE;
  const windDelta = windSpeed - BASE_WIND;

  // Normalize the weight ratio: 1 wave unit = 5 wind units
  const markChange = (-waveDelta * 5) - windDelta;

  // Base score 5 (on a 0–10 scale)
  let score = 5 + markChange;

  // Clamp the score between 0 and 10
  score = Math.max(0, Math.min(10, score));

  // Optional rating interpretation
  const getLabel = (score: number) => {
    if (score >= 8) return "🔥 מושלם";
    if (score >= 6) return "😊 טוב מאוד";
    if (score >= 4) return "🤔 ממוצע";
    if (score >= 2) return "😬 לא מומלץ";
    return "❌ להתרחק";
  };

  return (
    <div className="p-4 bg-orange-100 rounded-xl shadow text-center">
      <h3 className="text-lg font-bold text-orange-800 mb-2">🧠 המלצת עמית</h3>
      <p className="text-4xl font-extrabold text-orange-600">{score.toFixed(1)} / 10</p>
      <p className="text-gray-800 text-sm mt-2">{getLabel(score)}</p>
    </div>
  );
}
