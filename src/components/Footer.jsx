import React, { useRef } from 'react';

export default function Footer({
  onHaveNiceDay,
  onOpenRecorder,
  onVoiceFilesLoaded
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = e => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onVoiceFilesLoaded(files);
    }
  };

  return (
    <footer>
      <b>Smart Tikirilia 1.0</b>
      <p style={{ margin: '6px 0 0', opacity: 0.85 }}>
        Your cultural companion in Sri Lanka.
      </p>

      <div className="social">
        {/* Email */}
        <a href="mailto:contact@tikirilia.lk" aria-label="Email us" title="Email us">
          <svg viewBox="0 0 24 24">
            <path
              d="M3 5h18v14H3z M3 6l9 8 9-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/tikirilia"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <svg viewBox="0 0 24 24">
            <path d="M7.5 2h9A5.5 5.5 0 0122 7.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zm0 2A3.5 3.5 0 004 7.5v9A3.5 3.5 0 007.5 20h9a3.5 3.5 0 003.5-3.5v-9A3.5 3.5 0 0016.5 4zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.5-3.2a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
          </svg>
        </a>

        {/* Facebook */}
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg viewBox="0 0 24 24">
            <path d="M14 8h3V4h-3c-2.8 0-4 1.8-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5z" />
          </svg>
        </a>

        {/* TikTok */}
        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <svg viewBox="0 0 24 24">
            <path d="M16 3c.3 2.4 1.8 4 4 4.2v3.2c-1.5 0-2.9-.5-4-1.3V15a6 6 0 11-6-6c.3 0 .6 0 1 .1v3.3a2.8 2.8 0 102 2.6V3z" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24">
            <rect x="3" y="9" width="4" height="12" />
            <circle cx="5" cy="5" r="2.2" />
            <path d="M10 9h4v1.8c.7-1.2 2-2 3.8-2 3 0 4.2 1.8 4.2 5V21h-4v-6c0-1.6-.6-2.5-2-2.5s-2 1-2 2.5v6h-4z" />
          </svg>
        </a>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '16px' }}>
        <button type="button" className="btn alt" onClick={onHaveNiceDay}>
          Have a nice day 👋
        </button>

        <button
          type="button"
          className="btn"
          style={{ background: '#C6A1D2', color: '#4a1b2a', boxShadow: '0 4px 0 #9d78aa' }}
          onClick={() => fileInputRef.current?.click()}
        >
          🎙️ Load my voice clips
        </button>
        <input
          type="file"
          ref={fileInputRef}
          accept="audio/*"
          multiple
          hidden
          onChange={handleFileChange}
        />

        <button
          type="button"
          className="btn"
          style={{ background: '#8DA17B', color: '#fff', boxShadow: '0 4px 0 #6b7d5b' }}
          onClick={onOpenRecorder}
        >
          🎤 Record voice
        </button>
      </div>
    </footer>
  );
}
