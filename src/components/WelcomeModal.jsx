import React from 'react';
import MascotDoll from './MascotDoll';

export default function WelcomeModal({
  isOpen,
  who,
  onTour,
  onClose
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>
        <MascotDoll who={who} mood="happy" />
        <h3>ආයුබෝවන්! வணக்கம்!</h3>
        <p style={{ margin: '8px 0 20px', opacity: 0.9 }}>
          I’m Tikirilia. Want a quick tour of my island?
        </p>
        <div className="cta" style={{ justifyContent: 'center' }}>
          <button type="button" className="btn" onClick={onTour}>
            Yes, show me
          </button>
          <button type="button" className="btn alt" onClick={onClose}>
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
