import { useState, useEffect, useRef, useCallback } from 'react'
import type { Signal } from '../data/signals'

// SignalScreen — full-screen signal with blinking mode
// Flow: enter → blinks (screen + torch) → tap to lock solid → tap again to go home
// Camera flash/LED blinks in sync when available

interface SignalScreenProps {
  signal: Signal
  onBack: () => void
}

export default function SignalScreen({ signal, onBack }: SignalScreenProps) {
  // 'blinking' = screen + torch flash on/off every 1s, 'solid' = locked color
  const [mode, setMode] = useState<'blinking' | 'solid'>('blinking')
  // Whether the signal color is showing (true) or dark (false) during blink
  const [colorOn, setColorOn] = useState(true)

  const streamRef = useRef<MediaStream | null>(null)
  const intervalRef = useRef<number | null>(null)

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
      // Torch not supported or failed — screen still blinks without it
    }
  }, [])

  // Request camera access for torch control on mount
  useEffect(() => {
    let cancelled = false

    async function initTorch() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        })
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }
        streamRef.current = stream
      } catch {
        // Permission denied or no camera — blinking still works without torch
      }
    }

    initTorch()

    // Clean up camera stream on unmount
    return () => {
      cancelled = true
      streamRef.current?.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
  }, [])

  // Blink loop — toggles color and torch every 1 second
  useEffect(() => {
    if (mode !== 'blinking') {
      // Solid mode — lock color on, torch off
      setColorOn(true)
      setTorch(false)
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    // Start blinking: color on, then toggle every 1s
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
  }, [mode, setTorch])

  // Tap handler — first tap locks solid, second tap goes home
  function handleTap() {
    if (mode === 'blinking') {
      setMode('solid')
    } else {
      onBack()
    }
  }

  // During blink-off, show black; otherwise show signal color
  const bgColor = mode === 'blinking' && !colorOn ? '#000000' : signal.hex
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
      aria-label={`${signal.label} signal. Tap to ${mode === 'blinking' ? 'lock color' : 'go back'}.`}
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

      {/* Signal label + guidance — hidden during blink-off for instant transition */}
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
          {mode === 'blinking' ? 'Tap to lock color' : 'Tap to go back'}
        </p>
      )}
    </div>
  )
}
