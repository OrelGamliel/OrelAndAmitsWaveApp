import React, { useState } from 'react';

export default function ImageFlipPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) setIsOpen(false);
  }

  return (
    <>
      {/* Floating open button */}
        <button
        onClick={() => setIsOpen(true)}
        className="sticky top-4 left-4 w-14 h-14 rounded-full shadow-lg z-50"
        style={{
            backgroundImage: "url('/backgammon-icon.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}
        />

      {/* Popup */}
      {isOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="image-fix bg-white rounded-lg p-4 max-w-sm w-full relative shadow-xl">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
              aria-label="Close popup"
            >
              ✖
            </button>

            {/* Image at top */}
            <img
              src="/sheshbesh.png"
              alt="ששבש"
              className={`mx-auto mb-4 transition-transform duration-300 ${
                flipped ? 'rotate-180' : ''
              }`}
              style={{ maxHeight: '300px' }}
            />

            {/* Flip button */}
            <button
              onClick={() => setFlipped(!flipped)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              רגע איך אנחנו מסדרים את זה??
            </button>
          </div>
        </div>
      )}
    </>
  );
}
