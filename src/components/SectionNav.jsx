import { useEffect, useState } from 'react'
import { SECTIONS } from '../data/wedding'
import './SectionNav.css'

/** A slim column of gold points for moving between sections. Hidden on phones. */
export default function SectionNav() {
  const [active, setActive] = useState(SECTIONS[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="section-nav" aria-label="Invitation sections">
      {SECTIONS.map(({ id, label }) => (
        <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} aria-current={active === id ? 'true' : undefined}>
          <span className="section-nav__label">{label}</span>
          <span className="section-nav__dot" />
        </a>
      ))}
    </nav>
  )
}
