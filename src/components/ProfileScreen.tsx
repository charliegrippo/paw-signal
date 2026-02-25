import { useState } from 'react'
import { signals } from '../data/signals'
import { loadProfile, saveProfile, type DogProfile } from '../data/profile'
import { trackEvent } from '../utils/analytics'

// ProfileScreen — lets the user edit their profile and default signal color
// First name, email, and dog name are required; phone is optional but recommended

interface ProfileScreenProps {
  onBack: () => void
  onSaveAndGoToSignal: (signalId: string) => void
}

export default function ProfileScreen({ onBack, onSaveAndGoToSignal }: ProfileScreenProps) {
  const [profile, setProfile] = useState<DogProfile>(() => {
    const loaded = loadProfile()
    // Clear pre-filled values so fields show placeholders instead
    return {
      ...loaded,
      ownerFirstName: loaded.ownerFirstName || '',
      email: loaded.email || '',
      phone: loaded.phone || '',
      dogName: loaded.dogName || '',
    }
  })
  const [showErrors, setShowErrors] = useState(false)

  // Required fields: first name, email, dog name
  const firstNameValid = profile.ownerFirstName.trim().length > 0
  const emailValid = profile.email.trim().length > 0
  const dogNameValid = profile.dogName.trim().length > 0
  const formValid = firstNameValid && emailValid && dogNameValid

  function handleChange(field: keyof DogProfile) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setShowErrors(false)
      setProfile((prev) => ({ ...prev, [field]: e.target.value }))
    }
  }

  // Update default signal when a color is tapped
  function handleSignalSelect(signalId: string) {
    setProfile((prev) => ({ ...prev, defaultSignalId: signalId }))
  }

  // Save with validation — first name, email, dog name are required
  function handleSave() {
    if (!formValid) {
      setShowErrors(true)
      return
    }
    saveProfile(profile)
    trackEvent('profile_saved')
    onSaveAndGoToSignal(profile.defaultSignalId)
  }

  // Skip — go straight to home without saving
  function handleSkip() {
    onBack()
  }

  // Helper to get input border class based on validation state
  function borderClass(isValid: boolean): string {
    return showErrors && !isValid
      ? 'border-red-500'
      : 'border-white/20 focus:border-white/50'
  }

  return (
    <div className="flex flex-col h-full w-full px-6 py-8 overflow-y-auto">
      {/* Header with back button */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white text-lg border-none cursor-pointer mr-3"
          aria-label="Go back to home"
        >
          ←
        </button>
        <h1 className="text-2xl font-bold text-white">Profile</h1>
      </div>

      {/* Top action buttons — side by side */}
      <div className="flex gap-3 mb-6">
        {/* Save & Go to My Signal */}
        <button
          onClick={handleSave}
          className="flex-1 flex flex-col items-center justify-center py-3 px-3 rounded-xl font-bold text-white border-none cursor-pointer active:scale-[0.98] transition-transform"
          style={{ backgroundColor: '#2E7D32' }}
        >
          <span className="text-sm font-bold">Save &amp; Go to My Signal →</span>
          <span className="text-[11px] font-normal opacity-80 mt-0.5">One-time setup</span>
        </button>

        {/* Skip for Now */}
        <button
          onClick={handleSkip}
          className="flex-1 flex flex-col items-center justify-center py-3 px-3 rounded-xl font-bold text-white border border-white/30 bg-transparent cursor-pointer active:scale-[0.98] transition-transform"
        >
          <span className="text-sm font-bold">Skip for Now</span>
          <span className="text-[11px] font-normal opacity-60 mt-0.5">Enter your info every time</span>
        </button>
      </div>

      {/* Your First Name — required */}
      <div className="mb-5">
        <label className="block text-gray-400 text-sm mb-2" htmlFor="profile-first-name">
          Your First Name <span className="text-red-400">*</span>
        </label>
        <input
          id="profile-first-name"
          type="text"
          value={profile.ownerFirstName}
          onChange={handleChange('ownerFirstName')}
          placeholder="Your first name"
          className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white text-lg outline-none placeholder:text-gray-500 border ${borderClass(firstNameValid)}`}
          maxLength={30}
        />
        {showErrors && !firstNameValid && (
          <p className="text-red-400 text-sm mt-1">First name is required</p>
        )}
      </div>

      {/* Email Address — required */}
      <div className="mb-5">
        <label className="block text-gray-400 text-sm mb-2" htmlFor="profile-email">
          Email Address <span className="text-red-400">*</span>
        </label>
        <input
          id="profile-email"
          type="email"
          value={profile.email}
          onChange={handleChange('email')}
          placeholder="For updates & tips only"
          className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white text-lg outline-none placeholder:text-gray-500 border ${borderClass(emailValid)}`}
          maxLength={60}
        />
        {showErrors && !emailValid && (
          <p className="text-red-400 text-sm mt-1">Email is required</p>
        )}
      </div>

      {/* Phone Number — optional but recommended */}
      <div className="mb-5">
        <label className="block text-gray-400 text-sm mb-2" htmlFor="profile-phone">
          Phone Number <span className="text-gray-500">(optional, but highly recommended)</span>
        </label>
        <input
          id="profile-phone"
          type="tel"
          value={profile.phone}
          onChange={handleChange('phone')}
          placeholder="For text alerts only"
          className="w-full px-4 py-3 rounded-xl bg-white/10 text-white text-lg border border-white/20 outline-none focus:border-white/50 placeholder:text-gray-500"
          maxLength={20}
        />
      </div>

      {/* Dog's Name — required */}
      <div className="mb-6">
        <label className="block text-gray-400 text-sm mb-2" htmlFor="profile-dog-name">
          Dog's Name <span className="text-red-400">*</span>
        </label>
        <input
          id="profile-dog-name"
          type="text"
          value={profile.dogName}
          onChange={handleChange('dogName')}
          placeholder="Your dog's name"
          className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white text-lg outline-none placeholder:text-gray-500 border ${borderClass(dogNameValid)}`}
          maxLength={30}
        />
        {showErrors && !dogNameValid && (
          <p className="text-red-400 text-sm mt-1">Dog's name is required</p>
        )}
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
    </div>
  )
}
