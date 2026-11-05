import React from 'react';

export default function VoiceSection({ who, onSayGreeting }) {
  return (
    <section className="band" id="voices">
      <div className="wrap" style={{ textAlign: 'center' }}>
        <h2>{who === 'boy' ? 'Hear his voice' : 'Hear her voice'}</h2>
        <p className="sub" style={{ marginInline: 'auto' }}>
          {who === 'boy'
            ? 'Tap a greeting and he says it in his own male voice.'
            : 'Tap a greeting and she says it in her own voice.'}
        </p>
        <div className="cta" style={{ justifyContent: 'center' }}>
          <button className="btn" onClick={() => onSayGreeting('ayubowan')}>
            ආයුබෝවන්
          </button>
          <button className="btn alt" onClick={() => onSayGreeting('vanakkam')}>
            வணக்கம்
          </button>
          <button className="btn" onClick={() => onSayGreeting('niceday')}>
            Have a nice day!
          </button>
        </div>
      </div>
    </section>
  );
}
