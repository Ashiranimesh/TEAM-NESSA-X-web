import React, { useMemo } from 'react';
import MascotDoll from './MascotDoll';

export default function Hero({
  who,
  onSelectWho,
  currentMood,
  bubbleText,
  onMascotClick
}) {
  // Generate random petals for falling animation
  const petals = useMemo(() => {
    return Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      left: `${(i * 11 + 5) % 100}%`,
      duration: `${9 + (i * 1.3) % 8}s`,
      delay: `-${(i * 1.5) % 12}s`
    }));
  }, []);

  return (
    <header className="hero" id="top">
      <div id="petals" aria-hidden="true">
        {petals.map(p => (
          <i
            key={p.id}
            className="petal"
            style={{
              left: p.left,
              animationDuration: p.duration,
              animationDelay: p.delay
            }}
          />
        ))}
      </div>
      <div className="wrap">
        <div>
          <h1>Sri Lanka’s story, told by a doll who loves to talk.</h1>
          <p className="lead">
            Smart Tikirilia is a traditional-costume doll with a companion app.
            Children learn Sinhala and Tamil, and tourists explore places, songs and
            festivals together.
          </p>
          <div className="cta">
            <a className="btn" href="#app">
              Explore the app
            </a>
            <a className="btn alt" href="#team">
              Meet our team
            </a>
          </div>
          <div className="pick" role="group" aria-label="Choose your doll">
            <button
              className="btn"
              data-who="girl"
              aria-pressed={who === 'girl'}
              onClick={() => onSelectWho('girl')}
            >
              👧 Girl doll
            </button>
            <button
              className="btn"
              data-who="boy"
              aria-pressed={who === 'boy'}
              onClick={() => onSelectWho('boy')}
            >
              👦 Boy doll
            </button>
          </div>
        </div>

        <div className="stage">
          <div className="blob" />
          <div className="bubble" role="status" key={bubbleText}>
            {bubbleText}
          </div>
          <button
            type="button"
            className="mascot-container"
            onClick={onMascotClick}
            aria-label="Tap Tikirilia to cycle moods and hear a voice reaction"
          >
            <MascotDoll who={who} mood={currentMood} />
          </button>
          <div className="hint">
            {who === 'boy' ? 'Tap Tikirilia, he reacts' : 'Tap Tikirilia, she reacts'}
          </div>
        </div>
      </div>
    </header>
  );
}
