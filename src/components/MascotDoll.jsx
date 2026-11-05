import React from 'react';
import { MOODS } from '../data/tikiriliaData';

export default function MascotDoll({ who = 'girl', mood = 'happy', className = '' }) {
  const currentMood = MOODS[mood] || MOODS.happy;

  const renderEyes = () => {
    switch (currentMood.eyesType) {
      case 'wink':
        return (
          <path
            d="M73 105q7-8 14 0M115 105q7-8 14 0"
            fill="none"
            stroke="#2a1520"
            strokeWidth="4"
            strokeLinecap="round"
          />
        );
      case 'sleepy':
        return (
          <path
            d="M73 104q7 7 14 0M113 104q7 7 14 0"
            fill="none"
            stroke="#2a1520"
            strokeWidth="4"
            strokeLinecap="round"
          />
        );
      case 'wow':
        return (
          <>
            <ellipse cx="80" cy="103" rx="7" ry="9" fill="#2a1520" />
            <ellipse cx="120" cy="103" rx="7" ry="9" fill="#2a1520" />
            <circle cx="82" cy="100" r="2.5" fill="#fff" />
            <circle cx="122" cy="100" r="2.5" fill="#fff" />
          </>
        );
      case 'read':
        return (
          <>
            <ellipse cx="80" cy="108" rx="5" ry="3" fill="#2a1520" />
            <ellipse cx="120" cy="108" rx="5" ry="3" fill="#2a1520" />
          </>
        );
      case 'normal':
      default:
        return (
          <>
            <ellipse cx="80" cy="104" rx="5" ry="7" fill="#2a1520" />
            <ellipse cx="120" cy="104" rx="5" ry="7" fill="#2a1520" />
          </>
        );
    }
  };

  if (who === 'boy') {
    return (
      <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Sarong & Top */}
        <path d="M30 200c6-38 34-52 70-52s64 14 70 52z" fill="#792D40" />
        <path d="M44 200l60-46 20 8-56 38z" fill="#fff" opacity="0.92" />
        <path
          d="M52 200c8-26 26-38 48-38s40 12 48 38"
          fill="none"
          stroke="#e0a93a"
          strokeWidth="5"
          strokeDasharray="3 7"
          strokeLinecap="round"
        />

        {/* Head */}
        <circle cx="100" cy="106" r="48" fill="#FFDCC8" />

        {/* Boy Hair */}
        <path
          d="M50 100c-8-42 24-64 52-62 30 0 54 22 48 62-8-22-26-32-48-32s-40 10-52 32z"
          fill="#F3C65B"
        />
        <path d="M84 44c4-12 18-14 24-4-8-2-16 0-24 4z" fill="#F3C65B" />

        {/* Cheeks */}
        <circle cx="72" cy="118" r="9" fill="#f6a5b0" opacity="0.8" />
        <circle cx="128" cy="118" r="9" fill="#f6a5b0" opacity="0.8" />

        {/* Blinking Eyes */}
        <g className="eyes-blink">{renderEyes()}</g>

        {/* Mouth */}
        <path
          d={currentMood.mouthD}
          fill="none"
          stroke="#792D40"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Girl doll
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Hair Bun & Back Hair */}
      <circle cx="148" cy="42" r="26" fill="#F3C65B" />
      <circle cx="100" cy="98" r="64" fill="#F3C65B" />

      {/* Traditional Dress */}
      <path d="M30 200c6-38 34-52 70-52s64 14 70 52z" fill="#792D40" />
      <path
        d="M52 200c8-26 26-38 48-38s40 12 48 38"
        fill="none"
        stroke="#e0a93a"
        strokeWidth="5"
        strokeDasharray="3 7"
        strokeLinecap="round"
      />

      {/* Head */}
      <circle cx="100" cy="106" r="48" fill="#FFDCC8" />

      {/* Front Bangs */}
      <path
        d="M56 92c12-26 36-34 58-24 14 6 24 14 30 26-24-4-52-10-88-2z"
        fill="#F3C65B"
      />

      {/* Cheeks */}
      <circle cx="72" cy="118" r="9" fill="#f6a5b0" opacity="0.8" />
      <circle cx="128" cy="118" r="9" fill="#f6a5b0" opacity="0.8" />

      {/* Blinking Eyes */}
      <g className="eyes-blink">{renderEyes()}</g>

      {/* Mouth */}
      <path
        d={currentMood.mouthD}
        fill="none"
        stroke="#792D40"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Frangipani / Temple Flower in Hair */}
      <g transform="translate(142 66)">
        <g fill="#fff" stroke="#f3c65b" strokeWidth="2">
          <ellipse cx="0" cy="-17" rx="10" ry="17" />
          <ellipse cx="0" cy="-17" rx="10" ry="17" transform="rotate(72)" />
          <ellipse cx="0" cy="-17" rx="10" ry="17" transform="rotate(144)" />
          <ellipse cx="0" cy="-17" rx="10" ry="17" transform="rotate(216)" />
          <ellipse cx="0" cy="-17" rx="10" ry="17" transform="rotate(288)" />
        </g>
        <circle r="6" fill="#F3C65B" />
      </g>
    </svg>
  );
}
