import { motion } from 'framer-motion'
import { Blossom, FloralSpray, multifoilArch, pointedArch } from './Ornaments'
import Reveal from './Reveal'
import FloatingPetals from './FloatingPetals'
import './Couple.css'

// Drawn far taller than any stage. The stage shows the top portion and its columns
// simply run off the bottom of the section, so the arch suits any screen shape.
const W = 600
const H = 1500
const SPRING = 300

const OPENING = multifoilArch(52, W - 52, SPRING, 58, H, 6)
const INNER_LINE = multifoilArch(66, W - 66, SPRING + 4, 78, H, 6)
const OUTER = pointedArch(14, W - 14, SPRING - 20, 6, H)
const OUTER_2 = pointedArch(26, W - 26, SPRING - 14, 24, H)

function Archway({ animated = false, className }) {
  const draw = (delay) =>
    animated
      ? {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true },
          transition: { duration: 2.6, delay, ease: 'easeInOut' },
        }
      : {}

  return (
    <svg className={className} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      <path d={`${OUTER}Z`} fill="rgba(32,3,8,.62)" />
      <path d={`${OUTER_2}Z`} fill="url(#arch-jali)" />
      <path d={`${OPENING}Z`} fill="url(#arch-opening)" />
      <motion.path d={OUTER} fill="none" stroke="#d9b866" strokeWidth="2.6" {...draw(0)} />
      <path d={OUTER_2} fill="none" stroke="#d0a94f" strokeOpacity=".65" strokeWidth=".9" />
      <motion.path d={OPENING} fill="none" stroke="#e7cd86" strokeWidth="2.4" {...draw(0.3)} />
      <path d={INNER_LINE} fill="none" stroke="#d0a94f" strokeOpacity=".5" strokeWidth=".9" />
      <Blossom x={300} y={24} size={0.42} />
      <Blossom x={72} y={100} size={0.72} />
      <Blossom x={528} y={100} size={0.72} />
    </svg>
  )
}

export default function Couple() {
  return (
    <section id="couple" className="section surface-velvet couple">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="arch-opening" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7c1630" />
            <stop offset="0.35" stopColor="#581024" />
            <stop offset="0.7" stopColor="#35070f" />
          </linearGradient>
          <pattern id="arch-jali" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="26" height="26" fill="none" stroke="#d0a94f" strokeOpacity=".3" strokeWidth=".8" />
            <circle cx="13" cy="13" r="3.2" fill="none" stroke="#d0a94f" strokeOpacity=".36" strokeWidth=".8" />
          </pattern>
        </defs>
      </svg>

      <FloatingPetals />

      <div className="couple__stage">
        <div className="couple__side couple__side--l">
          <Archway />
        </div>
        <div className="couple__side couple__side--r">
          <Archway />
        </div>

        <Archway animated className="couple__arch" />
        <FloralSpray className="couple__spray couple__spray--l" />
        <FloralSpray className="couple__spray couple__spray--r" flip />

        <h1 className="couple__names">
          <Reveal as="span" className="couple__name foil foil--shimmer">
            <span>MEERAN</span> <span>MYDEEN</span>
          </Reveal>
          <Reveal as="span" className="couple__with" delay={0.35}>
            <i aria-hidden="true" />
            WITH
            <i aria-hidden="true" />
          </Reveal>
          <Reveal as="span" className="couple__name foil foil--shimmer" delay={0.65}>
            <span>AMRA</span> <span>BANU</span>
          </Reveal>
        </h1>
      </div>
    </section>
  )
}
