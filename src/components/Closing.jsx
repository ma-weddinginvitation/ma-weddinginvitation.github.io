import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { SHORT_NAMES, whatsappShareUrl } from '../data/wedding'
import { Blossom, Mandala } from './Ornaments'
import Hosts from './Hosts'
import Reveal from './Reveal'
import FloatingPetals from './FloatingPetals'
import './Closing.css'

// Share the page address the guest is actually on, without any #section anchor.
function shareUrl() {
  return whatsappShareUrl(window.location.href.split('#')[0])
}

export default function Closing() {
  return (
    <section id="blessings" className="section surface-velvet closing">
      <FloatingPetals />
      <motion.div
        className="backdrop-mandala closing__mandala"
        animate={{ rotate: 360 }}
        transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
      >
        <Mandala />
      </motion.div>

      <motion.svg
        className="closing__blossom"
        viewBox="-40 -40 80 80"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.35, rotate: -40 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: [0.22, 0.8, 0.24, 1] }}
      >
        <Blossom />
      </motion.svg>

      <div className="closing__content">
        <Reveal as="p" className="closing__blessing foil" delay={0.3}>
          Your presence and blessings will make this celebration truly special.
        </Reveal>
        <Reveal as="p" className="closing__regards" delay={0.7}>
          With warm regards,
        </Reveal>
        <Reveal as="p" className="closing__hosts" delay={1}>
          <Hosts />
        </Reveal>
      </div>

      <Reveal delay={1.3} className="closing__share">
        <a className="gold-button" href={shareUrl()} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={19} strokeWidth={1.6} aria-hidden="true" />
          SHARE ON WHATSAPP
        </a>
      </Reveal>

      <motion.div
        className="closing__rule"
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, delay: 1.5, ease: 'easeInOut' }}
      />
      <Reveal as="p" className="closing__names foil" delay={2}>
        {SHORT_NAMES}
      </Reveal>
    </section>
  )
}
