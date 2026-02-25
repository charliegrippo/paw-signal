import { useState, useCallback, useEffect } from 'react'
import HomeScreen from './components/HomeScreen'
import SignalScreen from './components/SignalScreen'
import ProfileScreen from './components/ProfileScreen'
import AboutScreen from './components/AboutScreen'
import ShareScreen from './components/ShareScreen'
import SetupScreen from './components/SetupScreen'
import StoryScreen from './components/StoryScreen'
import { signals, type Signal } from './data/signals'
import { loadProfile, hasProfile } from './data/profile'
import { trackPageView, trackEvent } from './utils/analytics'

// App — manages navigation between screens
// First-time users see: StoryScreen → SetupScreen → HomeScreen
// Returning users go straight to HomeScreen

type Screen = 'story' | 'setup' | 'home' | 'signal' | 'profile' | 'about' | 'share'

function App() {
  const profileExists = hasProfile()
  // New users start at story screen, returning users go straight to home
  const [screen, setScreen] = useState<Screen>(() =>
    profileExists ? 'home' : 'story'
  )
  const [activeSignal, setActiveSignal] = useState<Signal | null>(null)
  // Load dog name for the home screen greeting
  const [dogName, setDogName] = useState(() => loadProfile().dogName)

  // Track virtual pageviews when screen changes
  useEffect(() => {
    const pageName = screen === 'signal' && activeSignal
      ? `signal/${activeSignal.id}`
      : screen
    trackPageView(pageName)
  }, [screen, activeSignal])

  // Story screen Continue → proceed to setup
  const handleStoryContinue = useCallback(() => {
    setScreen('setup')
  }, [])

  // Setup complete — save happened in SetupScreen, now go to home
  const handleSetupComplete = useCallback(() => {
    setDogName(loadProfile().dogName)
    setScreen('home')
  }, [])

  // User tapped a signal button — show the full-screen color
  const handleSelectSignal = useCallback((signal: Signal) => {
    trackEvent('signal_selected', { signal_color: signal.id, signal_label: signal.label })
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

  // User saved profile and wants to go straight to their signal
  const handleSaveAndGoToSignal = useCallback((signalId: string) => {
    setDogName(loadProfile().dogName)
    const signal = signals.find((s) => s.id === signalId) || signals[0]
    trackEvent('signal_selected', { signal_color: signal.id, signal_label: signal.label })
    setActiveSignal(signal)
    setScreen('signal')
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
      {screen === 'story' ? (
        <StoryScreen onContinue={handleStoryContinue} />
      ) : screen === 'setup' ? (
        <SetupScreen onComplete={handleSetupComplete} />
      ) : screen === 'signal' && activeSignal ? (
        <SignalScreen signal={activeSignal} onBack={handleBackFromSignal} />
      ) : screen === 'profile' ? (
        <ProfileScreen onBack={handleBackFromProfile} onSaveAndGoToSignal={handleSaveAndGoToSignal} />
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
