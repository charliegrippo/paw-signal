import type { Signal } from '../data/signals'

// SignalScreen — fills the entire phone screen with the selected signal color
// Shows the status label in large bold text and guidance text below
// Tapping anywhere returns to the home screen

interface SignalScreenProps {
  signal: Signal
  onBack: () => void
}

export default function SignalScreen({ signal, onBack }: SignalScreenProps) {
  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full cursor-pointer px-8"
      style={{ backgroundColor: signal.hex }}
      onClick={onBack}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onBack()
      }}
      aria-label={`${signal.label} signal. Tap to go back.`}
    >
      {/* Status label — large and bold so it's visible from a distance */}
      <h1
        className="text-5xl sm:text-6xl font-black text-center leading-tight mb-6"
        style={{ color: signal.textColor }}
      >
        {signal.label}
      </h1>

      {/* Guidance text — tells the other walker what to do */}
      <p
        className="text-xl sm:text-2xl text-center font-medium opacity-90 max-w-sm"
        style={{ color: signal.textColor }}
      >
        {signal.guidance}
      </p>

      {/* Subtle hint to tap back */}
      <p
        className="mt-12 text-sm opacity-50"
        style={{ color: signal.textColor }}
      >
        Tap anywhere to go back
      </p>
    </div>
  )
}
