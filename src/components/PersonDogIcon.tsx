// PersonDogIcon — Pictogram: person waving hello with dog raising paw beside them
// Matches CanWeSayHello brand — both person and dog are greeting
// Used as the logo in the nav bar

interface PersonDogIconProps {
  size?: number
  className?: string
}

export default function PersonDogIcon({ size = 38, className = '' }: PersonDogIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* === PERSON (left side) === */}
      {/* Head */}
      <circle cx="20" cy="7" r="5" />
      {/* Body — solid torso, slight taper */}
      <path d="M13.5 14 L13.5 37 L17 37 L17 28 L23 28 L23 37 L26.5 37 L26.5 14 Z" />
      {/* Left arm — raised up, waving hello */}
      <path d="M13.5 16 L8 9 L5.5 3" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      {/* Wave motion arcs near raised hand */}
      <path d="M2 5 Q3 2.5 5 1.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M2.5 8.5 Q4 5 6.5 3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      {/* Right arm — reaching down toward dog */}
      <path d="M26.5 16 L33 26" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      {/* Left leg */}
      <rect x="13.5" y="37" width="4.5" height="17" rx="2.2" />
      {/* Right leg */}
      <rect x="22" y="37" width="4.5" height="17" rx="2.2" />

      {/* === DOG (right side, sitting, facing left) === */}
      {/* Dog body — compact sitting shape */}
      <path d="M38 36 Q36 32 37 28 L37 28 Q38 26 41 26 L44 26 Q48 26 49 30 L49.5 36 Q50 42 46 44 L40 44 Q36 44 36 40 Z" />
      {/* Dog head — facing left toward person */}
      <circle cx="40" cy="24" r="4.5" />
      {/* Dog snout — pointing left */}
      <ellipse cx="36" cy="25.5" rx="2.5" ry="1.5" />
      {/* Dog ear — floppy, on right side */}
      <path d="M43.5 21 Q46 20 46 23 L46 26 Q46 27.5 44.5 27 Q43 26.5 43 24.5 Z" />
      {/* Dog raised paw — waving */}
      <path d="M37 34 L33 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Dog paw wave arcs */}
      <path d="M30 27 Q31 25 33 24.5" stroke="white" strokeWidth="1" strokeLinecap="round" fill="none" />
      <path d="M30 30 Q31.5 27.5 34 27" stroke="white" strokeWidth="1" strokeLinecap="round" fill="none" />
      {/* Dog front right leg — on ground */}
      <rect x="41" y="43" width="2.5" height="5.5" rx="1.2" />
      {/* Dog hind leg — visible behind */}
      <rect x="46" y="43" width="2.5" height="5.5" rx="1.2" />
      {/* Dog tail — curling up and back */}
      <path d="M49 36 Q53 34 53 29" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}
