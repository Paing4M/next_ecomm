'use client'

import {useEffect, useState} from "react"
import Confetti from "react-confetti"

const SuccessConfetti = () => {
  const [windowSize, setWindowSize] = useState({width: 0, height: 0})

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: document.documentElement.clientWidth,
        height: window.innerHeight,
      })
    }

    updateSize()
    
    window.addEventListener("resize", updateSize)

    return () => window.removeEventListener("resize", updateSize)
  }, [])

  if (windowSize.width === 0 || windowSize.height === 0) return null

  return (
    <Confetti
      width={windowSize.width}
      height={windowSize.height}
      gravity={0.3}
      numberOfPieces={700}
      recycle={false}
      style={{zIndex: 99}}
    />
  )
}

export default SuccessConfetti
