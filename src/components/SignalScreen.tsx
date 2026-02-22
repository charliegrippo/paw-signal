import { useState, useEffect, useRef, useCallback } from 'react'
import type { Signal } from '../data/signals'

// SignalScreen — full-screen signal display
// Defaults to solid color. Tap toggles pulse mode (screen pulses + camera flash ON).
// Tap again returns to solid (flash OFF). ✕ button always goes home.

interface SignalScreenProps {
  signal: Signal
  onBack: () => void
}

export default function SignalScreen({ signal, onBack }: SignalScreenProps) {
  // 'solid' = steady color, 'pulse' = screen pulses + torch on
  const [mode, setMode] = useState<'solid' | 'pulse'>('solid')
  // Whether the signal color is showing (true) or dark (false) during pulse
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
      // Torch not supported or failed — screen still pulses without it
    }
  }, [])

  // Request camera access for torch (called once on first pulse activation)
  const initTorch = useCallback(async () => {
    if (torchInitialized.current) return
    torchInitialized.current = true
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })
      streamRef.current = stream
    } catch {
      // Permission denied or no camera — pulse still works without torch
    }
  }, [])

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
  }, [])

  // Pulse loop — toggles color and torch every 1 second
  useEffect(() => {
    if (mode !== 'pulse') {
      // Solid mode — lock color on, torch off
      setColorOn(true)
      setTorch(false)
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    // Entering pulse mode — init torch if not already done, then start pulsing
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

  // Tap handler — toggle between solid and pulse
  function handleTap() {
    setMode((prev) => (prev === 'solid' ? 'pulse' : 'solid'))
  }

  // During pulse-off, show black; otherwise show signal color
  const bgColor = mode === 'pulse' && !colorOn ? '#000000' : signal.hex
  const textVisible = mode === 'solid' || colorOn

  return (
    <div
      className="relative flex flex-col items-center justify-center h-full w-full cursor-pointer px-8"
      style={{ backgroundColor: bgColor }}
      onClick={handleTap}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleTap()
      }}
      aria-label={`${signal.label} signal. Tap to ${mode === 'solid' ? 'start pulse' : 'stop pulse'}.`}
    >
      {/* Close button — always visible, goes straight home */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onBack()
        }}
        className="absolute top-6 left-6 w-11 h-11 flex items-center justify-center rounded-full bg-black/30 text-white text-xl border-none cursor-pointer"
        aria-label="Go back to home"
      >
        ✕
      </button>

      {/* Signal label + guidance — hidden during pulse-off for instant transition */}
      {textVisible && (
        <>
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

      {/* Hint text at bottom */}
      {textVisible && (
        <p
          className="absolute bottom-8 text-sm opacity-50"
          style={{ color: signal.textColor }}
        >
          {mode === 'solid' ? 'Tap to pulse' : 'Tap to stop pulse'}
        </p>
      )}
    </div>
  )
}
