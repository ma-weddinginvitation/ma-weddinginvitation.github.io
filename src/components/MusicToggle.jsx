import { motion } from 'framer-motion'
import { Music, Pause } from 'lucide-react'
import './MusicToggle.css'

export default function MusicToggle({ playing, onToggle }) {
  const label = playing ? 'Pause background music' : 'Play background music'
  return (
    <motion.button
      type="button"
      className={`music-toggle ${playing ? 'is-playing' : ''}`}
      onClick={onToggle}
      aria-label={label}
      aria-pressed={playing}
      title={label}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 1 }}
    >
      {playing ? <Pause size={20} strokeWidth={1.7} aria-hidden="true" /> : <Music size={20} strokeWidth={1.7} aria-hidden="true" />}
    </motion.button>
  )
}
