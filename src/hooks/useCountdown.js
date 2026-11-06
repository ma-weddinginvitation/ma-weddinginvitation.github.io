import { useEffect, useState } from 'react'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

function remaining(target) {
  const ms = Math.max(0, target.getTime() - Date.now())
  return {
    days: Math.floor(ms / DAY),
    hours: Math.floor((ms % DAY) / HOUR),
    minutes: Math.floor((ms % HOUR) / MINUTE),
    seconds: Math.floor((ms % MINUTE) / SECOND),
  }
}

/** Live time left until `target`, ticking on each whole second. Stops at zero. */
export function useCountdown(target) {
  const [time, setTime] = useState(() => remaining(target))

  useEffect(() => {
    let timer
    const tick = () => {
      setTime(remaining(target))
      const left = target.getTime() - Date.now()
      if (left > 0) timer = setTimeout(tick, left % SECOND || SECOND)
    }
    tick()
    return () => clearTimeout(timer)
  }, [target])

  return time
}
