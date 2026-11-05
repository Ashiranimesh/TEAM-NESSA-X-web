import React from 'react';
import { MARQUEE_ITEMS } from '../data/tikiriliaData';

export default function Marquee() {
  return (
    <div className="marq" aria-hidden="true">
      <div className="marq-inner">
        {MARQUEE_ITEMS.concat(MARQUEE_ITEMS).map((item, idx) => (
          <span key={idx}>{item}</span>
        ))}
      </div>
    </div>
  );
}
