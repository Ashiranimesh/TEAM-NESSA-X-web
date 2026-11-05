// Confetti animation service using 2D canvas

const CONFETTI_COLORS = ['#F3C65B', '#C6A1D2', '#8DA17B', '#792D40', '#ffffff'];
let canvasEl = null;
let ctx = null;
let particles = [];
let isRunning = false;

export function initConfettiCanvas(canvas) {
  canvasEl = canvas;
  if (!canvasEl) return;
  ctx = canvasEl.getContext('2d');
  
  const resize = () => {
    if (!canvasEl) return;
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;
  };
  
  resize();
  window.addEventListener('resize', resize);
  return () => window.removeEventListener('resize', resize);
}

export function triggerConfetti() {
  if (typeof window === 'undefined') return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  if (!canvasEl || !ctx) return;

  const count = 90;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.6,
      vx: (Math.random() - 0.5) * 14,
      vy: -Math.random() * 14 - 4,
      s: 5 + Math.random() * 7,
      c: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      r: Math.random() * 6,
      l: 90
    });
  }

  if (!isRunning) {
    isRunning = true;
    animate();
  }
}

function animate() {
  if (!ctx || !canvasEl) return;
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  particles = particles.filter(p => p.l > 0);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.4;
    p.r += 0.2;
    p.l--;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.r);
    ctx.fillStyle = p.c;
    ctx.globalAlpha = Math.min(1, p.l / 30);
    ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
    ctx.restore();
  });

  if (particles.length > 0) {
    requestAnimationFrame(animate);
  } else {
    isRunning = false;
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  }
}
