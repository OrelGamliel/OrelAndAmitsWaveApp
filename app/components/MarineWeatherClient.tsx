'use client';

import React from 'react';
import BeachDayAI from './BeachDayAI';
import { motion } from 'framer-motion';
import { MarineWeatherData } from '../utils/types';
import '../styles/globals.scss';
import AmitsRecommendation from './AmitsRecommendation';
import WeatherDetails from './WeatherDetails';
import ImageFlipPopup from './ImageFlipPopup';
import SpotifyPlaylistButton from './SpotifyPlaylistButton';
import SideMenu from './SideMenu';

export default function MarineWeatherClient({ data }: { data: MarineWeatherData }) {
  return (
    console.log(data, "datadata"),

    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-300 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6"
      >
        <SideMenu/>
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-blue-800 mb-1">
            <img
              src="https://see.fontimg.com/api/rf5/lgmWw/OGE2YmYyODAzZjI5NDNkMWI5OGUxY2ViMDMzYjFjMGMudHRm/T3JlbCBhbmQgQW1pdHMgQ29vbCBhcHA/super-funky.png?r=fs&h=65&w=1000&fg=000000&bg=FFFFFF&tb=1&s=65"
              alt="🌊 אפליקציית הים של אוראל ועמיתתתתת"
            />
          </h1>
          <p className="text-sm text-gray-700">עדכון לשעה: {data.time}</p>
        </div>
        <div className="sticky top-4 z-50 flex gap-4 justify-between items-start px-4">
          <ImageFlipPopup />
          <SpotifyPlaylistButton />
        </div>
        <WeatherDetails data={data} />


        <div className="relative bg-gradient-to-b from-white to-blue-50 rounded-xl p-4 shadow-inner overflow-hidden">
          <div className="absolute inset-0 bg-[url('/waves.svg')] bg-bottom bg-repeat-x opacity-10 animate-pulse" />
          <AmitsRecommendation
            wave_height={data.wave_height}
            wind_speed_10m={data.wind_speed_10m}
          />
        </div>

        <div className="relative bg-gradient-to-b from-white to-blue-50 rounded-xl p-4 shadow-inner overflow-hidden">
          <div className="absolute inset-0 bg-[url('/waves.svg')] bg-bottom bg-repeat-x opacity-10 animate-pulse" />
          <BeachDayAI {...data} />
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
        <div className="flex justify-center mt-6">
          <a
            href="https://beachcam.co.il/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-white font-semibold rounded-xl shadow-lg bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-400 hover:from-sky-500 hover:to-blue-500 transition-all duration-300"
          >
            🟢 שידור חי חוף תל אביב!!
          </a>
        </div>


      </motion.div>
    </div>
  );
}