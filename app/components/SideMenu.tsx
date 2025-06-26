'use client';

import React, { useState } from 'react';
import { Drawer, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';

export default function SideMenu() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state: boolean) => () => setOpen(state);

  const menuItems = [
    { imageSrc: 'https://see.fontimg.com/api/rf5/lgmWw/OGE2YmYyODAzZjI5NDNkMWI5OGUxY2ViMDMzYjFjMGMudHRm/T3JlbCBhbmQgQW1pdHMgQ29vbCBhcHA/super-funky.png?r=fs&h=65&w=1000&fg=000000&bg=FFFFFF&tb=1&s=65', href: '/' },
    { text: 'רשימה דברים להביא', href: '/to-bring-list' },
    { text: 'מכולות קרובות אלי!!', outsideHref: 'https://www.google.com/maps/search/מכולת/' },
    { text: 'מקלטים קרובים אלי!!', outsideHref: 'https://www.google.com/maps/search/מקלט+קרוב+אליי/' }

  ];

  return (
    <>
      {/* Floating button */}
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          position: 'fixed',
          top: '13%',
          left: 0,
          borderRadius: '0 50% 50% 0',
          transform: 'translateY(-50%)',
          backgroundColor: '#2563eb',
          color: 'white',
          '&:hover': { backgroundColor: '#1d4ed8' },
          zIndex: 1300,
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)} 
      sx={{}}>
        <Box
          sx={{ 
            width: 250,
         }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}
          >
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
         

          <ul className="space-y-2 p-4 bg-white shadow rounded w-64">
            {menuItems.map(({ text, href, imageSrc, outsideHref }) => (
              <li key={text || imageSrc}>
                {outsideHref ? (
                  <a
                    href={outsideHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-2 hover:underline"
                  >
                  {imageSrc ? <img src={imageSrc} alt={text || 'external link'} /> : text}
                  </a>
                  
                ) : (
                  <Link
                    href={href ?? '#'}
                    className="block p-2 hover:underline"
                  >
                    {imageSrc ? <img src={imageSrc} alt={text || 'link image'} /> : text}
                  </Link>
                )}
              </li>
            ))}
          </ul>

        </Box>
      </Drawer>
    </>
  );
}
