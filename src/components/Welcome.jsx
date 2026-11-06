import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Divider, FloralSpray, Mandala } from './Ornaments'
import Hosts from './Hosts'
import Reveal from './Reveal'
import './Welcome.css'

export default function Welcome() {
  return (
    <section id="welcome" className="section surface-ivory welcome">
      <Mandala className="backdrop-mandala welcome__mandala" />
      <FloralSpray className="welcome__spray welcome__spray--tl" />
      <FloralSpray className="welcome__spray welcome__spray--br" />

      <div className="welcome__content">
        <Reveal as="p" className="eyebrow welcome__eyebrow" delay={0.2}>
          A FAMILY WEDDING INVITATION
        </Reveal>
        <Reveal delay={0.45}>
          <Divider />
        </Reveal>
        <Reveal as="h2" className="welcome__hosts foil-dark" delay={0.7}>
          <Hosts />
        </Reveal>
        <Reveal as="p" className="welcome__request" delay={1}>
          Request the pleasure of your company and blessings on the joyous occasion of their beloved son&rsquo;s wedding.
        </Reveal>
      </div>

      <motion.a
        href="#couple"
        className="welcome__next"
        aria-label="Continue to the couple"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 7, 0] }}
        transition={{
          opacity: { duration: 1, delay: 1.6 },
          y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 1.6 },
        }}
      >
        <ChevronDown size={26} strokeWidth={1.3} aria-hidden="true" />
      </motion.a>
    </section>
  )
}
