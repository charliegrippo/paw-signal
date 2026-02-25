// AboutScreen — color guide, signal modes, then Help Spread The Word section

interface AboutScreenProps {
  onBack: () => void
}

// Color guide data with expanded descriptions
const colorGuide = [
  {
    hex: '#2E7D32',
    name: 'Green — Friendly',
    meaning: 'Happy to meet other dogs and people. Come say hi!',
    why: "Green means 'go' — just like a green light. It's the universal sign that everything is safe and welcoming.",
  },
  {
    hex: '#F9A825',
    name: 'Yellow — Caution / Quirks',
    meaning: 'Nervous, unpredictable, or has quirks. Approach slowly and ask first.',
    why: "Yellow means 'slow down' — the same instinct you feel at a yellow traffic light. This dog might be fine, but read the room before approaching.",
  },
  {
    hex: '#1565C0',
    name: 'Blue — Working / In Training',
    meaning: "This dog is focused on a task. Please don't distract them.",
    why: 'Blue signals calm, focus, and professionalism — think service vests and working dog gear. This dog has a job to do.',
  },
  {
    hex: '#C62828',
    name: 'Red — Do Not Approach',
    meaning: 'Reactive or aggressive. Give this dog wide space.',
    why: "Red means 'stop' — the most powerful warning color there is. No exceptions. Cross the street, change your path, give them room.",
  },
]

// Share the app via native share API or clipboard fallback
const SHARE_URL = 'https://canwesayhello.com'
const SHARE_TEXT = "Check out CanWeSayHello — a quick way to show your dog's temperament to other walkers!"

async function handleShare() {
  if (typeof navigator.share === 'function') {
    try {
      await navigator.share({ title: 'CanWeSayHello', text: SHARE_TEXT, url: SHARE_URL })
    } catch {
      // User cancelled
    }
  } else {
    try {
      await navigator.clipboard.writeText(SHARE_URL)
      alert('Link copied to clipboard!')
    } catch {
      // Clipboard not available
    }
  }
}

// Colored app name — each word in its signal color
function ColoredAppName() {
  return (
    <span className="font-bold">
      <span style={{ color: '#2E7D32' }}>Can</span>
      <span style={{ color: '#F9A825' }}>We</span>
      <span style={{ color: '#1565C0' }}>Say</span>
      <span style={{ color: '#C62828' }}>Hello</span>
    </span>
  )
}

export default function AboutScreen({ onBack }: AboutScreenProps) {
  return (
    <div className="flex flex-col h-full w-full px-6 py-8 overflow-y-auto">
      {/* Back button (44x44 touch target) */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white text-lg border-none cursor-pointer mr-3"
          aria-label="Go back to home"
        >
          ←
        </button>
      </div>

      {/* Bench icon (person sitting with dog) centered */}
      <div className="flex justify-center mb-4">
        <img
          src={import.meta.env.BASE_URL + 'assets/bench-icon.jpg'}
          alt="CanWeSayHello"
          width={52}
          height={52}
          style={{ filter: 'invert(1)', mixBlendMode: 'screen', objectFit: 'contain' }}
        />
      </div>

      {/* ===== COLOR GUIDE ===== */}
      <p
        className="text-center uppercase mb-5"
        style={{ fontSize: 12, color: '#666', letterSpacing: 1.5 }}
      >
        Color Guide
      </p>

      <div className="flex flex-col gap-4 mb-6">
        {colorGuide.map((entry) => (
          <div key={entry.hex} className="flex gap-3">
            {/* Color swatch */}
            <div
              className="shrink-0"
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                backgroundColor: entry.hex,
              }}
            />
            {/* Text lines */}
            <div className="flex flex-col">
              <span className="text-white font-bold" style={{ fontSize: 14 }}>
                {entry.name}
              </span>
              <span style={{ fontSize: 12.5, color: '#cccccc' }}>
                {entry.meaning}
              </span>
              <span className="italic" style={{ fontSize: 11.5, color: '#777777' }}>
                {entry.why}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full mb-6" style={{ height: 1, backgroundColor: '#2a2a2a' }} />

      {/* ===== SIGNAL MODES EXPLANATION ===== */}
      <h2 className="text-center text-white font-bold text-xl mb-4">
        Two Signal Modes
      </h2>

      <div
        className="rounded-[14px] px-5 py-5 mb-3"
        style={{ backgroundColor: '#1e1e1e', border: '1px solid #2a2a2a' }}
      >
        <p className="text-white font-bold text-lg mb-1">
          Steady Mode
        </p>
        <p style={{ fontSize: 15, color: '#cccccc' }}>
          Your signal stays solid. Use this when someone is already heading your way — the color tells them what to expect from your dog at a glance.
        </p>
      </div>

      <div
        className="rounded-[14px] px-5 py-5 mb-3"
        style={{ backgroundColor: '#1e1e1e', border: '1px solid #2a2a2a' }}
      >
        <p className="text-white font-bold text-lg mb-1">
          Flash Mode
        </p>
        <p style={{ fontSize: 15, color: '#cccccc' }}>
          Need to catch someone's attention from across a field or down a trail? Press the Flash to Get Attention button. Your screen will pulse on and off — much easier to spot at a distance. Tap the button or tap anywhere on screen to stop.
        </p>
      </div>

      <p className="text-center mb-6" style={{ fontSize: 14, color: '#888' }}>
        Use the back arrow to return to the home screen.
      </p>

      {/* Divider */}
      <div className="w-full mb-6" style={{ height: 1, backgroundColor: '#2a2a2a' }} />

      {/* ===== HELP SPREAD THE WORD ===== */}
      <div
        className="rounded-[14px] px-5 py-6 mb-6 text-center"
        style={{
          background: 'linear-gradient(135deg, #2E7D32 0%, #1565C0 100%)',
        }}
      >
        <p className="text-white font-bold text-xl mb-2">
          Help Spread The Word
        </p>
        <p className="text-white/80 text-sm mb-4">
          Please share <ColoredAppName /> with one person
        </p>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-[#1a1a2e] font-bold text-base border-none cursor-pointer active:scale-[0.98] transition-transform"
        >
          <span>↗</span> Share the App
        </button>
      </div>
    </div>
  )
}
