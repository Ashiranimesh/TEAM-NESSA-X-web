export const MOODS = {
  happy: {
    key: 'happy',
    label: '😊 Happy',
    quote: 'ආයුබෝවන්!',
    mouthD: 'M88 124q12 12 24 0',
    eyesType: 'normal',
    speechSi: 'ආයුබෝවන්',
    speechTa: 'வணக்கம்',
    speechEn: 'Ah-yoo-bo-wan'
  },
  wink: {
    key: 'wink',
    label: '😄 Giggle',
    quote: 'Hehe, let’s play!',
    mouthD: 'M86 122q14 16 28 0',
    eyesType: 'wink',
    speechEn: 'Let’s play!'
  },
  sleepy: {
    key: 'sleepy',
    label: '😌 Calm',
    quote: 'Take a deep breath…',
    mouthD: 'M92 126q8 5 16 0',
    eyesType: 'sleepy',
    speechEn: 'Take a deep breath'
  },
  wow: {
    key: 'wow',
    label: '😮 Wow',
    quote: 'Wow, Sigiriya!',
    mouthD: 'M92 124q8 14 16 0z',
    eyesType: 'wow',
    speechEn: 'Wow, Sigiriya!'
  },
  read: {
    key: 'read',
    label: '📖 Story time',
    quote: 'Once upon a time…',
    mouthD: 'M90 126q10 6 20 0',
    eyesType: 'read',
    speechEn: 'Once upon a time'
  }
};

export const MOOD_KEYS = ['happy', 'wink', 'sleepy', 'wow', 'read'];

export const BADGES = [
  { id: 'first_place', icon: '🌸', name: 'First Place Visited' },
  { id: 'story_listener', icon: '🎧', name: 'Story Listener' },
  { id: 'song_explorer', icon: '🎶', name: 'Song Explorer' },
  { id: 'language_learner', icon: '🗣️', name: 'Language Learner' }
];

export const MARQUEE_ITEMS = [
  'ආයුබෝවන් · Hello',
  'வணக்கம் · Hello',
  'ස්තූතියි · Thank you',
  'நன்றி · Thank you',
  'Kandy Esala Perahera',
  'Sigiriya Rock Fortress',
  'Vesak Lantern Festival',
  'Sinhala & Tamil Aluth Avurudu'
];

export const FEATURES = [
  {
    icon: '🗣️',
    title: 'Learn the language',
    desc: 'Say a phrase, hear it back, and practise Sinhala or Tamil with a friendly voice.',
    colorClass: 'lav'
  },
  {
    icon: '🗺️',
    title: 'Explore places',
    desc: 'Kandy, Sigiriya, Colombo: open a place to unlock its stories, songs and phrases.',
    colorClass: 'sage'
  },
  {
    icon: '📖',
    title: 'Keep a journey diary',
    desc: 'Every visit and every new word is saved in a timeline you can share.',
    colorClass: 'yel'
  },
  {
    icon: '🏅',
    title: 'Collect badges',
    desc: 'Earn badges and outfits for listening, learning and travelling.',
    colorClass: ''
  }
];

export const AUDIENCES = {
  girl: [
    {
      icon: '🧳',
      name: 'Emma, the tourist',
      bio: 'Wants quick local phrases and the story behind every place she visits.',
      colorClass: 'lav'
    },
    {
      icon: '👨‍👩‍👧',
      name: 'Kavitha, the parent abroad',
      bio: 'Wants her child to learn the language and traditions she grew up with.',
      colorClass: 'sage'
    },
    {
      icon: '🧒',
      name: 'Kavindu, the child',
      bio: 'Wants songs, folk tales and badges that make learning feel like play.',
      colorClass: 'yel'
    }
  ],
  boy: [
    {
      icon: '🧳',
      name: 'Ethan, the tourist',
      bio: 'Wants quick local phrases and the story behind every place he visits.',
      colorClass: 'lav'
    },
    {
      icon: '👨‍👩‍👧',
      name: 'Kasun, the dad abroad',
      bio: 'Wants his child to learn the language and traditions he grew up with.',
      colorClass: 'sage'
    },
    {
      icon: '🧒',
      name: 'Kavindu, the child',
      bio: 'Wants songs, folk tales and badges that make learning feel like play.',
      colorClass: 'yel'
    }
  ]
};

export const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Sharifa',
    role: 'Project Lead & Architect',
    image: '/images/sharifa.jpeg',
    bio: 'Spearheads overall system architecture, research direction, and hardware-software integration for the companion platform.',
    colorClass: 'lav'
  },
  {
    id: 2,
    name: 'Erani',
    role: 'IoT & Embedded Systems',
    image: '/images/erani.jpeg',
    bio: 'Engineers Bluetooth connectivity, responsive touch sensors, microcontroller logic, and doll audio playback circuits.',
    colorClass: 'sage'
  },
  {
    id: 3,
    name: 'Naduni',
    role: 'UI/UX & Mobile App',
    image: '/images/naduni.jpeg',
    bio: 'Designs engaging mobile wireframes, playful navigation flows, bilingual phrase cards, and gamified achievement badges.',
    colorClass: 'yel'
  },
  {
    id: 4,
    name: 'Ashira',
    role: 'Managing repository & Backend Systems',
    image: '/images/ashira.jpg',
    bio: 'Develops intelligent dialogue matching, voice synthesis routing, and audio caching pipelines for bilingual interactions.',
    colorClass: ''
  },
  {
    id: 5,
    name: 'Senadi',
    role: 'Content, Cultural Research',
    image: '/images/senadi.jpeg',
    bio: 'Curates authentic Sinhala and Tamil vocabulary, folkloric stories, regional landmark data, and cultural heritage validation.',
    colorClass: ''
  }
];
