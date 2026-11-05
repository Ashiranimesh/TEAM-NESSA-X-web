// Audio and Speech Synthesis Service

let audioCtx = null;
export let isSoundEnabled = true;

export function setSoundEnabled(val) {
  isSoundEnabled = val;
  if (!val && typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

export function playChime(frequencies = [660, 880]) {
  if (!isSoundEnabled || typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    audioCtx = audioCtx || new AudioContextClass();
    
    // Resume context if suspended (browser auto-play policy)
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    frequencies.forEach((f, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const t = audioCtx.currentTime + i * 0.12;

      osc.type = 'triangle';
      osc.frequency.value = f;

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(t);
      osc.stop(t + 0.45);
    });
  } catch (err) {
    console.warn('Audio chime error:', err);
  }
}

const FEMALE_REGEX = /female|woman|girl|zira|samantha|karen|tessa|moira|fiona|victoria|susan|hazel|jenny|aria|thilini|pallavi|heera|veena|kalpana|ava|allison|joanna|salli|kendra|kimberly|ivy|google us english|google uk english female/i;
const MALE_REGEX = /\bmale\b|david|mark|alex|daniel|fred|thisara|sameera|valluvar|guy|george|james|rishi|ravi|ryan|eric|christopher|kumar|prabhat|hemant/i;

function pickVoice(langCode, who = 'girl') {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const isBoy = who === 'boy';
  const voices = window.speechSynthesis.getVoices();
  const langVoices = voices.filter(v => v.lang.toLowerCase().startsWith(langCode.toLowerCase()));

  if (langVoices.length > 0) {
    if (isBoy) {
      return langVoices.find(v => MALE_REGEX.test(v.name)) || 
             langVoices.find(v => !FEMALE_REGEX.test(v.name)) || 
             langVoices[0];
    } else {
      return langVoices.find(v => FEMALE_REGEX.test(v.name)) || 
             langVoices.find(v => !MALE_REGEX.test(v.name)) || 
             langVoices[0];
    }
  }

  // Fallback to English voice if specified language not found
  const enVoices = voices.filter(v => v.lang.toLowerCase().startsWith('en'));
  if (enVoices.length > 0) {
    return isBoy 
      ? (enVoices.find(v => MALE_REGEX.test(v.name)) || enVoices[0])
      : (enVoices.find(v => FEMALE_REGEX.test(v.name)) || enVoices[0]);
  }

  return voices[0] || null;
}

export function speak(text, lang = 'en', alt = '', who = 'girl', queue = false) {
  if (!isSoundEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
  if (!queue) {
    window.speechSynthesis.cancel();
  }

  const voice = pickVoice(lang, who);
  const textToSpeak = voice || !alt ? text : alt;
  const utterance = new SpeechSynthesisUtterance(textToSpeak);

  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = lang === 'si' ? 'si-LK' : lang === 'ta' ? 'ta-LK' : 'en-US';
  }

  const isBoy = who === 'boy';
  utterance.pitch = isBoy ? (utterance.voice && MALE_REGEX.test(utterance.voice.name) ? 0.9 : 0.55) : 1.8;
  utterance.rate = 0.92;
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
}

// In-memory or indexedDB loaded audio URLs
const dynamicAudioUrls = {};

export function setCustomAudioUrl(key, url) {
  dynamicAudioUrls[key] = url;
}

export function getCustomAudioUrl(key) {
  return dynamicAudioUrls[key];
}

const GREETINGS = {
  ayubowan: ['ආයුබෝවන්', 'si', 'Ah yoo boh wun'],
  vanakkam: ['வணக்கம்', 'ta', 'Vuh nuck kum'],
  niceday: ['Have a nice day!', 'en', 'Have a nice day!']
};

export function playPhraseAudio(phraseKey, who = 'girl', onFallback) {
  return new Promise(resolve => {
    if (!isSoundEnabled) {
      resolve();
      return;
    }

    const prefix = who === 'boy' ? 'boy-' : '';
    const customUrl = dynamicAudioUrls[prefix + phraseKey];
    const defaultStaticUrl = `/audio/${prefix}${phraseKey}.wav`;

    const sources = [];
    if (customUrl) sources.push(customUrl);
    sources.push(defaultStaticUrl);

    // Fallback to speech synthesis if audio files can't load
    let resolved = false;
    let step = 0;

    const finish = () => {
      if (!resolved) {
        resolved = true;
        resolve();
      }
    };

    const tryNext = () => {
      if (resolved) return;
      if (step >= sources.length) {
        resolved = true;
        if (onFallback) onFallback();
        setTimeout(resolve, 1500);
        return;
      }

      const src = sources[step];
      step++;
      const audio = new Audio(src);
      let failed = false;

      const onErr = () => {
        if (!failed) {
          failed = true;
          tryNext();
        }
      };

      audio.onended = finish;
      audio.onerror = onErr;
      audio.play().catch(onErr);
    };

    tryNext();
  });
}

let trioSequence = 0;
export async function playTrioGreeting(who = 'girl') {
  if (!isSoundEnabled) return;
  const currentSeq = ++trioSequence;

  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }

  await playPhraseAudio('ayubowan', who, () => speak(GREETINGS.ayubowan[0], GREETINGS.ayubowan[1], GREETINGS.ayubowan[2], who, true));
  if (currentSeq !== trioSequence) return;

  await playPhraseAudio('vanakkam', who, () => speak(GREETINGS.vanakkam[0], GREETINGS.vanakkam[1], GREETINGS.vanakkam[2], who, true));
  if (currentSeq !== trioSequence) return;

  await playPhraseAudio('niceday', who, () => speak(GREETINGS.niceday[0], GREETINGS.niceday[1], GREETINGS.niceday[2], who, true));
}

// IndexedDB Helper for recorded voice persistence
function openDatabase() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported'));
    }
    const request = window.indexedDB.open('tikirilia_db', 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore('audio_clips');
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveAudioClipToDb(key, blob) {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('audio_clips', 'readwrite');
      const store = tx.objectStore('audio_clips');
      const req = store.put(blob, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('Could not save to DB:', e);
  }
}

export async function loadAudioClipsFromDb() {
  try {
    const db = await openDatabase();
    return new Promise(resolve => {
      const tx = db.transaction('audio_clips', 'readonly');
      const store = tx.objectStore('audio_clips');
      const req = store.getAllKeys();
      req.onsuccess = e => {
        const keys = e.target.result;
        let pending = keys.length;
        if (pending === 0) return resolve({});

        const results = {};
        keys.forEach(k => {
          const getReq = store.get(k);
          getReq.onsuccess = ev => {
            if (ev.target.result) {
              const url = URL.createObjectURL(ev.target.result);
              dynamicAudioUrls[k] = url;
              results[k] = url;
            }
            pending--;
            if (pending === 0) resolve(results);
          };
          getReq.onerror = () => {
            pending--;
            if (pending === 0) resolve(results);
          };
        });
      };
      req.onerror = () => resolve({});
    });
  } catch (e) {
    return {};
  }
}
