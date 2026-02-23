import { signals, type Signal } from '../data/signals'
import PersonDogIcon from './PersonDogIcon'
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

// Paw print SVG icon — realistic paw: 4 toe pads in arc + large main pad
function PawPrintIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Main pad — large rounded shape at bottom */}
      <path d="M6.5 15 Q6 12 8 11 L10.5 10 Q12 9.5 13.5 10 L16 11 Q18 12 17.5 15 Q17 17.5 15 19 Q13.5 20.5 12 20.5 Q10.5 20.5 9 19 Q7 17.5 6.5 15 Z" />
      {/* Toe pad — far left */}
      <ellipse cx="5.5" cy="9" rx="2" ry="2.5" transform="rotate(-15 5.5 9)" />
      {/* Toe pad — inner left */}
      <ellipse cx="9" cy="6" rx="1.8" ry="2.5" transform="rotate(-5 9 6)" />
      {/* Toe pad — inner right */}
      <ellipse cx="15" cy="6" rx="1.8" ry="2.5" transform="rotate(5 15 6)" />
      {/* Toe pad — far right */}
      <ellipse cx="18.5" cy="9" rx="2" ry="2.5" transform="rotate(15 18.5 9)" />
    </svg>
  )
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
    <div className="flex flex-col h-full w-full px-6 pb-8" style={{ paddingTop: 52 }}>
      {/* Nav bar — logo left, icon buttons right */}
      <div className="flex items-center justify-between mb-6">
        {/* Left: Person+dog logo as home button */}
        <div className="w-11 h-11 flex items-center justify-center">
          <PersonDogIcon size={38} />
        </div>

        {/* Right: Paw (placeholder) → Info → Share → Settings */}
        <div className="flex items-center gap-0.5">
          {/* Paw print icon */}
          <div
            className="w-11 h-11 flex items-center justify-center text-white"
            aria-label="Paw print"
          >
            <PawPrintIcon />
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

      {/* App title + greeting — no logo here, it's in the nav bar */}
      <div className="flex flex-col items-center mb-4">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          CanWeSayHello
        </h1>
        <p className="text-gray-500 mt-1 text-xs">
          Tap a color to display your signal
        </p>
      </div>

      {/* Signal buttons — each one fills available space evenly, with icon above label */}
      <div className="flex flex-col gap-4 flex-1">
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
        className="mt-4 text-gray-400 text-sm bg-transparent border-none cursor-pointer underline"
        aria-label="Open color guide"
      >
        What do the colors mean?
      </button>
    </div>
  )
}
