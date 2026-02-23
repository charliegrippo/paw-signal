// SignalIcons — inline SVG icons for each of the 4 signal colors
// Used on both the signal screen (large, ~160px) and home screen buttons (medium, ~75px)

interface IconProps {
  size?: number
  color?: string
  className?: string
}

// Green (Friendly): Smiley face — circle with dot eyes and curved smile
export function SmileyIcon({ size = 160, color = 'white', className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Face circle */}
      <circle cx="32" cy="32" r="28" stroke={color} strokeWidth="3" />
      {/* Left eye */}
      <circle cx="22" cy="26" r="3" fill={color} />
      {/* Right eye */}
      <circle cx="42" cy="26" r="3" fill={color} />
      {/* Smile */}
      <path
        d="M20 38 Q32 50 44 38"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

// Yellow (Caution/Quirks): Warning triangle with exclamation mark
export function WarningIcon({ size = 160, color = 'white', className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Triangle */}
      <path
        d="M32 6 L58 54 H6 Z"
        stroke={color}
        strokeWidth="3"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Exclamation line */}
      <line x1="32" y1="24" x2="32" y2="40" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      {/* Exclamation dot */}
      <circle cx="32" cy="47" r="2.5" fill={color} />
    </svg>
  )
}

// Blue (Working/In Training): Shield with star inside
export function ShieldStarIcon({ size = 160, color = 'white', className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Shield outline */}
      <path
        d="M32 4 L54 14 V34 C54 46 44 56 32 60 C20 56 10 46 10 34 V14 Z"
        stroke={color}
        strokeWidth="3"
        strokeLinejoin="round"
        fill="none"
      />
      {/* 5-point star centered in shield */}
      <path
        d="M32 18 L35.5 27 L45 27.5 L37.5 33 L40 42 L32 36.5 L24 42 L26.5 33 L19 27.5 L28.5 27 Z"
        fill={color}
      />
    </svg>
  )
}

// Red (Do Not Approach): Universal no symbol — circle with diagonal line
export function NoSymbolIcon({ size = 160, color = 'white', className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Circle */}
      <circle cx="32" cy="32" r="26" stroke={color} strokeWidth="3.5" />
      {/* Diagonal line — bottom-left to top-right */}
      <line
        x1="14"
        y1="50"
        x2="50"
        y2="14"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Helper: returns the correct icon component for a given signal ID
export function getSignalIcon(signalId: string) {
  switch (signalId) {
    case 'green':
      return SmileyIcon
    case 'yellow':
      return WarningIcon
    case 'blue':
      return ShieldStarIcon
    case 'red':
      return NoSymbolIcon
    default:
      return SmileyIcon
  }
}
