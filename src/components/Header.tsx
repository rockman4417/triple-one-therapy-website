import { Link, useLocation } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import totLogo from '../assets/totlogo.png'
import SimplePracticeContactWidget from './SimplePracticeContactWidget'

const NAV_ITEMS = [
  { label: 'Home', href: '/', type: 'route' as const },
  { label: 'About Me', href: '/about', type: 'route' as const },
  { label: 'Services', href: '/services', type: 'route' as const },
  { label: 'Contact Me', type: 'widget' as const },
]

function isRouteActive(pathname: string, hash: string, href: string) {
  if (href === '/') {
    return pathname === '/'
  }
  return pathname.startsWith(href)
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#ede8d1]/20 bg-[#312a21]/38 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            to="/"
            className="group flex items-center gap-3 px-1 py-1 transition-opacity hover:opacity-80"
          >
            <span className="relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[#ede8d1]/35 bg-[#ede8d1]/95 shadow-[0_8px_22px_-18px_rgba(15,12,10,0.75)]">
              <img
                src={totLogo}
                alt="Triple One Therapy logo"
                className="relative h-9 w-9 object-contain transition duration-300 group-hover:scale-105"
              />
            </span>
            <span className="leading-tight">
              <span className="block text-base font-semibold tracking-[0.08em] text-[#f4ecdd]">
                Triple One
              </span>
              <span className="block text-[0.65rem] uppercase tracking-[0.28em] text-[#d8ccba]">
                Therapy
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => {
              const sharedClasses =
                'relative py-2 text-sm uppercase tracking-[0.22em] transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-center after:scale-x-0 after:bg-current after:transition-transform after:duration-200'
              const activeClasses =
                item.type === 'route' &&
                isRouteActive(location.pathname, location.hash, item.href)
                  ? 'text-[#f7f0e2] after:scale-x-100'
                  : 'text-[#e0d4c3] hover:text-[#fff8ec] hover:after:scale-x-100'

              if (item.type === 'widget') {
                return (
                  <SimplePracticeContactWidget
                    key={item.label}
                    label={item.label}
                    className={`${sharedClasses} ${activeClasses}`}
                  />
                )
              }

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`${sharedClasses} ${activeClasses}`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <button
            type="button"
            className="rounded-full border border-[#ede8d1]/30 bg-[#ede8d1]/10 p-2.5 text-[#f4ecdd] transition hover:bg-[#ede8d1]/18 md:hidden"
            aria-label="Open navigation menu"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-stone-900/40 backdrop-blur-sm transition md:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-[19rem] border-l border-[#ede8d1]/18 bg-[#2f281f]/96 p-4 shadow-xl backdrop-blur-md transition-transform duration-200 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-[#ede8d1]/12"
            onClick={() => setIsOpen(false)}
          >
            <img
              src={totLogo}
              alt=""
              className="h-8 w-8 rounded-full border border-[#ede8d1]/30 bg-[#ede8d1]/90"
            />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ede8d1]">
              Triple One
            </span>
          </Link>
          <button
            type="button"
            className="rounded-full border border-[#ede8d1]/25 bg-[#ede8d1]/10 p-2 text-[#ede8d1] hover:bg-[#ede8d1]/18"
            aria-label="Close navigation menu"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          {NAV_ITEMS.map((item) => {
            const classes =
              item.type === 'route' &&
              isRouteActive(location.pathname, location.hash, item.href)
              ? 'rounded-xl bg-stone-900 px-4 py-3 text-sm font-medium text-stone-50'
              : 'rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-stone-700 hover:border-stone-300 hover:bg-stone-200/70'

            if (item.type === 'widget') {
              return (
                <SimplePracticeContactWidget
                  key={item.label}
                  label={item.label}
                  className={`text-left uppercase tracking-[0.18em] ${classes}`}
                  onClick={() => setIsOpen(false)}
                />
              )
            }

            return (
              <Link
                key={item.href}
                to={item.href}
                className={classes}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
