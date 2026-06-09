import { useRouterState } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

export type BackgroundScene =
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

type SceneStyle = React.CSSProperties & {
  '--scene-image'?: string
  '--scene-solid'?: string
  '--scene-gradient'?: string
  '--scene-overlay'?: string
}

type RouteSceneLayoutProps = {
  children: React.ReactNode
  initialSceneId: string
  scenes: Record<string, BackgroundScene>
}

export default function RouteSceneLayout({
  children,
  initialSceneId,
  scenes,
}: RouteSceneLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { hash, pathname } = useRouterState({
    select: (state) => ({
      hash: state.location.hash,
      pathname: state.location.pathname,
    }),
  })
  const [activeSceneId, setActiveSceneId] = useState(initialSceneId)

  useEffect(() => {
    setActiveSceneId(initialSceneId)
  }, [initialSceneId, pathname])

  useEffect(() => {
    let frame = 0

    const updateScrollVar = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        containerRef.current?.style.setProperty('--scroll-y', String(window.scrollY))
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
    const scope = containerRef.current
    if (!scope) {
      return
    }

    const sections = Array.from(
      scope.querySelectorAll<HTMLElement>('[data-route-background]'),
    )

    if (sections.length === 0) {
      return
    }

    const hashedSectionId = hash.replace('#', '')
    const hashedSection = hashedSectionId
      ? sections.find((section) => section.id === hashedSectionId)
      : undefined
    const initialSection = hashedSection ?? sections[0]
    const initialSectionSceneId = initialSection?.dataset.routeBackground

    if (initialSectionSceneId && scenes[initialSectionSceneId]) {
      setActiveSceneId(initialSectionSceneId)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const nextSceneId = visibleEntries[0]?.target.getAttribute(
          'data-route-background',
        )

        if (nextSceneId && scenes[nextSceneId]) {
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
  }, [hash, scenes])

  const scene = scenes[activeSceneId] ?? scenes[initialSceneId]

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
    <div ref={containerRef} className="relative min-h-screen">
      <div className="parallax-bg" style={sceneStyle} aria-hidden="true">
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

      <div className="relative z-10">{children}</div>
    </div>
  )
}
