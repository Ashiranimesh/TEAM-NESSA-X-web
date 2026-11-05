import React, { useState, useRef } from 'react';
import {
  setCustomAudioUrl,
  getCustomAudioUrl,
  saveAudioClipToDb
} from '../utils/audioService';

const PHRASES = [
  { key: 'ayubowan', label: 'ආයුබෝවන් Ayubowan' },
  { key: 'vanakkam', label: 'வணக்கம் Vanakkam' },
  { key: 'niceday', label: 'Have a nice day!' }
];

export default function VoiceRecorderModal({
  isOpen,
  who,
  onClose,
  onToast
}) {
  const [recordingKey, setRecordingKey] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  if (!isOpen) return null;

  const prefix = who === 'boy' ? 'boy-' : '';

  const handleToggleRecord = async phraseKey => {
    const fullKey = prefix + phraseKey;

    // If currently recording this phrase, stop it
    if (recordingKey === phraseKey && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecordingKey(null);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = e => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach(track => track.stop());
        const blob = new Blob(audioChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setCustomAudioUrl(fullKey, url);
        await saveAudioClipToDb(fullKey, blob);
        onToast('Voice clip recorded and saved! Tap ▶ to listen.');
      };

      recorder.start();
      setRecordingKey(phraseKey);
    } catch (err) {
      console.warn('Microphone error:', err);
      onToast('Microphone access is not available in this browser.');
    }
  };

  const handlePlayRecording = phraseKey => {
    const fullKey = prefix + phraseKey;
    const url = getCustomAudioUrl(fullKey);
    if (url) {
      new Audio(url).play().catch(() => {
        onToast('Unable to play recording.');
      });
    } else {
      onToast('No custom recording yet for this phrase. Tap Record first!');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" style={{ maxWidth: '440px' }} onClick={e => e.stopPropagation()}>
        <h3 style={{ fontSize: '1.45rem' }}>Record voice clips</h3>
        <p style={{ margin: '4px 0 16px', opacity: 0.85 }}>
          Recording for: <b>{who === 'boy' ? 'Boy doll (male voice)' : 'Girl doll (female voice)'}</b>
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {PHRASES.map(p => {
            const isRecording = recordingKey === p.key;
            return (
              <div
                key={p.key}
                className="phone-row"
                style={{
                  margin: 0,
                  background: 'var(--card)',
                  borderColor: isRecording ? '#b3261e' : 'var(--line)'
                }}
              >
                <span style={{ fontWeight: 600, color: 'var(--maroon)' }}>{p.label}</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    type="button"
                    className="btn"
                    style={{
                      padding: '6px 14px',
                      fontSize: '0.85rem',
                      background: isRecording ? '#b3261e' : 'var(--maroon)'
                    }}
                    onClick={() => handleToggleRecord(p.key)}
                  >
                    {isRecording ? '⏹ Stop' : '⏺ Record'}
                  </button>
                  <button
                    type="button"
                    className="btn alt"
                    style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                    onClick={() => handlePlayRecording(p.key)}
                    title="Play recording"
                  >
                    ▶
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="btn"
          style={{ marginTop: '20px' }}
          onClick={onClose}
        >
          Done
        </button>
      </div>
    </div>
  );
}
