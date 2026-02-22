import { useEffect, useRef } from 'react'

export default function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0

    const updateScrollVar = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        containerRef.current?.style.setProperty(
          '--scroll-y',
          String(window.scrollY),
        )
      })
    }

    updateScrollVar()
    window.addEventListener('scroll', updateScrollVar, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateScrollVar)
    }
  }, [])

  return (
    <div ref={containerRef} className="parallax-bg" aria-hidden="true">
      <div className="parallax-gradient" />
      <div className="parallax-layer layer-one" />
      <div className="parallax-layer layer-two" />
      <div className="parallax-layer layer-three" />
      <div className="parallax-grid" />
    </div>
  )
}
