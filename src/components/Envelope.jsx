import { useState } from 'react'
import { motion, useAnimate, useReducedMotion } from 'framer-motion'
import { MailOpen } from 'lucide-react'
import { BRIDE, DATE_LONG, GROOM, SHORT_NAMES } from '../data/wedding'
import { Divider, SealArt } from './Ornaments'
import './Envelope.css'

const SILK = [0.22, 0.8, 0.24, 1]
const BIT_COUNT = 9

/**
 * The opening scene. The whole sequence is choreographed here:
 * seal breaks, flap lifts, card rises, envelope falls away, card fills the screen,
 * and that ivory card dissolves into the ivory Welcome section beneath it.
 */
export default function Envelope({ onOpenStart, onReveal, onDone }) {
  const [scope, animate] = useAnimate()
  const [opening, setOpening] = useState(false)
  const reduced = useReducedMotion()

  async function open() {
    if (opening) return
    setOpening(true)
    onOpenStart() // must run inside the click so browsers allow the music to start

    const root = scope.current

    if (reduced) {
      onReveal()
      await animate(root, { opacity: 0 }, { duration: 0.4 })
      onDone()
      return
    }

    const env = root.querySelector('.env')
    const flap = root.querySelector('.env__flap')
    const card = root.querySelector('.env__card')
    const viewportH = window.innerHeight
    const viewportW = window.innerWidth

    animate('.env-screen__intro', { opacity: 0, y: -18 }, { duration: 0.5 })
    animate('.env-screen__action', { opacity: 0, y: 18 }, { duration: 0.4 })

    // Settle the envelope lower down, leaving headroom for the lifted flap and card.
    const rect = env.getBoundingClientRect()
    const settle = viewportH * 0.64 - (rect.top + rect.height / 2)
    animate('.env-float', { y: settle }, { duration: 1.1, ease: SILK })

    // 1. The seal cracks. Two halves part and fall as small flakes scatter.
    await animate('.seal__whole', { scale: 0.96 }, { duration: 0.16, ease: 'easeIn' })
    animate('.seal__whole', { opacity: 0 }, { duration: 0.01 })
    animate('.seal__half', { opacity: 1 }, { duration: 0.01 })
    root.querySelectorAll('.seal__bit').forEach((bit, i) => {
      const angle = (i / BIT_COUNT) * Math.PI * 2 + 0.3
      const reach = 34 + (i % 3) * 16
      animate(
        bit,
        {
          x: Math.cos(angle) * reach,
          y: [0, Math.sin(angle) * reach, Math.sin(angle) * reach + 90],
          rotate: 160 * (i % 2 ? 1 : -1),
          opacity: [1, 1, 0],
        },
        { duration: 0.95, ease: 'easeOut' },
      )
    })
    animate('.seal__half--l', { x: '-26%', y: '60%', rotate: -24, opacity: 0 }, { duration: 0.85, ease: [0.45, 0, 0.8, 0.5] })
    await animate('.seal__half--r', { x: '26%', y: '72%', rotate: 28, opacity: 0 }, { duration: 0.85, ease: [0.45, 0, 0.8, 0.5] })

    // 2. The flap lifts. Once it passes vertical it drops behind the card.
    animate('.env__flap-shadow', { opacity: 0 }, { duration: 0.5 })
    await animate(flap, { rotateX: 90 }, { duration: 0.55, ease: 'easeIn' })
    flap.style.zIndex = 2
    await animate(flap, { rotateX: 180 }, { duration: 0.65, ease: 'easeOut' })

    // 3. The card rises out of its pocket.
    const rise = -env.offsetHeight * 0.66
    await animate(card, { y: rise }, { duration: 1.25, ease: [0.4, 0, 0.2, 1] })

    // 4. The envelope falls away while the card comes forward.
    card.style.zIndex = 20
    animate('.env__drop', { y: viewportH, opacity: 0 }, { duration: 0.95, ease: [0.5, 0, 0.85, 0.4] })

    const cardRect = card.getBoundingClientRect()
    const toCentre = viewportH / 2 - (cardRect.top + cardRect.height / 2)
    await animate(card, { y: rise + toCentre, scale: 1.12 }, { duration: 0.9, ease: SILK })

    // 5. The card fills the screen, and its ivory hands over to the Welcome section.
    animate('.env__card-content', { opacity: 0 }, { duration: 0.45 })
    const cover = 1.2 * Math.max(viewportW / card.offsetWidth, viewportH / card.offsetHeight)
    await animate(card, { scale: cover }, { duration: 0.95, ease: [0.6, 0, 0.3, 1] })
    onReveal()
    await animate(root, { opacity: 0 }, { duration: 0.7, ease: 'easeInOut' })
    onDone()
  }

  return (
    <motion.div
      ref={scope}
      className={`env-screen surface-velvet ${opening ? 'is-opening' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.header
        className="env-screen__intro"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.25, ease: SILK }}
      >
        <p className="env-screen__invited">You Are Cordially Invited</p>
        <h2 className="env-screen__names foil foil--shimmer">{SHORT_NAMES}</h2>
      </motion.header>

      <motion.div
        className="env-float"
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, delay: 0.1, ease: SILK }}
      >
        <div className="env" onClick={open} aria-hidden="true">
          <div className="env__back env__drop" />

          <motion.div className="env__flap" style={{ rotateX: 0, originY: 0 }}>
            <div className="env__flap-face env__flap-face--front">
              <svg viewBox="0 0 146 60" preserveAspectRatio="none">
                <path d="M2.6 1.8H143.4L74.6 55.2Q73 56.4 71.4 55.2Z" fill="none" stroke="#d0a94f" strokeWidth=".32" />
                <path d="M6.6 3.2H139.4L74.2 53.4Q73 54.2 71.8 53.4Z" fill="none" stroke="#d0a94f" strokeOpacity=".5" strokeWidth=".16" />
              </svg>
            </div>
            <div className="env__flap-face env__flap-face--back" />
          </motion.div>

          <div className="env__card">
            <div className="env__card-content">
              <span className="env__card-frame" />
              <p className="env__card-eyebrow">A Family Wedding Invitation</p>
              <p className="env__card-name">{GROOM}</p>
              <p className="env__card-with">with</p>
              <p className="env__card-name">{BRIDE}</p>
              <Divider />
              <p className="env__card-date">{DATE_LONG}</p>
            </div>
          </div>

          <div className="env__pocket env__drop">
            <span className="env__panel env__panel--left" />
            <span className="env__panel env__panel--right" />
            <span className="env__panel env__panel--bottom" />
            <svg viewBox="0 0 146 100" preserveAspectRatio="none">
              <path d="M0 0L66 50M146 0L80 50M0 100L68 49Q73 45.5 78 49L146 100" fill="none" stroke="#d0a94f" strokeOpacity=".62" strokeWidth=".26" />
              <path d="M18 96.6L69.4 58Q73 55.4 76.6 58L128 96.6" fill="none" stroke="#d0a94f" strokeOpacity=".32" strokeWidth=".16" />
            </svg>
          </div>

          <span className="env__flap-shadow" />

          <div className="seal">
            <span className="seal__glow" />
            <motion.div className="seal__whole">
              <SealArt />
            </motion.div>
            <motion.div className="seal__half seal__half--l" style={{ opacity: 0 }}>
              <SealArt />
            </motion.div>
            <motion.div className="seal__half seal__half--r" style={{ opacity: 0 }}>
              <SealArt />
            </motion.div>
            {Array.from({ length: BIT_COUNT }, (_, i) => (
              <motion.span key={i} className="seal__bit" style={{ opacity: 0 }} />
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="env-screen__action"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.7, ease: SILK }}
      >
        <button type="button" className="gold-button" onClick={open} disabled={opening}>
          <MailOpen size={19} strokeWidth={1.6} aria-hidden="true" />
          OPEN YOUR INVITATION
        </button>
      </motion.div>
    </motion.div>
  )
}
