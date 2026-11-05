# Smart Tikirilia 1.0 (React + Vite)

> Traditional-costume doll with a companion cultural app for Sri Lanka, converted from vanilla HTML to a modern **React + Vite** single-page application without Tailwind CSS.

## 🚀 Getting Started

From inside the `TEAM-NESSA-X-R` directory:

```bash
# Start the local Vite development server
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

## 🛠️ Architecture & Component Hierarchy

```
TEAM-NESSA-X-R/
├── public/
│   ├── audio/              # Preloaded offline audio clips (.wav)
│   └── images/             # Team profile photos and assets
├── src/
│   ├── components/
│   │   ├── MascotDoll.jsx         # Dynamic SVG traditional doll (Girl & Boy modes, animated moods & blinking)
│   │   ├── Navbar.jsx             # Sticky navigation, "Say ayubowan" trigger & sound toggle
│   │   ├── Hero.jsx               # Hero banner, falling petals, speech bubble & doll stage
│   │   ├── Marquee.jsx            # Infinite scrolling Sinhala/Tamil/English cultural ticker
│   │   ├── FeaturesGrid.jsx       # 4 core island value proposition cards
│   │   ├── VoiceSection.jsx       # Interactive voice test buttons (Ayubowan, Vanakkam, Have a nice day)
│   │   ├── AppShowcase.jsx        # Interactive mobile phone mockup with tabs (Home, Explore, Learn, Diary)
│   │   ├── BadgesSection.jsx      # Gamified badge collection with confetti & progress meter
│   │   ├── AudienceSection.jsx    # Tourist, Parent, and Child user persona cards
│   │   ├── TeamSection.jsx        # Student innovator profiles with photos, roles & social links
│   │   ├── Footer.jsx             # Cultural footer, social links, voice loader & recorder trigger
│   │   ├── WelcomeModal.jsx       # Interactive island tour prompt dialog
│   │   ├── VoiceRecorderModal.jsx # In-browser MediaRecorder + IndexedDB voice clip studio
│   │   ├── Toast.jsx              # Bottom-center floating notification
│   │   └── ConfettiCanvas.jsx     # High-performance 2D Canvas confetti particle burst
│   ├── data/
│   │   └── tikiriliaData.js       # Centralized cultural strings, moods, badges, team, and audience data
│   ├── utils/
│   │   ├── audioService.js        # Web Audio oscillator chimes, SpeechSynthesis, and IndexedDB storage
│   │   └── confettiService.js     # Physics-based canvas confetti engine
│   ├── styles/
│   │   └── index.css              # Custom semantic CSS with CSS variables, animations & dark mode (NO Tailwind)
│   ├── App.jsx                    # Root state coordinator
│   └── main.jsx                   # React 18/19 entry point
├── index.html
├── package.json
└── vite.config.js
```

## ✨ Highlights

- **Pure CSS**: Handcrafted semantic styles using CSS custom properties (`--cream`, `--yellow`, `--lav`, `--sage`, `--maroon`, etc.), responsive clamp typography, and dark mode support. **Zero Tailwind CSS** as requested.
- **Girl & Boy Doll Switching**: Toggle between female and male traditional attire, adapting voice pitch and audience personas.
- **Multilingual Voice Support**: Integrates Web Speech API and fallback audio clips for Sinhala (*ආයුබෝවන්*), Tamil (*வணக்கம்*), and English.
- **In-Browser Audio Recording**: Record and save your own voice clips directly to browser IndexedDB using the HTML5 MediaRecorder API.
- **Interactive Phone Wireframe Mockup**: Live tab switching (Home, Explore Map, Language Cards, Travel Diary) with dynamic entry adding.
#...