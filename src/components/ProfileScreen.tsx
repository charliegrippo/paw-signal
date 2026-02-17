import { useState, useEffect } from 'react'
import { signals } from '../data/signals'
import { loadProfile, saveProfile, type DogProfile } from '../data/profile'

// ProfileScreen — lets the user save their dog's name and default signal color
// Data persists in localStorage so it's available across sessions

interface ProfileScreenProps {
  onBack: () => void
}

export default function ProfileScreen({ onBack }: ProfileScreenProps) {
  const [profile, setProfile] = useState<DogProfile>(loadProfile)
  const [saved, setSaved] = useState(false)

  // Auto-save whenever the profile changes (after initial load)
  useEffect(() => {
    saveProfile(profile)
  }, [profile])

  // Update dog name as the user types
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSaved(false)
    setProfile((prev) => ({ ...prev, dogName: e.target.value }))
  }

  // Update default signal when a color is tapped
  function handleSignalSelect(signalId: string) {
    setSaved(false)
    setProfile((prev) => ({ ...prev, defaultSignalId: signalId }))
  }

  // Explicit save button feedback
  function handleSave() {
    saveProfile(profile)
    setSaved(true)
  }

  return (
    <div className="flex flex-col h-full w-full px-6 py-8">
      {/* Header with back button */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="text-gray-400 text-sm border-none bg-transparent cursor-pointer mr-4"
          aria-label="Go back to home"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-white">Dog Profile</h1>
      </div>

      {/* Dog name input */}
      <div className="mb-8">
        <label className="block text-gray-400 text-sm mb-2" htmlFor="dog-name">
          Dog's Name
        </label>
        <input
          id="dog-name"
          type="text"
          value={profile.dogName}
          onChange={handleNameChange}
          placeholder="Enter your dog's name"
          className="w-full px-4 py-3 rounded-xl bg-white/10 text-white text-lg border border-white/20 outline-none focus:border-white/50 placeholder:text-gray-500"
          maxLength={30}
        />
      </div>

      {/* Default signal color picker */}
      <div className="mb-8">
        <label className="block text-gray-400 text-sm mb-2">
          Default Status
        </label>
        <div className="flex flex-col gap-3">
          {signals.map((signal) => {
            const isSelected = profile.defaultSignalId === signal.id
            return (
              <button
                key={signal.id}
                onClick={() => handleSignalSelect(signal.id)}
                className={`rounded-xl px-4 py-3 flex items-center gap-3 border-2 cursor-pointer transition-all ${
                  isSelected ? 'border-white' : 'border-transparent'
                }`}
                style={{ backgroundColor: signal.hex }}
                aria-label={`Set default to ${signal.label}`}
                aria-pressed={isSelected}
              >
                {/* Selection indicator */}
                <span
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-white' : 'border-white/40'
                  }`}
                >
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-white" />
                  )}
                </span>

                {/* Signal label */}
                <span
                  className="text-base font-semibold"
                  style={{ color: signal.textColor }}
                >
                  {signal.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        className="mt-auto py-4 rounded-xl font-bold text-lg cursor-pointer border-none transition-colors bg-white text-[#1a1a2e]"
      >
        {saved ? 'Saved!' : 'Save Profile'}
      </button>
    </div>
  )
}
