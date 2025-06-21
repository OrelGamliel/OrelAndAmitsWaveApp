import React from 'react';

export default function SpotifyPlaylistButton() {
  const playlistUrl = 'https://open.spotify.com/playlist/7lO7ba1Oomjg7pEwWk8UdV?si=mCwxws1zRG-iHk6jjymw4g&pi=mGY0a2vmSEOG0'; // Replace with your own

  return (
    <a
      href={playlistUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="sticky top-4 left-4 w-14 h-14 rounded-full bg-green-600 flex items-center justify-center shadow-lg hover:bg-green-700 z-50"
      style={{
        backgroundImage: "url('/spotify-icon.webp')", 
        backgroundSize: '92px',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      aria-label="Open Spotify Playlist"
    >
    </a>
  );
}
