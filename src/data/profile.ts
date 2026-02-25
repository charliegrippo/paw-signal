// Dog profile — stores the dog's name and default signal color
// Data persists in localStorage so it survives page reloads and app restarts

const STORAGE_KEY = 'canwesayhello-profile'

export interface DogProfile {
  ownerFirstName: string
  email: string
  phone: string
  dogName: string // optional — can be empty
  defaultSignalId: string // matches Signal.id (green, yellow, blue, red)
}

// Default empty profile for first-time users
const emptyProfile: DogProfile = {
  ownerFirstName: '',
  email: '',
  phone: '',
  dogName: '',
  defaultSignalId: 'green',
}

// Load profile from localStorage, returning empty profile if nothing saved
export function loadProfile(): DogProfile {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      // Merge with defaults so old profiles missing new fields don't crash
      return { ...emptyProfile, ...JSON.parse(stored) }
    }
  } catch {
    // If localStorage is corrupted, start fresh
  }
  return { ...emptyProfile }
}

// Save profile to localStorage
export function saveProfile(profile: DogProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
}

// Check if a valid profile exists (owner first name, email, dog name are required)
export function hasProfile(): boolean {
  const profile = loadProfile()
  return (
    profile.ownerFirstName.trim().length > 0 &&
    profile.email.trim().length > 0 &&
    profile.dogName.trim().length > 0
  )
}
