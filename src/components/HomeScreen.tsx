import { signals, type Signal } from '../data/signals'
import PawIcon from './PawIcon'
import { getSignalIcon } from './SignalIcons'

// HomeScreen — displays the logo, 4 signal color buttons, and navigation
// Nav bar pushed down 52px to clear phone notches

interface HomeScreenProps {
  onSelectSignal: (signal: Signal) => void
  onOpenProfile: () => void
  onOpenAbout: () => void
  onOpenShare: () => void
  dogName: string
}

// Info icon — circle with "i"
function InfoIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  )
}

// Share icon — square with upward arrow
function ShareIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  )
}

// Settings gear icon
function GearIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

export default function HomeScreen({ onSelectSignal, onOpenProfile, onOpenAbout, onOpenShare, dogName: _dogName }: HomeScreenProps) {
  return (
    <div className="flex flex-col h-full w-full px-6 pb-4" style={{ paddingTop: 40 }}>
      {/* Nav bar — bench icon left, action buttons right */}
      <div className="flex items-center justify-between mb-2">
        {/* Left: Bench icon (person sitting with dog) — 200% larger */}
        <div className="w-20 h-20 flex items-center justify-center">
          <img
            src={import.meta.env.BASE_URL + 'assets/bench-icon.jpg'}
            alt="CanWeSayHello"
            width={76}
            height={76}
            style={{
              filter: 'invert(1)',
              mixBlendMode: 'screen',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Right: Paw → Info → Share → Settings */}
        <div className="flex items-center gap-0.5">
          {/* Paw logo */}
          <div className="w-11 h-11 flex items-center justify-center">
            <PawIcon size={28} />
          </div>

          {/* Info / About button */}
          <button
            onClick={onOpenAbout}
            className="w-11 h-11 flex items-center justify-center text-gray-400 bg-transparent border-none cursor-pointer"
            aria-label="About and color guide"
          >
            <InfoIcon />
          </button>

          {/* Share button */}
          <button
            onClick={onOpenShare}
            className="w-11 h-11 flex items-center justify-center text-gray-400 bg-transparent border-none cursor-pointer"
            aria-label="Share CanWeSayHello"
          >
            <ShareIcon />
          </button>

          {/* Settings / Profile button */}
          <button
            onClick={onOpenProfile}
            className="w-11 h-11 flex items-center justify-center text-gray-400 bg-transparent border-none cursor-pointer"
            aria-label="Open dog profile settings"
          >
            <GearIcon />
          </button>
        </div>
      </div>

      {/* App title + helper text — centered */}
      <div className="flex flex-col items-center mb-1">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          CanWeSayHello
        </h1>
        <p className="text-gray-500 mt-0 text-xs">
          Tap a color that best describes your dog's temperament
        </p>
      </div>

      {/* Signal buttons — each one fills available space evenly, with icon above label */}
      <div className="flex flex-col gap-2.5 flex-1">
        {signals.map((signal) => {
          const IconComponent = getSignalIcon(signal.id)
          return (
            <button
              key={signal.id}
              onClick={() => onSelectSignal(signal)}
              className="flex-1 rounded-2xl flex flex-col items-center justify-center cursor-pointer active:scale-[0.98] transition-transform border-none px-4"
              style={{ backgroundColor: signal.hex }}
              aria-label={`Show ${signal.label} signal`}
            >
              {/* Signal icon */}
              <IconComponent size={75} color={signal.textColor} />

              {/* Signal label */}
              <span
                className="text-lg font-bold mt-1"
                style={{ color: signal.textColor }}
              >
                {signal.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Color guide link at the bottom — secondary access point */}
      <button
        onClick={onOpenAbout}
        className="mt-2 text-gray-400 text-sm bg-transparent border-none cursor-pointer underline"
        aria-label="Open color guide"
      >
        What do the colors mean?
      </button>
    </div>
  )
}
