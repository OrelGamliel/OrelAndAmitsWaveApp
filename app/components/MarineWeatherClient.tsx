'use client';

import React from 'react';
import BeachDayAI from './BeachDayAI';
import { motion } from 'framer-motion';
import { MarineWeatherData } from '../utils/types';
import '../styles/globals.scss';
import AmitsRecommendation from './AmitsRecommendation';


export default function MarineWeatherClient({ data }: { data: MarineWeatherData }) {

  return (
    console.log(data,"datadata"),
    
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-300 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6"
      >
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-blue-800 mb-1">
            <img src="https://see.fontimg.com/api/rf5/lgmWw/OGE2YmYyODAzZjI5NDNkMWI5OGUxY2ViMDMzYjFjMGMudHRm/T3JlbCBhbmQgQW1pdHMgQ29vbCBhcHA/super-funky.png?r=fs&h=65&w=1000&fg=000000&bg=FFFFFF&tb=1&s=65" alt="🌊 אפליקציית הים של אוראל ועמיתתתתת" />
            
          </h1>
          <p className="text-sm text-gray-700">עדכון לשעה: {data.time}</p>
        </div>

        <div className="my-4 text-sm text-gray-800 space-y-2 bg-blue-50 rounded-lg p-4">
          <p><strong>🌊 גובה גלים:</strong> {data.waveHeight} מטר</p>
          <p><strong>💨 מהירות רוח:</strong> {data.windSpeed} קמ״ש</p>
          <p><strong>🔆 רמת קרינה:</strong> {data.uvIndex}</p>
          <p><strong>🌡️ טמפרטורה:</strong> {data.temperature}°C</p>

        </div>

        <div className="relative bg-gradient-to-b from-white to-blue-50 rounded-xl p-4 shadow-inner overflow-hidden">
          <div className="absolute inset-0 bg-[url('/waves.svg')] bg-bottom bg-repeat-x opacity-10 animate-pulse" />
          <AmitsRecommendation waveHeight={data.waveHeight} windSpeed={data.windSpeed} uvIndex={data.uvIndex}/>
        </div>

        <div className="relative bg-gradient-to-b from-white to-blue-50 rounded-xl p-4 shadow-inner overflow-hidden">
          <div className="absolute inset-0 bg-[url('/waves.svg')] bg-bottom bg-repeat-x opacity-10 animate-pulse" />
          <BeachDayAI waveHeight={data.waveHeight} windSpeed={data.windSpeed} uvIndex={data.uvIndex} temperature={data.temperature}/>
        </div>
        <div className="iframe-env">
            <iframe
            src="https://www.meduzot.co.il/overview-map/"
            width="100%"
            height="500"
            style={{ border: 'none', borderRadius: '1rem' }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </motion.div>
    </div>
  );
}
