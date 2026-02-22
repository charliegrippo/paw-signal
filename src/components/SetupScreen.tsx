import { useState } from 'react'
import { signals } from '../data/signals'
import { saveProfile, type DogProfile } from '../data/profile'

// SetupScreen — first-time onboarding that collects dog name (required),
// breed (optional), and default status color (optional) before allowing
// access to the rest of the app

interface SetupScreenProps {
  onComplete: () => void
}

export default function SetupScreen({ onComplete }: SetupScreenProps) {
  const [profile, setProfile] = useState<DogProfile>({
    dogName: '',
    breed: '',
    defaultSignalId: 'green',
  })
  // Track whether user has tried to submit with empty name
  const [showError, setShowError] = useState(false)

  const nameIsValid = profile.dogName.trim().length > 0

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setShowError(false)
    setProfile((prev) => ({ ...prev, dogName: e.target.value }))
  }

  function handleBreedChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProfile((prev) => ({ ...prev, breed: e.target.value }))
  }

  function handleSignalSelect(signalId: string) {
    setProfile((prev) => ({ ...prev, defaultSignalId: signalId }))
  }

  function handleContinue() {
    if (!nameIsValid) {
      setShowError(true)
      return
    }
    saveProfile(profile)
    onComplete()
  }

  return (
    <div className="flex flex-col h-full w-full px-6 py-8">
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Welcome to Paw Signal
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Tell us about your dog to get started
        </p>
      </div>

      {/* Dog name input — required */}
      <div className="mb-6">
        <label className="block text-gray-400 text-sm mb-2" htmlFor="setup-dog-name">
          Dog's Name <span className="text-red-400">*</span>
        </label>
        <input
          id="setup-dog-name"
          type="text"
          value={profile.dogName}
          onChange={handleNameChange}
          placeholder="Enter your dog's name"
          className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white text-lg outline-none placeholder:text-gray-500 border ${
            showError && !nameIsValid
              ? 'border-red-500'
              : 'border-white/20 focus:border-white/50'
          }`}
          maxLength={30}
          autoFocus
        />
        {showError && !nameIsValid && (
          <p className="text-red-400 text-sm mt-1">Dog name is required</p>
        )}
      </div>

      {/* Breed input — optional */}
      <div className="mb-6">
        <label className="block text-gray-400 text-sm mb-2" htmlFor="setup-breed">
          Breed <span className="text-gray-500">(optional)</span>
        </label>
        <input
          id="setup-breed"
          type="text"
          value={profile.breed}
          onChange={handleBreedChange}
          placeholder="e.g. Golden Retriever"
          className="w-full px-4 py-3 rounded-xl bg-white/10 text-white text-lg border border-white/20 outline-none focus:border-white/50 placeholder:text-gray-500"
          maxLength={40}
        />
      </div>

      {/* Default signal color picker — optional, defaults to green */}
      <div className="mb-8">
        <label className="block text-gray-400 text-sm mb-2">
          Default Status <span className="text-gray-500">(optional)</span>
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
                <span
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-white' : 'border-white/40'
                  }`}
                >
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-white" />
                  )}
                </span>
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

      {/* Continue button — disabled until dog name is filled */}
      <button
        onClick={handleContinue}
        disabled={!nameIsValid}
        className={`mt-auto py-4 rounded-xl font-bold text-lg border-none transition-colors ${
          nameIsValid
            ? 'bg-white text-[#1a1a2e] cursor-pointer'
            : 'bg-white/20 text-gray-500 cursor-not-allowed'
        }`}
      >
        Continue
      </button>
    </div>
  )
}
