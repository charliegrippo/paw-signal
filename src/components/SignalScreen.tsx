import { useState, useEffect, useRef, useCallback } from 'react'
import type { Signal } from '../data/signals'
import { getSignalIcon } from './SignalIcons'
import { trackEvent } from '../utils/analytics'

// SignalScreen — full-screen signal display with flash feature
// Defaults to solid (steady) mode. Flash can be triggered by:
//   1. Tapping the "Flash to Get Attention" button at the bottom
//   2. Shaking the phone (Device Motion API)
// Flash stops via: shake again, tap button, or tap anywhere on screen.
// Back arrow in top-left always returns to home.

// Shake detection threshold — acceleration magnitude above this triggers a shake
const SHAKE_THRESHOLD = 25
// Minimum time (ms) between shake triggers to prevent rapid toggling
const SHAKE_DEBOUNCE_MS = 800

interface SignalScreenProps {
  signal: Signal
  onBack: () => void
}

export default function SignalScreen({ signal, onBack }: SignalScreenProps) {
  // 'solid' = steady color, 'flash' = screen pulses opacity on/off
  const [mode, setMode] = useState<'solid' | 'flash'>('solid')
  // Whether the signal color is showing (true) or faded to black (false) during flash
  const [colorOn, setColorOn] = useState(true)

  const streamRef = useRef<MediaStream | null>(null)
  const intervalRef = useRef<number | null>(null)
  // Track whether we've already requested camera access
  const torchInitialized = useRef(false)
  // Debounce shake events
  const lastShakeTime = useRef(0)
  // Ref to current mode so the shake handler can read it without stale closure
  const modeRef = useRef(mode)
  modeRef.current = mode

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

  // Flash loop — toggles color and torch every 1 second
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
    }, 1000)

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [mode, setTorch, initTorch])

  // Shake detection via Device Motion API (Application Programming Interface)
  useEffect(() => {
    function handleMotion(event: DeviceMotionEvent) {
      const acc = event.accelerationIncludingGravity
      if (!acc) return
      const { x, y, z } = acc
      if (x === null || y === null || z === null) return

      // Calculate total acceleration magnitude
      const magnitude = Math.sqrt(x * x + y * y + z * z)

      if (magnitude > SHAKE_THRESHOLD) {
        const now = Date.now()
        if (now - lastShakeTime.current < SHAKE_DEBOUNCE_MS) return
        lastShakeTime.current = now
        // Toggle flash mode
        setMode((prev) => (prev === 'solid' ? 'flash' : 'solid'))
      }
    }

    window.addEventListener('devicemotion', handleMotion)
    return () => window.removeEventListener('devicemotion', handleMotion)
  }, [])

  // Start flash mode
  function startFlash() {
    trackEvent('flash_activated', { signal_color: signal.id })
    setMode('flash')
  }

  // Stop flash mode
  function stopFlash() {
    setMode('solid')
  }

  // Tap on the screen background — only stops flash (doesn't start it)
  function handleScreenTap() {
    if (mode === 'flash') {
      stopFlash()
    }
  }

  // During flash-off, show black; otherwise show signal color
  const bgColor = mode === 'flash' && !colorOn ? '#000000' : signal.hex
  const textVisible = mode === 'solid' || colorOn

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
      aria-label={`${signal.label} signal. ${mode === 'flash' ? 'Tap anywhere to stop flash.' : ''}`}
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

      {/* Flash button — full width at bottom of screen */}
      {textVisible && (
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
          {mode === 'solid' ? (
            <button
              onClick={(e) => {
                e.stopPropagation()
                startFlash()
              }}
              className="w-full py-4 rounded-xl font-bold text-lg border-none cursor-pointer active:scale-[0.98] transition-transform"
              style={{
                backgroundColor: 'rgba(0,0,0,0.35)',
                color: signal.textColor,
              }}
            >
              Flash to Get Attention
              <span
                className="block text-xs font-normal mt-1 opacity-70"
                style={{ color: signal.textColor }}
              >
                Shake phone or press this button
              </span>
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation()
                stopFlash()
              }}
              className="w-full py-4 rounded-xl font-bold text-lg border-none cursor-pointer active:scale-[0.98] transition-transform"
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: signal.textColor,
              }}
            >
              Tap to Stop
              <span
                className="block text-xs font-normal mt-1 opacity-70"
                style={{ color: signal.textColor }}
              >
                Shake phone or tap anywhere to stop
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
