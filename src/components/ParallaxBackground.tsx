import { useRouterState } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

import aboutBackground from '../assets/backgrounds/about-placeholder.jpeg'
import contactBackground from '../assets/backgrounds/contact-placeholder.jpeg'
import homeBackground from '../assets/backgrounds/home-placeholder.jpeg'
import servicesBackground from '../assets/backgrounds/services-placeholder.jpeg'

const backgroundByPath: Record<string, string> = {
  '/': homeBackground,
  '/about': aboutBackground,
  '/services': servicesBackground,
  '/contact': contactBackground,
}

const homeSectionBackgroundById: Record<string, string> = {
  landing: homeBackground,
  about: aboutBackground,
  services: servicesBackground,
  contact: contactBackground,
}

export default function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { pathname, hash } = useRouterState({
    select: (state) => ({
      pathname: state.location.pathname,
      hash: state.location.hash,
    }),
  })
  const [activeHomeSection, setActiveHomeSection] = useState('landing')

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

  useEffect(() => {
    if (pathname !== '/') {
      return
    }

    const hashedSection = hash.replace('#', '')
    if (hashedSection && homeSectionBackgroundById[hashedSection]) {
      setActiveHomeSection(hashedSection)
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-route-background]'),
    )

    if (sections.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const nextSectionId = visibleEntries[0]?.target.id

        if (nextSectionId && homeSectionBackgroundById[nextSectionId]) {
          setActiveHomeSection(nextSectionId)
        }
      },
      {
        rootMargin: '-20% 0px -20% 0px',
        threshold: [0.2, 0.4, 0.6, 0.8],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [hash, pathname])

  const backgroundImage =
    pathname === '/'
      ? homeSectionBackgroundById[activeHomeSection] ?? homeBackground
      : backgroundByPath[pathname] ?? homeBackground

  return (
    <div
      ref={containerRef}
      className="parallax-bg"
      style={{ ['--route-bg-image' as string]: `url("${backgroundImage}")` }}
      aria-hidden="true"
    >
      <div className="parallax-image" />
      <div className="parallax-overlay" />
      <div className="parallax-gradient" />
      <div className="parallax-layer layer-one" />
      <div className="parallax-layer layer-two" />
      <div className="parallax-layer layer-three" />
      <div className="parallax-grid" />
    </div>
  )
}
