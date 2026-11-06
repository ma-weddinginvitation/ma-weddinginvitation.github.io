import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

// Fixed values, so the arrangement stays the same on every visit and render.
const PETALS = [
  { left: 6, size: 15, duration: 19, delay: 0, sway: 34, spin: 210 },
  { left: 19, size: 11, duration: 24, delay: 6, sway: -26, spin: -160 },
  { left: 33, size: 13, duration: 21, delay: 12, sway: 22, spin: 180 },
  { left: 52, size: 10, duration: 26, delay: 3, sway: -36, spin: 240 },
  { left: 68, size: 14, duration: 20, delay: 9, sway: 30, spin: -200 },
  { left: 81, size: 11, duration: 25, delay: 15, sway: -22, spin: 170 },
  { left: 93, size: 13, duration: 22, delay: 5, sway: 18, spin: -230 },
]

/** A few gold petals drifting down. They only animate while their section is on screen. */
export default function FloatingPetals({ color = '#e0c172', opacity = 0.55 }) {
  const ref = useRef(null)
  const inView = useInView(ref)
  const reduced = useReducedMotion()

  return (
    <div ref={ref} className="petals" aria-hidden="true">
      {inView &&
        !reduced &&
        PETALS.map((p) => (
          <motion.svg
            key={p.left}
            className="petal"
            viewBox="0 0 20 24"
            width={p.size}
            height={p.size * 1.2}
            style={{ left: `${p.left}%` }}
            initial={{ y: '-6vh', x: 0, rotate: 0, opacity: 0 }}
            animate={{
              y: ['-6vh', '112vh'],
              x: [0, p.sway, -p.sway * 0.6, p.sway * 0.4],
              rotate: [0, p.spin],
              opacity: [0, opacity, opacity, 0],
            }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
          >
            <path d="M10 1C17 6 19 15 10 23C1 15 3 6 10 1Z" fill={color} />
          </motion.svg>
        ))}
    </div>
  )
}
