import { useState, useCallback } from 'react'
import HomeScreen from './components/HomeScreen'
import SignalScreen from './components/SignalScreen'
import ProfileScreen from './components/ProfileScreen'
import AboutScreen from './components/AboutScreen'
import ShareScreen from './components/ShareScreen'
import type { Signal } from './data/signals'
import { loadProfile } from './data/profile'

// App — manages navigation between home, signal, and profile screens
// Uses simple state-based routing (no router library needed)

type Screen = 'home' | 'signal' | 'profile' | 'about' | 'share'

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [activeSignal, setActiveSignal] = useState<Signal | null>(null)
  // Load dog name for the home screen greeting
  const [dogName, setDogName] = useState(() => loadProfile().dogName)

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
      {screen === 'signal' && activeSignal ? (
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
