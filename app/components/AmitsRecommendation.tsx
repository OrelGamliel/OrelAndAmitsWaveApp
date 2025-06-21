'use client';

import React from 'react';
import { getBeachScore, getLabel } from '../utils/helperFunctions';

type Props = {
  wave_height: number; // in meters
  wind_speed_10m: number;  // in km/h
};

export default function AmitsRecommendation({ wave_height, wind_speed_10m }: Props) {
  const score:number = getBeachScore(wave_height,wind_speed_10m) 


  return (
    <div className="p-4 bg-orange-100 rounded-xl shadow text-center">
      <h3 className="text-lg font-bold text-orange-800 mb-2">🧠 המלצת עמית</h3>
      <p className="text-4xl font-extrabold text-orange-600">{score.toFixed(1)} / 10</p>
      <p style={{color: 'black'}} className="text-sm mt-2">{getLabel(score)}</p>
    </div>
  );
}
