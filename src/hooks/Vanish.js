import { useEffect, useState } from 'react'

export function vanish(showTime = 1200, fadeTime = 500) {
  const [showSplash, setShowSplash] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timerShow = setTimeout(() => {
      setFadeOut(true)

      const timerHide = setTimeout(() => {
        setShowSplash(false)
      }, fadeTime)

      return () => clearTimeout(timerHide)
    }, showTime)

    return () => clearTimeout(timerShow)
  }, [showTime, fadeTime])

  return { showSplash, fadeOut }
}
