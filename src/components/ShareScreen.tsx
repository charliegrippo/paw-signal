import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { trackEvent } from '../utils/analytics'

// ShareScreen — lets the user share the app via native Web Share API (Application Programming Interface)
// Falls back to a copyable link and QR code when Web Share is not available

interface ShareScreenProps {
  onBack: () => void
}

// The URL to share — points to the CanWeSayHello domain
function getShareUrl(): string {
  return 'https://canwesayhello.com'
}

const SHARE_TEXT =
  'Check out CanWeSayHello — a quick way to show your dog\'s temperament to other walkers!'

export default function ShareScreen({ onBack }: ShareScreenProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = getShareUrl()

  // Check if the browser supports the native Web Share API (Application Programming Interface)
  const canNativeShare = typeof navigator.share === 'function'

  // Trigger native share dialog (mobile browsers)
  async function handleNativeShare() {
    try {
      await navigator.share({
        title: 'CanWeSayHello',
        text: SHARE_TEXT,
        url: shareUrl,
      })
      trackEvent('share_triggered', { method: 'native_share' })
    } catch {
      // User cancelled or share failed — no action needed
    }
  }

  // Copy the link to clipboard as a fallback
  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl)
      trackEvent('share_triggered', { method: 'copy_link' })
      setCopied(true)
      // Reset "Copied!" label after 2 seconds
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API (Application Programming Interface) not available — select the text instead
      const input = document.getElementById('share-url-input') as HTMLInputElement | null
      if (input) {
        input.select()
      }
    }
  }

  return (
    <div className="flex flex-col h-full w-full px-6 py-8">
      {/* Header with back button (44x44 touch target) */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white text-lg border-none cursor-pointer mr-3"
          aria-label="Go back to home"
        >
          ←
        </button>
        <h1 className="text-2xl font-bold text-white">Share CanWeSayHello</h1>
      </div>

      <p className="text-gray-400 text-sm mb-8">
        Spread the word! Share CanWeSayHello with other dog owners so they can
        signal their dog's temperament too.
      </p>

      {/* Native share button — only shown when the browser supports it */}
      {canNativeShare && (
        <button
          onClick={handleNativeShare}
          className="w-full py-4 rounded-xl font-bold text-lg cursor-pointer border-none bg-white text-[#1a1a2e] mb-4 active:scale-[0.98] transition-transform"
        >
          Share via…
        </button>
      )}

      {/* Copyable link — always shown as fallback */}
      <div className="mb-6">
        <label
          className="block text-gray-400 text-sm mb-2"
          htmlFor="share-url-input"
        >
          Or copy this link:
        </label>
        <div className="flex gap-2">
          <input
            id="share-url-input"
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white text-sm border border-white/20 outline-none"
          />
          <button
            onClick={handleCopyLink}
            className="px-4 py-3 rounded-xl font-semibold text-sm cursor-pointer border-none bg-white/20 text-white active:scale-[0.98] transition-transform whitespace-nowrap"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* QR code — scan to open the app */}
      <div className="flex flex-col items-center">
        <p className="text-gray-400 text-sm mb-4">Or scan this QR code:</p>
        <div className="bg-white p-4 rounded-2xl">
          <QRCodeSVG
            value={shareUrl}
            size={180}
            level="M"
            fgColor="#1a1a2e"
            bgColor="#ffffff"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="w-full my-6" style={{ height: 1, backgroundColor: '#2a2a2a' }} />

      {/* Give Us Feedback */}
      <div className="flex flex-col items-center">
        <p className="text-gray-400 text-sm mb-3">Have thoughts or suggestions?</p>
        <a
          href="mailto:charleygrippo@gmail.com?subject=CanWeSayHello%20Feedback"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/10 text-white font-bold text-base no-underline active:scale-[0.98] transition-transform"
        >
          <span>✉</span> Give Us Feedback
        </a>
      </div>
    </div>
  )
}
