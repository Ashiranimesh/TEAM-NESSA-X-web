import React, { useState } from 'react';
import MascotDoll from './MascotDoll';
import { MOODS, MOOD_KEYS } from '../data/tikiriliaData';

export default function AppShowcase({
  who,
  currentMood,
  onSelectMood,
  onToast
}) {
  const [activeTab, setActiveTab] = useState('home');
  const [activeLang, setActiveLang] = useState('si');
  const [diaryEntries, setDiaryEntries] = useState([
    { place: 'Colombo', desc: 'Visited Galle Face Green', date: 'Today' },
    { place: 'Kandy', desc: 'Listened to a folk story', date: '12 Aug' },
    { place: 'Sigiriya', desc: 'Learned new phrases', date: '14 Aug' }
  ]);

  const handleAddDiaryEntry = () => {
    const places = ['Galle Fort', 'Ella Nine Arch', 'Nuwara Eliya', 'Anuradhapura'];
    const randomPlace = places[Math.floor(Math.random() * places.length)];
    const newEntry = {
      place: randomPlace,
      desc: 'Discovered traditional folklore & crafts',
      date: 'Just now'
    };
    setDiaryEntries([newEntry, ...diaryEntries]);
    onToast(`Added ${randomPlace} to your travel diary!`);
  };

  const renderScreenContent = () => {
    switch (activeTab) {
      case 'map':
        return (
          <>
            <h4>Explore Sri Lanka</h4>
            <div className="map-area">
              <i
                className="map-pin"
                style={{ left: '30%', top: '38%' }}
                title="Colombo"
                onClick={() => onToast('Colombo: Vibrant coastal capital & street food')}
              />
              <i
                className="map-pin"
                style={{ left: '56%', top: '22%' }}
                title="Sigiriya"
                onClick={() => onToast('Sigiriya: Ancient lion rock fortress & frescoes')}
              />
              <i
                className="map-pin"
                style={{ left: '46%', top: '64%' }}
                title="Kandy"
                onClick={() => onToast('Kandy: Cultural capital & Sacred Temple of the Tooth')}
              />
            </div>
            <div className="phone-row">
              <div>
                <b>Kandy</b>
                <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>Temple, culture, stories</div>
              </div>
              <span>🔒</span>
            </div>
            <div className="phone-row">
              <div>
                <b>Sigiriya</b>
                <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>Ancient rock fortress</div>
              </div>
              <span>🔒</span>
            </div>
          </>
        );

      case 'learn':
        return (
          <>
            <h4>Learn with Tikirilia</h4>
            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '12px' }}>
              <button
                type="button"
                className="btn"
                style={{
                  padding: '4px 14px',
                  fontSize: '0.82rem',
                  background: activeLang === 'si' ? 'var(--maroon)' : 'var(--cream)',
                  color: activeLang === 'si' ? '#fff' : 'var(--maroon)',
                  boxShadow: 'none'
                }}
                onClick={() => setActiveLang('si')}
              >
                Sinhala
              </button>
              <button
                type="button"
                className="btn"
                style={{
                  padding: '4px 14px',
                  fontSize: '0.82rem',
                  background: activeLang === 'ta' ? 'var(--maroon)' : 'var(--cream)',
                  color: activeLang === 'ta' ? '#fff' : 'var(--maroon)',
                  boxShadow: 'none'
                }}
                onClick={() => setActiveLang('ta')}
              >
                Tamil
              </button>
            </div>

            <div className="phone-row">
              <span>How are you?</span>
              <span>🔊</span>
            </div>

            <div
              style={{
                textAlign: 'center',
                fontFamily: 'Fredoka',
                fontSize: '1.15rem',
                color: 'var(--maroon)',
                margin: '10px 0'
              }}
            >
              {activeLang === 'si' ? 'ඔයාට කොහොමද?' : 'எப்படி இருக்கிறீர்கள்?'}
            </div>

            <button
              type="button"
              className="talk-btn"
              onClick={() => onToast('Listening… say it out loud!')}
              aria-label="Speak into microphone"
            >
              🎤
            </button>
          </>
        );

      case 'diary':
        return (
          <>
            <h4>My Journey</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {diaryEntries.map((item, index) => (
                <div key={index} className="phone-row">
                  <div>
                    <b>{item.place}</b>
                    <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>{item.desc}</div>
                  </div>
                  <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{item.date}</span>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <button
                type="button"
                className="btn"
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                onClick={handleAddDiaryEntry}
              >
                + Add entry
              </button>
            </div>
          </>
        );

      case 'home':
      default:
        return (
          <>
            <h4>Smart Tikirilia</h4>
            <div style={{ textAlign: 'center', fontSize: '0.88rem', marginBottom: '10px', opacity: 0.9 }}>
              Let’s explore Sri Lanka together!
            </div>
            <div className="tiles">
              <div
                className="tile"
                style={{ background: '#C6A1D2' }}
                onClick={() => onToast('Opening Folk Stories…')}
              >
                📚 Stories
              </div>
              <div
                className="tile"
                style={{ background: '#F3C65B', color: '#4a1b2a' }}
                onClick={() => onToast('Opening Traditional Songs…')}
              >
                🎵 Songs
              </div>
              <div
                className="tile"
                style={{ background: '#8DA17B' }}
                onClick={() => setActiveTab('map')}
              >
                🧭 Explore
              </div>
              <div
                className="tile"
                style={{ background: '#e07a5f' }}
                onClick={() => setActiveTab('diary')}
              >
                🎒 My Journey
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <section id="app">
      <div className="wrap">
        <h2>A look inside the app</h2>
        <p className="sub">
          Tap the tabs to explore the main screens from our wireframe flow.
        </p>

        <div className="phonewrap">
          {/* Phone Mockup Frame */}
          <div className="phone">
            <div className="screen">
              <div className="screen-body">{renderScreenContent()}</div>
              <div className="phone-tabs" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'home'}
                  onClick={() => setActiveTab('home')}
                >
                  Home
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'map'}
                  onClick={() => setActiveTab('map')}
                >
                  Explore
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'learn'}
                  onClick={() => setActiveTab('learn')}
                >
                  Learn
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'diary'}
                  onClick={() => setActiveTab('diary')}
                >
                  Diary
                </button>
              </div>
            </div>
          </div>

          {/* Tikirilia's Moods interactive selector */}
          <div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--maroon)' }}>
              Tikirilia’s moods
            </h3>
            <p className="sub" style={{ marginBottom: '16px' }}>
              {who === 'boy'
                ? 'He reacts to what you do. Tap a mood and watch the hero doll change.'
                : 'She reacts to what you do. Tap a mood and watch the hero doll change.'}
            </p>
            <div className="faces">
              {MOOD_KEYS.map(key => {
                const item = MOODS[key];
                return (
                  <button
                    key={key}
                    type="button"
                    className={currentMood === key ? 'active' : ''}
                    onClick={() => onSelectMood(key)}
                  >
                    <MascotDoll who={who} mood={key} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
