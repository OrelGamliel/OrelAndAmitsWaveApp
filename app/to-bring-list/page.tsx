'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SideMenu from '../components/SideMenu';

type ToBringItem = {
  id: number;
  text: string;
  checked: boolean;
};

export default function ToBringListPage() {
  const [items, setItems] = useState<ToBringItem[]>([]);
  const [newItem, setNewItem] = useState<string>('');

const [hasLoaded, setHasLoaded] = useState(false);

useEffect(() => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('bringList');
    if (stored) {
      try {
        const parsed: ToBringItem[] = JSON.parse(stored);
        setItems(parsed);
      } catch {
        setItems(getDefaultItems());
      }
    } else {
      setItems(getDefaultItems());
    }
    setHasLoaded(true); // ✅ mark that initial load is done
  }
}, []);

useEffect(() => {
  if (hasLoaded) {
    localStorage.setItem('bringList', JSON.stringify(items));
    console.log("itemsss", JSON.stringify(items));
  }
}, [items, hasLoaded]);

  const getDefaultItems = (): ToBringItem[] => [
    { id: 1, text: 'מים קרים 💧', checked: false },
    { id: 2, text: 'כובע 🧢', checked: false },
    { id: 3, text: 'קרם הגנה 🧴', checked: false },
    { id: 4, text: 'מגבת 🏖️', checked: false },
    { id: 5, text: 'ששבש 🎲', checked: false },
  ];

  const handleCheck = (id: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleAdd = () => {
    if (newItem.trim() === '') return;
    const newEntry: ToBringItem = {
      id: Date.now(),
      text: newItem.trim(),
      checked: false,
    };
    setItems(prev => [...prev, newEntry]);
    setNewItem('');
  };

  const handleDelete = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

    //   localStorage.removeItem('bringList');

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-300 py-10 px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6"
      >
        <SideMenu />
        <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-6">
          🏝️ רשימת ציוד לים
        </h1>

        <ul className="space-y-2 mb-6">
          <AnimatePresence>
            {items.map((item:ToBringItem) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between bg-blue-50 p-3 rounded-xl shadow-sm hover:shadow-md"
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheck(item.id)}
                    className="accent-blue-600 w-4 h-4"
                  />
                  <span className={item.checked ? 'line-through text-gray-500' : ''}>
                    {item.text}
                  </span>
                </label>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-400 hover:text-red-600 text-xl font-bold"
                  aria-label="Delete item"
                >
                  ×
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <div className="flex gap-2">
            <textarea
            dir="rtl"
            placeholder="הוסף פריט חדש..."
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-300 resize-none"
            />
          <button
            onClick={handleAdd}
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-4 py-2 rounded-xl shadow-md transition"
          >
            הוסף
          </button>
        </div>
      </motion.div>
    </div>
  );
}
