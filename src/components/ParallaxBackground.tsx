import { useRouterState } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

import aboutBackground from '../assets/backgrounds/about-placeholder.jpeg'
import contactBackground from '../assets/backgrounds/contact-placeholder.jpeg'
import homeBackground from '../assets/backgrounds/home-placeholder.jpeg'
import servicesBackground from '../assets/backgrounds/services-placeholder.jpeg'

type BackgroundScene =
  | {
      kind: 'image'
      image: string
      overlay?: string
    }
  | {
      kind: 'solid'
      color: string
      overlay?: string
    }
  | {
      kind: 'gradient'
      gradient: string
      overlay?: string
    }
  | {
      kind: 'split'
      image: string
      color: string
      split?: 'left' | 'right'
      overlay?: string
    }

const backgroundSceneById: Record<string, BackgroundScene> = {
  'home-landing': {
    kind: 'image',
    image: homeBackground,
    overlay:
      'linear-gradient(180deg, rgb(248 244 238 / 30%) 0%, rgb(244 239 232 / 18%) 30%, rgb(238 233 225 / 36%) 100%)',
  },
  'home-about': {
    kind: 'split',
    image: aboutBackground,
    color: '#efe5d8',
    split: 'left',
    overlay:
      'linear-gradient(90deg, rgb(255 250 245 / 24%) 0%, rgb(255 250 245 / 12%) 100%)',
  },
  'home-services': {
    kind: 'gradient',
    gradient:
      'linear-gradient(135deg, #dce9e4 0%, #edf4ef 42%, #f4efe6 100%)',
    overlay:
      'radial-gradient(circle at 75% 15%, rgb(255 255 255 / 24%) 0%, transparent 38%)',
  },
  'home-contact': {
    kind: 'image',
    image: servicesBackground,
    overlay:
      'linear-gradient(180deg, rgb(248 244 238 / 24%) 0%, rgb(238 233 225 / 34%) 100%)',
  },
  'about-intro': {
    kind: 'solid',
    color: '#e8dccd',
    overlay:
      'linear-gradient(135deg, rgb(255 255 255 / 22%) 0%, rgb(255 255 255 / 0%) 65%)',
  },
  'about-approach': {
    kind: 'gradient',
    gradient:
      'linear-gradient(135deg, #efe4d7 0%, #f6efe7 40%, #dfebe6 100%)',
    overlay:
      'radial-gradient(circle at 20% 30%, rgb(255 255 255 / 24%) 0%, transparent 42%)',
  },
  'services-overview': {
    kind: 'gradient',
    gradient:
      'linear-gradient(135deg, #e6efe8 0%, #d8e6df 35%, #cfded9 65%, #f4eee5 100%)',
    overlay:
      'radial-gradient(circle at 20% 20%, rgb(255 255 255 / 28%) 0%, transparent 45%)',
  },
  'services-offerings': {
    kind: 'split',
    image: servicesBackground,
    color: '#f1e8dd',
    split: 'left',
    overlay:
      'linear-gradient(90deg, rgb(255 251 246 / 22%) 0%, rgb(255 251 246 / 10%) 100%)',
  },
  'contact-intro': {
    kind: 'split',
    image: contactBackground,
    color: '#eadfd2',
    split: 'right',
    overlay:
      'linear-gradient(90deg, rgb(255 248 242 / 10%) 0%, rgb(255 248 242 / 28%) 100%)',
  },
  'contact-form': {
    kind: 'solid',
    color: '#e7ddd2',
    overlay:
      'linear-gradient(180deg, rgb(255 255 255 / 20%) 0%, rgb(255 255 255 / 8%) 100%)',
  },
}

export default function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { pathname, hash } = useRouterState({
    select: (state) => ({
      pathname: state.location.pathname,
      hash: state.location.hash,
    }),
  })
  const [activeSceneId, setActiveSceneId] = useState('home-landing')

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
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-route-background]'),
    )

    if (sections.length === 0) {
      return
    }

    const hashedSectionId = hash.replace('#', '')
    const hashedSection = hashedSectionId
      ? sections.find((section) => section.id === hashedSectionId)
      : undefined
    const initialSection = hashedSection ?? sections[0]
    const initialSceneId = initialSection?.dataset.routeBackground

    if (initialSceneId && backgroundSceneById[initialSceneId]) {
      setActiveSceneId(initialSceneId)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const nextSceneId = visibleEntries[0]?.target.getAttribute(
          'data-route-background',
        )

        if (nextSceneId && backgroundSceneById[nextSceneId]) {
          setActiveSceneId(nextSceneId)
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

  const scene = backgroundSceneById[activeSceneId] ?? backgroundSceneById['home-landing']

  type SceneStyle = React.CSSProperties & {
    '--scene-image'?: string
    '--scene-solid'?: string
    '--scene-gradient'?: string
    '--scene-overlay'?: string
  }

  const sceneStyle: SceneStyle = {
    '--scene-overlay':
      scene.overlay ??
      'linear-gradient(180deg, rgb(248 244 238 / 22%) 0%, rgb(238 233 225 / 28%) 100%)',
  }

  if (scene.kind === 'image') {
    sceneStyle['--scene-image'] = `url("${scene.image}")`
  }

  if (scene.kind === 'solid') {
    sceneStyle['--scene-solid'] = scene.color
  }

  if (scene.kind === 'gradient') {
    sceneStyle['--scene-gradient'] = scene.gradient
  }

  if (scene.kind === 'split') {
    sceneStyle['--scene-image'] = `url("${scene.image}")`
    sceneStyle['--scene-solid'] = scene.color
  }

  return (
    <div
      ref={containerRef}
      className="parallax-bg"
      style={sceneStyle}
      aria-hidden="true"
    >
      <div
        className={`parallax-scene parallax-scene--${scene.kind}${
          scene.kind === 'split' && scene.split === 'left'
            ? ' parallax-scene--split-left'
            : ''
        }`}
      >
        {(scene.kind === 'image' || scene.kind === 'split') && (
          <div className="parallax-image" />
        )}
        {(scene.kind === 'solid' || scene.kind === 'split') && (
          <div className="parallax-solid" />
        )}
        {scene.kind === 'gradient' && <div className="parallax-gradient-fill" />}
      </div>
      <div className="parallax-overlay" />
      <div className="parallax-gradient" />
      <div className="parallax-layer layer-one" />
      <div className="parallax-layer layer-two" />
      <div className="parallax-layer layer-three" />
      <div className="parallax-grid" />
    </div>
  )
}
