import { useEffect, useState } from 'react'
import './App.css' // first, so that each component's own stylesheet can override it
import { GoldDefs } from './components/Ornaments'
import Envelope from './components/Envelope'
import Welcome from './components/Welcome'
import Couple from './components/Couple'
import Invitation from './components/Invitation'
import Countdown from './components/Countdown'
import Venue from './components/Venue'
import Closing from './components/Closing'
import MusicToggle from './components/MusicToggle'
import SectionNav from './components/SectionNav'
import { useMusic } from './hooks/useMusic'
import velvet from './assets/textures/velvet.webp'

// Hold the small M & A loader until fonts and the velvet are ready, but never for long.
function loadEssentials() {
  const assets = [
    document.fonts.load('600 40px Cinzel'),
    document.fonts.load('400 60px "Pinyon Script"'),
    document.fonts.load('500 20px "Cormorant Garamond"'),
    new Promise((resolve) => {
      const image = new Image()
      image.onload = image.onerror = resolve
      image.src = velvet
    }),
  ]
  const timeout = new Promise((resolve) => setTimeout(resolve, 1800))
  return Promise.race([Promise.all(assets), timeout])
}

export default function App() {
  const [ready, setReady] = useState(false)
  const [revealed, setRevealed] = useState(false) // the site has mounted beneath the envelope
  const [opened, setOpened] = useState(false) // the envelope scene has gone
  const music = useMusic()

  useEffect(() => {
    let active = true
    // The guest always starts from the envelope, so never restore an old scroll position.
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    loadEssentials().finally(() => active && setReady(true))
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-locked', !opened)
  }, [opened])

  if (!ready) {
    return (
      <div className="boot" role="status" aria-label="Loading your invitation">
        <span>M &amp; A</span>
      </div>
    )
  }

  return (
    <>
      <GoldDefs />

      {!opened && (
        <Envelope onOpenStart={music.start} onReveal={() => setRevealed(true)} onDone={() => setOpened(true)} />
      )}

      {revealed && (
        <main>
          <Welcome />
          <Couple />
          <Invitation />
          <Countdown />
          <Venue />
          <Closing />
        </main>
      )}

      {revealed && <SectionNav />}
      {revealed && <MusicToggle playing={music.playing} onToggle={music.toggle} />}
    </>
  )
}
