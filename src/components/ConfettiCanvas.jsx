import React, { useEffect, useRef } from 'react';
import { initConfettiCanvas } from '../utils/confettiService';

export default function ConfettiCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const cleanup = initConfettiCanvas(canvasRef.current);
      return cleanup;
    }
  }, []);

  return <canvas id="confetti" ref={canvasRef} aria-hidden="true" />;
}
