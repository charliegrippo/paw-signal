import { signals } from '../data/signals'

// AboutScreen — color guide listing all 4 statuses with color, label, meaning, and guidance
// Ordered by urgency: Red, Yellow, Blue, Green (per PRD)

interface AboutScreenProps {
  onBack: () => void
}

// Reorder signals by urgency: Red first, then Yellow, Blue, Green
const urgencyOrder = ['red', 'yellow', 'blue', 'green']
const sortedSignals = [...signals].sort(
  (a, b) => urgencyOrder.indexOf(a.id) - urgencyOrder.indexOf(b.id)
)

export default function AboutScreen({ onBack }: AboutScreenProps) {
  return (
    <div className="flex flex-col h-full w-full px-6 py-8 overflow-y-auto">
      {/* Header with back button (44x44 touch target) */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white text-lg border-none cursor-pointer mr-3"
          aria-label="Go back to home"
        >
          ←
        </button>
        <h1 className="text-2xl font-bold text-white">Color Guide</h1>
      </div>

      <p className="text-gray-400 text-sm mb-6">
        Each color communicates a dog's temperament at a glance. Ordered from
        most urgent to least.
      </p>

      {/* Signal cards — each shows color swatch, label, meaning, and guidance */}
      <div className="flex flex-col gap-4">
        {sortedSignals.map((signal) => (
          <div
            key={signal.id}
            className="rounded-xl overflow-hidden"
            style={{ border: `2px solid ${signal.hex}` }}
          >
            {/* Color header bar with label */}
            <div
              className="px-4 py-3 flex items-center gap-3"
              style={{ backgroundColor: signal.hex }}
            >
              <span
                className="text-lg font-bold"
                style={{ color: signal.textColor }}
              >
                {signal.label}
              </span>
            </div>

            {/* Meaning and guidance details */}
            <div className="px-4 py-3 bg-white/5">
              <p className="text-white text-sm mb-2">
                <span className="text-gray-400 font-medium">Meaning: </span>
                {signal.meaning}
              </p>
              <p className="text-white text-sm">
                <span className="text-gray-400 font-medium">Guidance: </span>
                {signal.guidance}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
