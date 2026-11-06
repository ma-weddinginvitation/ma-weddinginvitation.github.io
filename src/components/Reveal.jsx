import { motion } from 'framer-motion'

const EASE = [0.22, 0.8, 0.24, 1]

/** Fades and slides its content up the first time it scrolls into view. */
export default function Reveal({ as = 'div', delay = 0, y = 26, className, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
