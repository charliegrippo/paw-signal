// StoryScreen — full-screen "Our Story" page shown once before signup
// Dark layout with Helvetica typography and the mission statement

interface StoryScreenProps {
  onContinue: () => void
}

// Colored app name — each word in its signal color
function ColoredAppName({ size = 16 }: { size?: number }) {
  return (
    <span style={{ fontSize: size, fontWeight: 700 }}>
      <span style={{ color: '#2E7D32' }}>Can</span>
      <span style={{ color: '#F9A825' }}>We</span>
      <span style={{ color: '#1565C0' }}>Say</span>
      <span style={{ color: '#C62828' }}>Hello</span>
    </span>
  )
}

// Small solid paw print SVG for the heading decoration
function MiniPaw() {
  return (
    <svg width="18" height="18" viewBox="0 0 512 512" fill="#C62828" className="animate-paw-blink">
      <ellipse cx="256" cy="340" rx="85" ry="70" />
      <ellipse cx="165" cy="240" rx="40" ry="50" />
      <ellipse cx="256" cy="200" rx="40" ry="50" />
      <ellipse cx="347" cy="240" rx="40" ry="50" />
    </svg>
  )
}

export default function StoryScreen({ onContinue }: StoryScreenProps) {
  return (
    <div
      className="flex flex-col h-full w-full overflow-y-auto"
      style={{
        background: 'linear-gradient(to bottom, #111111, #1a1a1a)',
        fontFamily: 'Helvetica, Arial, sans-serif',
        paddingBottom: 100, // space for fixed button
      }}
    >
      {/* Blink animation style */}
      <style>{`
        @keyframes pawBlink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
        .animate-paw-blink {
          animation: pawBlink 2s infinite;
        }
      `}</style>

      <div className="flex flex-col items-center px-6 pt-8">
        {/* Top left: bench icon + colored app name */}
        <div className="flex items-center gap-3 self-start mb-6">
          <img
            src={import.meta.env.BASE_URL + 'assets/bench-icon.jpg'}
            alt="CanWeSayHello"
            width={48}
            height={48}
            style={{ filter: 'invert(1)', mixBlendMode: 'screen', objectFit: 'contain' }}
          />
          <ColoredAppName size={20} />
        </div>

        {/* Our Story heading with blinking paw prints */}
        <div className="flex items-center gap-3 mb-1">
          <MiniPaw />
          <h1 className="font-bold text-white text-center" style={{ fontSize: 26 }}>
            Our Story
          </h1>
          <MiniPaw />
        </div>

        {/* Dedication */}
        <p className="italic text-center mb-5" style={{ fontSize: 14, color: '#cccccc' }}>
          for Benjamin <span style={{ color: '#C62828' }}>{'\u2665'}</span>
        </p>

        {/* Story paragraphs */}
        <div className="max-w-sm text-center">
          <p style={{ fontSize: 15, color: '#cccccc' }}>
            &ldquo;I created this after losing my dog in a dog&#8209;on&#8209;dog attack, with no warning and no way to prevent it.&rdquo;
          </p>

          <p className="mt-4 font-bold text-white" style={{ fontSize: 17 }}>
            &ldquo;This app changes that.&rdquo;
          </p>

          <p className="mt-4" style={{ fontSize: 15, color: '#cccccc' }}>
            &ldquo;It lets you identify your dog at a glance, so other walkers can instantly understand how to move around you, and you can understand them.
            <br />
            Not labels. Not judgments. Just clarity.&rdquo;
          </p>

          <p className="mt-4" style={{ fontSize: 15, color: '#cccccc' }}>
            &ldquo;A simple color signal tells the truth from a distance: some dogs are open, some need calm space, some are working, and some must be given a wide berth.&rdquo;
          </p>

          {/* Bold taglines — 24px white */}
          <div className="mt-6 flex flex-col gap-1">
            <p className="font-bold text-white" style={{ fontSize: 24 }}>One color. One signal.</p>
            <p className="font-bold text-white" style={{ fontSize: 24 }}>Fewer surprises.</p>
            <p className="font-bold text-white" style={{ fontSize: 24 }}>More space.</p>
            <p className="font-bold text-white" style={{ fontSize: 24 }}>Safer walks for everyone.</p>
          </div>
        </div>
      </div>

      {/* Fixed Continue button at bottom */}
      <div
        className="fixed bottom-0 left-0 right-0 flex justify-center px-6 pb-6 pt-3"
        style={{ background: 'linear-gradient(to top, #1a1a1a 60%, transparent)' }}
      >
        <button
          onClick={onContinue}
          className="flex flex-col items-center py-3 rounded-full font-bold bg-white text-[#1a1a2e] border-none cursor-pointer active:scale-[0.98] transition-transform"
          style={{ fontSize: 15, width: '100%', maxWidth: 280 }}
        >
          <span>Continue →</span>
          <span className="text-[11px] font-normal opacity-60 mt-0.5">Set up your dog's signal</span>
        </button>
      </div>
    </div>
  )
}
