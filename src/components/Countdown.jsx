import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, Clock } from 'lucide-react'
import { TIME_RANGE, WEDDING_INSTANT } from '../data/wedding'
import { useCountdown } from '../hooks/useCountdown'
import { Divider, Mandala } from './Ornaments'
import Reveal from './Reveal'
import './Countdown.css'

function Tile({ value, label }) {
  const text = String(value).padStart(2, '0')
  return (
    <div className="tile">
      <div className="tile__face">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={text}
            className="tile__value"
            initial={{ y: '-55%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '55%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 0.8, 0.24, 1] }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="tile__label">{label}</span>
    </div>
  )
}

export default function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_INSTANT)

  return (
    <section id="date" className="section surface-velvet date">
      <Mandala className="backdrop-mandala date__mandala" />

      <Reveal className="date__icon">
        <CalendarDays size={30} strokeWidth={1.1} aria-hidden="true" />
      </Reveal>
      <Reveal as="p" className="date__day" delay={0.1}>
        SUNDAY
      </Reveal>
      <Reveal as="h2" className="date__date foil foil--shimmer" delay={0.2}>
        10 JANUARY 2027
      </Reveal>
      <Reveal as="p" className="date__time" delay={0.3}>
        <Clock size={19} strokeWidth={1.3} aria-hidden="true" />
        {TIME_RANGE}
      </Reveal>
      <Reveal delay={0.4} className="date__divider">
        <Divider />
      </Reveal>

      <Reveal className="date__tiles" delay={0.5} role="timer" aria-label={`${days} days, ${hours} hours and ${minutes} minutes until the wedding`}>
        <Tile value={days} label="Days" />
        <Tile value={hours} label="Hours" />
        <Tile value={minutes} label="Minutes" />
        <Tile value={seconds} label="Seconds" />
      </Reveal>
    </section>
  )
}
