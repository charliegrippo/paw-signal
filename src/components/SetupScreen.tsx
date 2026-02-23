import { useState } from 'react'
import { saveProfile, type DogProfile } from '../data/profile'
import { trackEvent } from '../utils/analytics'

// SetupScreen — first-time onboarding with mission statement and signup form
// Collects owner info + optional dog name, submits to Google Form, then proceeds to app

// Google Form entry IDs for programmatic submission
const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSezAI21JHG479qSRN5fD5jKz07QdKBETKEnd-i6aN3NU_euLw/formResponse'
const ENTRY_FIRST_NAME = 'entry.2093214915'
const ENTRY_EMAIL = 'entry.1981128212'
const ENTRY_PHONE = 'entry.1064489433'
const ENTRY_DOG_NAME = 'entry.2122008188'

interface SetupScreenProps {
  onComplete: () => void
}

export default function SetupScreen({ onComplete }: SetupScreenProps) {
  const [profile, setProfile] = useState<DogProfile>({
    ownerFirstName: '',
    email: '',
    phone: '',
    dogName: '',
    defaultSignalId: 'green',
  })
  // Track whether user has tried to submit with missing required fields
  const [showErrors, setShowErrors] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const firstNameValid = profile.ownerFirstName.trim().length > 0
  const emailValid = profile.email.trim().length > 0
  const phoneValid = profile.phone.trim().length > 0
  const formValid = firstNameValid && emailValid && phoneValid

  function handleChange(field: keyof DogProfile) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setShowErrors(false)
      setProfile((prev) => ({ ...prev, [field]: e.target.value }))
    }
  }

  // Skip signup — save a minimal guest profile so the app works fully
  function handleSkip() {
    trackEvent('setup_skipped')
    const guestProfile: DogProfile = {
      ownerFirstName: 'Guest',
      email: 'skip',
      phone: 'skip',
      dogName: '',
      defaultSignalId: 'green',
    }
    saveProfile(guestProfile)
    onComplete()
  }

  async function handleContinue() {
    if (!formValid) {
      setShowErrors(true)
      return
    }

    setSubmitting(true)

    // Submit to Google Form in the background (fire-and-forget)
    // mode: 'no-cors' because Google Forms doesn't allow CORS, but the data still goes through
    const formData = new URLSearchParams()
    formData.append(ENTRY_FIRST_NAME, profile.ownerFirstName.trim())
    formData.append(ENTRY_EMAIL, profile.email.trim())
    formData.append(ENTRY_PHONE, profile.phone.trim())
    if (profile.dogName.trim()) {
      formData.append(ENTRY_DOG_NAME, profile.dogName.trim())
    }

    try {
      fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      })
    } catch {
      // Submission failed — don't block the user, profile is saved locally
    }

    // Save profile locally and proceed regardless of form submission result
    saveProfile(profile)
    trackEvent('setup_completed')
    onComplete()
  }

  // Helper to get input border class based on validation state
  function borderClass(isValid: boolean): string {
    return showErrors && !isValid
      ? 'border-red-500'
      : 'border-white/20 focus:border-white/50'
  }

  return (
    <div className="flex flex-col h-full w-full px-6 py-8 overflow-y-auto">
      {/* Welcome header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Welcome to CanWeSayHello
        </h1>
      </div>

      {/* Mission statement */}
      <p className="text-gray-400 text-sm italic leading-relaxed mb-8">
        CanWeSayHello was born from loss. The creator of this app lost his dog to a
        sudden dog-on-dog attack — no warning signs, no way to know. No one
        should ever experience that. This app exists so every walker can see
        what's coming and every dog gets the space they need. One color. One
        signal. A safer walk for everyone.
      </p>

      {/* Owner's First Name — required */}
      <div className="mb-5">
        <label className="block text-gray-400 text-sm mb-2" htmlFor="setup-first-name">
          Owner's First Name <span className="text-red-400">*</span>
        </label>
        <input
          id="setup-first-name"
          type="text"
          value={profile.ownerFirstName}
          onChange={handleChange('ownerFirstName')}
          placeholder="Your first name"
          className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white text-lg outline-none placeholder:text-gray-500 border ${borderClass(firstNameValid)}`}
          maxLength={30}
          autoFocus
        />
        {showErrors && !firstNameValid && (
          <p className="text-red-400 text-sm mt-1">First name is required</p>
        )}
      </div>

      {/* Email Address — required */}
      <div className="mb-5">
        <label className="block text-gray-400 text-sm mb-2" htmlFor="setup-email">
          Email Address <span className="text-red-400">*</span>
        </label>
        <input
          id="setup-email"
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
        <label className="block text-gray-400 text-sm mb-2" htmlFor="setup-phone">
          Phone Number <span className="text-red-400">*</span>
        </label>
        <input
          id="setup-phone"
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
      <div className="mb-8">
        <label className="block text-gray-400 text-sm mb-2" htmlFor="setup-dog-name">
          Dog's Name <span className="text-gray-500">(optional)</span>
        </label>
        <input
          id="setup-dog-name"
          type="text"
          value={profile.dogName}
          onChange={handleChange('dogName')}
          placeholder="Your dog's name"
          className="w-full px-4 py-3 rounded-xl bg-white/10 text-white text-lg border border-white/20 outline-none focus:border-white/50 placeholder:text-gray-500"
          maxLength={30}
        />
      </div>

      {/* Continue button — disabled until required fields are filled */}
      <button
        onClick={handleContinue}
        disabled={!formValid || submitting}
        className={`mt-auto py-4 rounded-xl font-bold text-lg border-none transition-colors ${
          formValid && !submitting
            ? 'bg-white text-[#1a1a2e] cursor-pointer'
            : 'bg-white/20 text-gray-500 cursor-not-allowed'
        }`}
      >
        {submitting ? 'Saving…' : 'Continue'}
      </button>

      {/* Skip link — lets users try the app without signing up */}
      <button
        onClick={handleSkip}
        className="mt-3 mb-2 text-gray-500 text-sm bg-transparent border-none cursor-pointer underline"
      >
        Skip for now — try it first
      </button>
    </div>
  )
}
