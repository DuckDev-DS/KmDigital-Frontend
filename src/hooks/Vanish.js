import { useEffect, useState } from 'react'

export function vanish(showTime = 1200, fadeTime = 500, externalTrigger = null) {
  const [showSplash, setShowSplash] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    let showTimer
    let hideTimer

    //MODO CONTROLADO POR TRIGGER EXTERNO
    if (externalTrigger !== null) {
      if (externalTrigger) {
        // cuando externalTrigger = true, iniciamos fade
        setFadeOut(true)
        hideTimer = setTimeout(() => {
          setShowSplash(false)
        }, fadeTime)
      }
    } else {
      //MODO POR TIEMPO 
      showTimer = setTimeout(() => {
        setFadeOut(true)
        hideTimer = setTimeout(() => {
          setShowSplash(false)
        }, fadeTime)
      }, showTime)
    }

    return () => {
      if (showTimer) clearTimeout(showTimer)
      if (hideTimer) clearTimeout(hideTimer)
    }
  }, [showTime, fadeTime, externalTrigger])

  return { showSplash, fadeOut }
}