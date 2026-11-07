import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import FeaturesGrid from './components/FeaturesGrid';
import VoiceSection from './components/VoiceSection';
import AppShowcase from './components/AppShowcase';
import BadgesSection from './components/BadgesSection';
import AudienceSection from './components/AudienceSection';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';
import WelcomeModal from './components/WelcomeModal';
import VoiceRecorderModal from './components/VoiceRecorderModal';
import Toast from './components/Toast';
import ConfettiCanvas from './components/ConfettiCanvas';

import { MOODS, MOOD_KEYS } from './data/tikiriliaData';
import {
  setSoundEnabled,
  playChime,
  speak,
  playPhraseAudio,
  playTrioGreeting,
  loadAudioClipsFromDb
} from './utils/audioService';
import { triggerConfetti } from './utils/confettiService';

export default function App() {
  const [who, setWho] = useState('girl');
  const [currentMood, setCurrentMood] = useState('happy');
  const [bubbleText, setBubbleText] = useState('ආයුබෝවන්!');
  const [soundEnabledState, setSoundEnabledState] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const [isRecorderOpen, setIsRecorderOpen] = useState(false);

  const toastTimerRef = useRef(null);

  // Sync data-mode attribute on HTML document element
  useEffect(() => {
    document.documentElement.setAttribute('data-mode', who);
  }, [who]);

  // Load IndexedDB voice clips and setup initial voice prompt
  useEffect(() => {
    loadAudioClipsFromDb();

    // Trigger voices list cache in browser
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }

    const timer = setTimeout(() => {
      setIsWelcomeOpen(true);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  const showToast = message => {
    setToastMessage(message);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleToggleSound = () => {
    const nextVal = !soundEnabledState;
    setSoundEnabledState(nextVal);
    setSoundEnabled(nextVal);
    if (nextVal) {
      playChime([784]);
    }
  };

  const handleSelectWho = newWho => {
    setWho(newWho);
    setCurrentMood('happy');
    setBubbleText(MOODS.happy.quote);
    playChime([660, 880]);
    playTrioGreeting(newWho);
    triggerConfetti();
  };

  const speakMoodReaction = (moodKey, targetWho = who) => {
    const moodObj = MOODS[moodKey];
    if (!moodObj) return;

    playChime([660, 880]);
    if (moodKey === 'happy') {
      playTrioGreeting(targetWho);
    } else {
      speak(moodObj.speechEn || moodObj.quote, 'en', '', targetWho);
    }
  };

  const handleMascotClick = () => {
    const currentIndex = MOOD_KEYS.indexOf(currentMood);
    const nextIndex = (currentIndex + 1) % MOOD_KEYS.length;
    const nextKey = MOOD_KEYS[nextIndex];

    setCurrentMood(nextKey);
    setBubbleText(MOODS[nextKey].quote);
    speakMoodReaction(nextKey);

    if (nextKey === 'wow') {
      triggerConfetti();
    }
  };

  const handleSelectMood = moodKey => {
    setCurrentMood(moodKey);
    setBubbleText(MOODS[moodKey].quote);
    speakMoodReaction(moodKey);

    const topEl = document.getElementById('top');
    if (topEl) {
      topEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSayAyubowan = () => {
    setCurrentMood('happy');
    setBubbleText('வணக்கம்! ආයුබෝවන්!');
    playChime([523, 659, 784]);
    playTrioGreeting(who);
    triggerConfetti();

    const topEl = document.getElementById('top');
    if (topEl) {
      topEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSayGreeting = phraseKey => {
    playChime([660, 880]);
    const greetings = {
      ayubowan: () => speak('ආයුබෝවන්', 'si', 'Ah yoo boh wun', who, true),
      vanakkam: () => speak('வணக்கம்', 'ta', 'Vuh nuck kum', who, true),
      niceday: () => speak('Have a nice day!', 'en', '', who, true)
    };
    playPhraseAudio(phraseKey, who, greetings[phraseKey]);
  };

  const handleTour = () => {
    setIsWelcomeOpen(false);
    triggerConfetti();
    playChime([660, 880]);
    playTrioGreeting(who);

    const appEl = document.getElementById('app');
    if (appEl) {
      appEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-root">
      <ConfettiCanvas />
      <Toast message={toastMessage} />

      <Navbar
        onSayAyubowan={handleSayAyubowan}
        soundEnabled={soundEnabledState}
        onToggleSound={handleToggleSound}
      />

      <Hero
        who={who}
        onSelectWho={handleSelectWho}
        currentMood={currentMood}
        bubbleText={bubbleText}
        onMascotClick={handleMascotClick}
      />

      <Marquee />

      <FeaturesGrid />

      <VoiceSection who={who} onSayGreeting={handleSayGreeting} />

      <AppShowcase
        who={who}
        currentMood={currentMood}
        onSelectMood={handleSelectMood}
        onToast={showToast}
      />

      <BadgesSection onToast={showToast} />

      <AudienceSection
        who={who}
        onGetStarted={() => {
          handleTour();
        }}
      />

      <TeamSection />

      <Footer />

      <WelcomeModal
        isOpen={isWelcomeOpen}
        who={who}
        onTour={handleTour}
        onClose={() => {
          setIsWelcomeOpen(false);
          setCurrentMood('wink');
          speak('Have a nice day!', 'en', '', who);
        }}
      />

      <VoiceRecorderModal
        isOpen={isRecorderOpen}
        who={who}
        onClose={() => setIsRecorderOpen(false)}
        onToast={showToast}
      />
    </div>
  );
}
