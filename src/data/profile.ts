// Dog profile — stores the dog's name and default signal color
// Data persists in localStorage so it survives page reloads and app restarts

const STORAGE_KEY = 'paw-signal-profile'

export interface DogProfile {
  dogName: string
  defaultSignalId: string // matches Signal.id (green, yellow, blue, red)
}

// Default empty profile for first-time users
const emptyProfile: DogProfile = {
  dogName: '',
  defaultSignalId: 'green',
}

// Load profile from localStorage, returning empty profile if nothing saved
export function loadProfile(): DogProfile {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored) as DogProfile
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
