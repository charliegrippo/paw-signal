import { useState, useEffect, useRef, useCallback } from 'react'
import type { Signal } from '../data/signals'
import { getSignalIcon } from './SignalIcons'
import { trackEvent } from '../utils/analytics'

// SignalScreen — full-screen signal display with tap-to-cycle controls
// Tap cycle: solid → pulse (screen flashes + torch) → solid → home
// Back arrow in top-left always returns to home.

interface SignalScreenProps {
  signal: Signal
  onBack: () => void
}

export default function SignalScreen({ signal, onBack }: SignalScreenProps) {
  // Three-state tap cycle: solid-initial → flash → solid-done (next tap goes home)
  const [mode, setMode] = useState<'solid-initial' | 'flash' | 'solid-done'>('solid-initial')
  // Whether the signal color is showing (true) or faded to black (false) during flash
  const [colorOn, setColorOn] = useState(true)

  const streamRef = useRef<MediaStream | null>(null)
  const intervalRef = useRef<number | null>(null)
  // Track whether we've already requested camera access
  const torchInitialized = useRef(false)

  // Toggle the camera torch on or off (fire-and-forget)
  const setTorch = useCallback(async (on: boolean) => {
    const stream = streamRef.current
    if (!stream) return
    const track = stream.getVideoTracks()[0]
    if (!track) return
    try {
      await track.applyConstraints({
        advanced: [{ torch: on } as MediaTrackConstraintSet],
      })
    } catch {
      // Torch not supported or failed — screen still flashes without it
    }
  }, [])

  // Request camera access for torch (called once on first flash activation)
  const initTorch = useCallback(async () => {
    if (torchInitialized.current) return
    torchInitialized.current = true
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })
      streamRef.current = stream
    } catch {
      // Permission denied or no camera — flash still works without torch
    }
  }, [])

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
  }, [])

  // Flash loop — toggles color and torch every 500ms when in flash mode
  useEffect(() => {
    if (mode !== 'flash') {
      // Solid mode — lock color on, torch off
      setColorOn(true)
      setTorch(false)
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    // Entering flash mode — init torch if not already done, then start flashing
    initTorch()
    let on = true
    setColorOn(true)
    setTorch(true)

    intervalRef.current = window.setInterval(() => {
      on = !on
      setColorOn(on)
      setTorch(on)
    }, 500)

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [mode, setTorch, initTorch])

  // Tap anywhere on screen cycles through: solid-initial → flash → solid-done → home
  function handleScreenTap() {
    if (mode === 'solid-initial') {
      trackEvent('flash_activated', { signal_color: signal.id })
      setMode('flash')
    } else if (mode === 'flash') {
      setMode('solid-done')
    } else {
      onBack()
    }
  }

  // During flash-off, show black; otherwise show signal color
  const bgColor = mode === 'flash' && !colorOn ? '#000000' : signal.hex
  const textVisible = mode !== 'flash' || colorOn

  return (
    <div
      className="relative flex flex-col items-center justify-center h-full w-full px-8"
      style={{ backgroundColor: bgColor }}
      onClick={handleScreenTap}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleScreenTap()
      }}
      aria-label={`${signal.label} signal. ${mode === 'solid-initial' ? 'Tap to pulse.' : mode === 'flash' ? 'Tap to stop pulse.' : 'Tap to go home.'}`}
    >
      {/* Back button — top-left, chevron left in dark circle */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onBack()
        }}
        className="absolute left-6 w-11 h-11 flex items-center justify-center rounded-full bg-black/30 border-none cursor-pointer"
        style={{ top: 52 }}
        aria-label="Go back to home"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Signal icon + label + guidance — hidden during flash-off for instant transition */}
      {textVisible && (
        <>
          {/* Large signal icon */}
          {(() => {
            const IconComponent = getSignalIcon(signal.id)
            return <IconComponent size={160} color={signal.textColor} className="mb-6" />
          })()}

          <h1
            className="text-5xl sm:text-6xl font-black text-center leading-tight mb-6"
            style={{ color: signal.textColor }}
          >
            {signal.label}
          </h1>

          <p
            className="text-xl sm:text-2xl text-center font-medium opacity-90 max-w-sm"
            style={{ color: signal.textColor }}
          >
            {signal.guidance}
          </p>
        </>
      )}

      {/* Hint text at bottom — tells user what next tap does */}
      {textVisible && (
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 text-center">
          <p
            className="text-sm font-medium opacity-70"
            style={{ color: signal.textColor }}
          >
            {mode === 'solid-initial'
              ? 'Tap anywhere to pulse'
              : mode === 'flash'
              ? 'Tap anywhere to stop pulse'
              : 'Tap anywhere to go home'}
          </p>
        </div>
      )}
    </div>
  )
}
