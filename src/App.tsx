import { useState, useCallback } from 'react'
import HomeScreen from './components/HomeScreen'
import SignalScreen from './components/SignalScreen'
import ProfileScreen from './components/ProfileScreen'
import AboutScreen from './components/AboutScreen'
import ShareScreen from './components/ShareScreen'
import SetupScreen from './components/SetupScreen'
import type { Signal } from './data/signals'
import { loadProfile, hasProfile } from './data/profile'

// App — manages navigation between screens
// First-time users must complete setup before accessing the app

type Screen = 'setup' | 'home' | 'signal' | 'profile' | 'about' | 'share'

function App() {
  // If no valid profile exists, force the setup screen
  const [screen, setScreen] = useState<Screen>(() =>
    hasProfile() ? 'home' : 'setup'
  )
  const [activeSignal, setActiveSignal] = useState<Signal | null>(null)
  // Load dog name for the home screen greeting
  const [dogName, setDogName] = useState(() => loadProfile().dogName)

  // Setup complete — save happened in SetupScreen, now go to home
  const handleSetupComplete = useCallback(() => {
    setDogName(loadProfile().dogName)
    setScreen('home')
  }, [])

  // User tapped a signal button — show the full-screen color
  const handleSelectSignal = useCallback((signal: Signal) => {
    setActiveSignal(signal)
    setScreen('signal')
  }, [])

  // User tapped the signal screen — go back to home
  const handleBackFromSignal = useCallback(() => {
    setActiveSignal(null)
    setScreen('home')
  }, [])

  // User opened profile screen
  const handleOpenProfile = useCallback(() => {
    setScreen('profile')
  }, [])

  // User left profile screen — reload the dog name in case it changed
  const handleBackFromProfile = useCallback(() => {
    setDogName(loadProfile().dogName)
    setScreen('home')
  }, [])

  // User opened about / color guide screen
  const handleOpenAbout = useCallback(() => {
    setScreen('about')
  }, [])

  // User left about screen
  const handleBackFromAbout = useCallback(() => {
    setScreen('home')
  }, [])

  // User opened share screen
  const handleOpenShare = useCallback(() => {
    setScreen('share')
  }, [])

  // User left share screen
  const handleBackFromShare = useCallback(() => {
    setScreen('home')
  }, [])

  return (
    <div className="h-full w-full">
      {screen === 'setup' ? (
        <SetupScreen onComplete={handleSetupComplete} />
      ) : screen === 'signal' && activeSignal ? (
        <SignalScreen signal={activeSignal} onBack={handleBackFromSignal} />
      ) : screen === 'profile' ? (
        <ProfileScreen onBack={handleBackFromProfile} />
      ) : screen === 'about' ? (
        <AboutScreen onBack={handleBackFromAbout} />
      ) : screen === 'share' ? (
        <ShareScreen onBack={handleBackFromShare} />
      ) : (
        <HomeScreen
          onSelectSignal={handleSelectSignal}
          onOpenProfile={handleOpenProfile}
          onOpenAbout={handleOpenAbout}
          onOpenShare={handleOpenShare}
          dogName={dogName}
        />
      )}
    </div>
  )
}

export default App
