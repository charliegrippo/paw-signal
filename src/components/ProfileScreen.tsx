import { useState } from 'react'
import { signals } from '../data/signals'
import { loadProfile, saveProfile, type DogProfile } from '../data/profile'

// ProfileScreen — lets the user edit their profile and default signal color
// Owner first name, email, and phone are required; dog name is optional

interface ProfileScreenProps {
  onBack: () => void
}

export default function ProfileScreen({ onBack }: ProfileScreenProps) {
  const [profile, setProfile] = useState<DogProfile>(loadProfile)
  const [saved, setSaved] = useState(false)
  const [showErrors, setShowErrors] = useState(false)

  const firstNameValid = profile.ownerFirstName.trim().length > 0
  const emailValid = profile.email.trim().length > 0
  const phoneValid = profile.phone.trim().length > 0
  const formValid = firstNameValid && emailValid && phoneValid

  function handleChange(field: keyof DogProfile) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setSaved(false)
      setShowErrors(false)
      setProfile((prev) => ({ ...prev, [field]: e.target.value }))
    }
  }

  // Update default signal when a color is tapped
  function handleSignalSelect(signalId: string) {
    setSaved(false)
    setProfile((prev) => ({ ...prev, defaultSignalId: signalId }))
  }

  // Save with validation — first name, email, phone are required
  function handleSave() {
    if (!formValid) {
      setShowErrors(true)
      return
    }
    saveProfile(profile)
    setSaved(true)
  }

  // Helper to get input border class based on validation state
  function borderClass(isValid: boolean): string {
    return showErrors && !isValid
      ? 'border-red-500'
      : 'border-white/20 focus:border-white/50'
  }

  return (
    <div className="flex flex-col h-full w-full px-6 py-8 overflow-y-auto">
      {/* Header with back button (44x44 touch target) */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white text-lg border-none cursor-pointer mr-3"
          aria-label="Go back to home"
        >
          ←
        </button>
        <h1 className="text-2xl font-bold text-white">Profile</h1>
      </div>

      {/* Owner's First Name — required */}
      <div className="mb-5">
        <label className="block text-gray-400 text-sm mb-2" htmlFor="profile-first-name">
          Owner's First Name <span className="text-red-400">*</span>
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
          placeholder="you@example.com"
          className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white text-lg outline-none placeholder:text-gray-500 border ${borderClass(emailValid)}`}
          maxLength={60}
        />
        {showErrors && !emailValid && (
          <p className="text-red-400 text-sm mt-1">Email is required</p>
        )}
      </div>

      {/* Phone Number — required */}
      <div className="mb-5">
        <label className="block text-gray-400 text-sm mb-2" htmlFor="profile-phone">
          Phone Number <span className="text-red-400">*</span>
        </label>
        <input
          id="profile-phone"
          type="tel"
          value={profile.phone}
          onChange={handleChange('phone')}
          placeholder="(555) 123-4567"
          className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white text-lg outline-none placeholder:text-gray-500 border ${borderClass(phoneValid)}`}
          maxLength={20}
        />
        {showErrors && !phoneValid && (
          <p className="text-red-400 text-sm mt-1">Phone number is required</p>
        )}
      </div>

      {/* Dog's Name — optional */}
      <div className="mb-6">
        <label className="block text-gray-400 text-sm mb-2" htmlFor="profile-dog-name">
          Dog's Name <span className="text-gray-500">(optional)</span>
        </label>
        <input
          id="profile-dog-name"
          type="text"
          value={profile.dogName}
          onChange={handleChange('dogName')}
          placeholder="Your dog's name"
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

      {/* Save button — disabled until required fields are filled */}
      <button
        onClick={handleSave}
        disabled={!formValid}
        className={`mt-auto py-4 rounded-xl font-bold text-lg border-none transition-colors ${
          formValid
            ? 'bg-white text-[#1a1a2e] cursor-pointer'
            : 'bg-white/20 text-gray-500 cursor-not-allowed'
        }`}
      >
        {saved ? 'Saved!' : 'Save Profile'}
      </button>
    </div>
  )
}
