import PawIcon from './PawIcon'

// StoryScreen — full-screen "Our Story" page shown once before signup
// Dark, elegant layout with serif typography and the mission statement

interface StoryScreenProps {
  onContinue: () => void
}

// Signal colors for the four dots
const dotColors = ['#C62828', '#F9A825', '#1565C0', '#2E7D32']

export default function StoryScreen({ onContinue }: StoryScreenProps) {
  return (
    <div
      className="flex flex-col items-center h-full w-full px-8 py-10 overflow-y-auto"
      style={{ background: 'linear-gradient(to bottom, #111111, #1a1a1a)' }}
    >
      {/* Paw icon */}
      <PawIcon size={60} />

      {/* Four signal color dots */}
      <div className="flex items-center mt-4" style={{ gap: '7px' }}>
        {dotColors.map((color) => (
          <span
            key={color}
            className="rounded-full inline-block"
            style={{ width: 9, height: 9, backgroundColor: color }}
          />
        ))}
      </div>

      {/* Title */}
      <h1
        className="mt-6 font-bold text-white text-center"
        style={{ fontFamily: 'Lora, Georgia, serif', fontSize: 26 }}
      >
        Our Story
      </h1>

      {/* Subtitle */}
      <p
        className="mt-2 text-center uppercase"
        style={{ fontSize: 12, color: '#666', letterSpacing: 2 }}
      >
        Why CanWeSayHello Exists
      </p>

      {/* Gradient divider using all 4 signal colors */}
      <div
        className="mt-5 rounded-full"
        style={{
          width: 36,
          height: 3,
          background: 'linear-gradient(to right, #C62828, #F9A825, #1565C0, #2E7D32)',
        }}
      />

      {/* Story paragraphs */}
      <div className="mt-6 max-w-sm text-center" style={{ fontFamily: 'Lora, Georgia, serif' }}>
        <p style={{ fontSize: 15, color: '#cccccc' }}>
          CanWeSayHello was{' '}
          <span className="font-semibold text-white">born from loss.</span>
        </p>

        <p className="mt-4" style={{ fontSize: 15, color: '#cccccc' }}>
          The creator of this app lost his dog to a sudden dog&#8209;on&#8209;dog
          attack — no warning signs, no way to know.
        </p>

        <p className="mt-4" style={{ fontSize: 15, color: '#cccccc' }}>
          <span className="font-semibold text-white">
            No one should ever experience that.
          </span>
        </p>

        <p className="mt-4" style={{ fontSize: 15, color: '#cccccc' }}>
          This app exists so every walker can see what's coming and every dog
          gets the space they need.
        </p>
      </div>

      {/* Tagline */}
      <p
        className="mt-6 text-center italic text-white"
        style={{ fontFamily: 'Lora, Georgia, serif', fontSize: 16 }}
      >
        One color. One signal.
        <br />
        A safer walk for everyone.
      </p>

      {/* Divider */}
      <div className="w-full mt-6" style={{ height: 1, backgroundColor: '#2a2a2a' }} />

      {/* Spread the word */}
      <p
        className="mt-6 text-center uppercase text-white font-bold"
        style={{ fontSize: 13, letterSpacing: 1.5 }}
      >
        Help Us Spread the Word
      </p>

      {/* Subtext */}
      <p
        className="mt-3 text-center"
        style={{ fontFamily: 'Lora, Georgia, serif', fontSize: 14, color: '#999' }}
      >
        Use it. Share it. Give us feedback.
        <br />
        Every person who sees a signal
        <br />
        is a dog that stays safe.
      </p>

      {/* Continue button */}
      <button
        onClick={onContinue}
        className="mt-8 mb-4 py-3 rounded-full font-bold bg-white text-[#1a1a2e] border-none cursor-pointer active:scale-[0.98] transition-transform"
        style={{ fontSize: 15, width: '100%', maxWidth: 260 }}
      >
        Continue
      </button>
    </div>
  )
}
