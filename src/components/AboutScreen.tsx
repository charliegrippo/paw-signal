// AboutScreen — Help Spread The Word on top, then color guide, then signal modes

interface AboutScreenProps {
  onBack: () => void
  onOpenShare: () => void
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

export default function AboutScreen({ onBack, onOpenShare }: AboutScreenProps) {
  return (
    <div className="flex flex-col h-full w-full px-6 py-6 overflow-y-auto">
      {/* Header — back button */}
      <div className="flex items-center mb-3">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white text-lg border-none cursor-pointer"
          aria-label="Go back to home"
        >
          ←
        </button>
      </div>

      {/* ===== HELP SPREAD THE WORD (top section) ===== */}
      <div
        className="rounded-[14px] px-5 py-4 mb-4 text-center"
        style={{
          background: 'linear-gradient(135deg, #2E7D32 0%, #1565C0 100%)',
        }}
      >
        {/* Bench icon top-left inside the box */}
        <div className="mb-3">
          <img
            src={import.meta.env.BASE_URL + 'assets/bench-icon.jpg'}
            alt="CanWeSayHello"
            width={36}
            height={36}
            style={{ filter: 'invert(1)', mixBlendMode: 'screen', objectFit: 'contain' }}
          />
        </div>
        <p className="text-white font-bold text-2xl mb-1 text-center">
          Help Spread The Word
        </p>
        <p className="text-white font-bold text-3xl mb-3 text-center">
          Please share with 1 person.
        </p>
        <button
          onClick={onOpenShare}
          className="inline-flex items-center gap-2 px-8 py-2.5 rounded-full bg-white text-[#1a1a2e] font-bold text-base border-none cursor-pointer active:scale-[0.98] transition-transform"
        >
          <span>↗</span> Share the App
        </button>
      </div>

      {/* ===== COLOR GUIDE ===== */}
      <p
        className="text-center uppercase mb-3"
        style={{ fontSize: 12, color: '#666', letterSpacing: 1.5 }}
      >
        Color Guide
      </p>

      <div className="flex flex-col gap-2.5 mb-6">
        {colorGuide.map((entry) => (
          <div key={entry.hex} className="flex gap-3">
            {/* Color swatch */}
            <div
              className="shrink-0"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
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
    </div>
  )
}
