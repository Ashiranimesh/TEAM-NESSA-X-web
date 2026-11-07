import React from 'react';

export default function Navbar({ onSayAyubowan, soundEnabled, onToggleSound }) {
  return (
    <nav>
      <div className="wrap">
        <a className="brand" href="#top">
          <i />
          Smart Tikirilia
        </a>
        <ul>
          <li><a href="#app">The app</a></li>
          <li><a href="#badges">Badges</a></li>
          <li><a href="#people">Who it’s for</a></li>
          <li><a href="#team">Our team</a></li>
        </ul>
        <div className="navbtns">
          <button className="btn alt nav-ayubowan" onClick={onSayAyubowan}>
            Say ayubowan
          </button>
          <button
            className="btn snd"
            onClick={onToggleSound}
            aria-pressed={soundEnabled}
            aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
            title="Sound on or off"
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
        </div>
      </div>
    </nav>
  );
}
