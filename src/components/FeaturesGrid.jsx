import React from 'react';
import { FEATURES } from '../data/tikiriliaData';

export default function FeaturesGrid() {
  return (
    <section>
      <div className="wrap">
        <h2>One doll. One app. A whole island.</h2>
        <p className="sub">
          Everything Tikirilia does is built for curious kids and first-time visitors.
        </p>
        <div className="grid">
          {FEATURES.map((item, idx) => (
            <div key={idx} className={`card ${item.colorClass}`}>
              <span className="ico">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
