import { useCallback, useEffect, useRef, useState } from 'react'

const TRACK = `${import.meta.env.BASE_URL}music/royal-procession.mp3`
const TARGET_VOLUME = 0.55
const FADE_MS = 1800

/**
 * Background music. Nothing downloads or plays until the guest's first interaction,
 * which is what mobile browsers require anyway. Music also pauses while the page is
 * in the background, for example when a guest switches back to WhatsApp.
 */
export function useMusic() {
  const audioRef = useRef(null)
  const fadeRef = useRef(0)
  const wantedRef = useRef(false)
  const [playing, setPlaying] = useState(false)

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(TRACK)
      audio.loop = true
      audio.preload = 'none'
      audio.volume = 0
      audio.addEventListener('play', () => setPlaying(true))
      audio.addEventListener('pause', () => setPlaying(false))
      audioRef.current = audio
    }
    return audioRef.current
  }, [])

  const play = useCallback(() => {
    const audio = getAudio()
    cancelAnimationFrame(fadeRef.current)
    // A browser may still refuse. The toggle then simply stays in its paused state.
    audio.play().catch(() => {
      wantedRef.current = false
    })
    const startVolume = audio.volume
    const startedAt = performance.now()
    const step = (now) => {
      // The frame's timestamp can be slightly earlier than startedAt, so clamp both ends.
      const progress = Math.min(1, Math.max(0, (now - startedAt) / FADE_MS))
      audio.volume = startVolume + (TARGET_VOLUME - startVolume) * progress
      if (progress < 1) fadeRef.current = requestAnimationFrame(step)
    }
    fadeRef.current = requestAnimationFrame(step)
  }, [getAudio])

  const pause = useCallback(() => {
    cancelAnimationFrame(fadeRef.current)
    audioRef.current?.pause()
  }, [])

  const start = useCallback(() => {
    wantedRef.current = true
    play()
  }, [play])

  const toggle = useCallback(() => {
    wantedRef.current = !wantedRef.current
    if (wantedRef.current) play()
    else pause()
  }, [play, pause])

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) pause()
      else if (wantedRef.current) play()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      cancelAnimationFrame(fadeRef.current)
      audioRef.current?.pause()
    }
  }, [play, pause])

  return { playing, start, toggle }
}
