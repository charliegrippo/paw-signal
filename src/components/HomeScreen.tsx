import { signals, type Signal } from '../data/signals'
import PawIcon from './PawIcon'

// HomeScreen — displays the paw icon, 4 signal color buttons, and navigation
// Tapping a button triggers onSelectSignal to show the full-screen signal

interface HomeScreenProps {
  onSelectSignal: (signal: Signal) => void
  onOpenProfile: () => void
  onOpenAbout: () => void
  onOpenShare: () => void
  dogName: string
}

export default function HomeScreen({ onSelectSignal, onOpenProfile, onOpenAbout, onOpenShare, dogName }: HomeScreenProps) {
  return (
    <div className="flex flex-col h-full w-full px-6 py-8">
      {/* Header — paw icon + app title + profile button */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-3">
          <PawIcon size={48} />
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Paw Signal
            </h1>
            <p className="text-gray-400 mt-1 text-sm">
              {dogName
                ? `Signaling for ${dogName}`
                : "Tap a color to signal your dog's status"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onOpenShare}
            className="text-gray-400 text-xl bg-transparent border-none cursor-pointer p-2"
            aria-label="Share Paw Signal"
          >
            ↗
          </button>
          <button
            onClick={onOpenProfile}
            className="text-gray-400 text-2xl bg-transparent border-none cursor-pointer p-2 -mr-2"
            aria-label="Open dog profile"
          >
            ⚙
          </button>
        </div>
      </div>

      {/* Signal buttons — each one fills available space evenly */}
      <div className="flex flex-col gap-4 flex-1">
        {signals.map((signal) => (
          <button
            key={signal.id}
            onClick={() => onSelectSignal(signal)}
            className="flex-1 rounded-2xl flex items-center justify-between px-6 cursor-pointer active:scale-[0.98] transition-transform border-none"
            style={{ backgroundColor: signal.hex }}
            aria-label={`Show ${signal.label} signal`}
          >
            {/* Signal label */}
            <span
              className="text-xl font-bold"
              style={{ color: signal.textColor }}
            >
              {signal.label}
            </span>

            {/* Chevron arrow to hint it's tappable */}
            <span
              className="text-2xl opacity-60"
              style={{ color: signal.textColor }}
            >
              ›
            </span>
          </button>
        ))}
      </div>

      {/* Color guide link at the bottom */}
      <button
        onClick={onOpenAbout}
        className="mt-4 text-gray-400 text-sm bg-transparent border-none cursor-pointer underline"
        aria-label="Open color guide"
      >
        What do the colors mean?
      </button>
    </div>
  )
}
