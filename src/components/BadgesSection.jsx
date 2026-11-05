import React, { useState } from 'react';
import { BADGES } from '../data/tikiriliaData';
import { triggerConfetti } from '../utils/confettiService';
import { playChime } from '../utils/audioService';

export default function BadgesSection({ onToast }) {
  const [unlockedBadges, setUnlockedBadges] = useState({});

  const unlockCount = Object.keys(unlockedBadges).length;
  const progressPercent = (unlockCount / BADGES.length) * 100;

  const handleUnlock = badge => {
    if (unlockedBadges[badge.id]) return;

    const updated = { ...unlockedBadges, [badge.id]: true };
    setUnlockedBadges(updated);

    triggerConfetti();
    playChime([659, 784, 988, 1319]);
    onToast(`New badge: ${badge.name}!`);

    if (Object.keys(updated).length === BADGES.length) {
      setTimeout(() => {
        onToast('All badges collected! Ayubowan, explorer!');
      }, 2500);
    }
  };

  return (
    <section className="band" id="badges">
      <div className="wrap">
        <h2>Collect them all</h2>
        <p className="sub">
          Tap a badge to unlock it. <b>{unlockCount} of {BADGES.length}</b> collected.
        </p>

        <div className="meter">
          <i style={{ width: `${progressPercent}%` }} />
        </div>

        <div className="badges">
          {BADGES.map(badge => {
            const isUnlocked = !!unlockedBadges[badge.id];
            return (
              <button
                key={badge.id}
                type="button"
                className={`badge ${isUnlocked ? 'got' : ''}`}
                onClick={() => handleUnlock(badge)}
              >
                <span className="em">{badge.icon}</span>
                {badge.name}
                <small>{isUnlocked ? 'Unlocked!' : 'Tap to unlock'}</small>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
