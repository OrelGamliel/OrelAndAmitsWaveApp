'use client';

import React from 'react';
import { getBeachScore, getLabel } from '../utils/helperFunctions';

type Props = {
  waveHeight: number; // in meters
  windSpeed: number;  // in km/h
  uvIndex?: number;   // optional, for future use
};

export default function AmitsRecommendation({ waveHeight, windSpeed }: Props) {
  const score:number = getBeachScore(waveHeight,windSpeed) 


  return (
    <div className="p-4 bg-orange-100 rounded-xl shadow text-center">
      <h3 className="text-lg font-bold text-orange-800 mb-2">🧠 המלצת עמית</h3>
      <p className="text-4xl font-extrabold text-orange-600">{score.toFixed(1)} / 10</p>
      <p style={{color: 'black'}} className="text-sm mt-2">{getLabel(score)}</p>
    </div>
  );
}
