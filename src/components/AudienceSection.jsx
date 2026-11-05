import React from 'react';
import { AUDIENCES } from '../data/tikiriliaData';

export default function AudienceSection({ who, onGetStarted }) {
  const currentAudience = AUDIENCES[who] || AUDIENCES.girl;

  return (
    <section id="people">
      <div className="wrap">
        <h2>Made for three kinds of explorers</h2>
        <p className="sub">
          Each person gets a different journey from the same doll.
        </p>
        <div className="grid">
          {currentAudience.map((item, idx) => (
            <div key={idx} className={`card ${item.colorClass}`}>
              <span className="ico">{item.icon}</span>
              <h3>{item.name}</h3>
              <p>{item.bio}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '44px' }}>
          <button type="button" className="btn" onClick={onGetStarted}>
            Get started
          </button>
        </div>
      </div>
    </section>
  );
}
