import { Link, useLocation } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import totLogo from '../assets/totlogo.png'

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About Me', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact Me', href: '/contact' },
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
      <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
        <div className="mx-auto flex h-24 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            to="/"
            className="group flex items-center gap-3 rounded-full px-2 py-1 transition hover:bg-stone-200/60"
          >
            <span className="relative inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-amber-200 bg-white shadow-[0_8px_24px_-14px_rgba(120,90,50,0.7)]">
              <span className="absolute inset-0 bg-gradient-to-br from-amber-100/70 via-transparent to-teal-100/50" />
              <img
                src={totLogo}
                alt="Triple One Therapy logo"
                className="relative h-11 w-11 object-contain transition duration-300 group-hover:scale-105"
              />
            </span>
            <span className="leading-tight">
              <span className="block text-base font-semibold tracking-[0.02em] text-stone-900">
                Triple One
              </span>
              <span className="block text-xs uppercase tracking-[0.2em] text-stone-500">
                Therapy
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-2 rounded-full border border-stone-300/80 bg-white/65 p-1.5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.9)] md:flex">
            {NAV_ITEMS.map((item) => {
              const active = isRouteActive(location.pathname, location.hash, item.href)
              const sharedClasses =
                'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200'
              const activeClasses = active
                ? 'bg-stone-900 text-stone-50 shadow-[0_10px_22px_-16px_rgba(17,24,39,0.95)]'
                : 'text-stone-700 hover:bg-stone-200/80'

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
            className="rounded-full border border-stone-300 bg-white p-2.5 text-stone-700 shadow-sm transition hover:bg-stone-100 md:hidden"
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
        className={`fixed right-0 top-0 z-50 h-full w-[19rem] border-l border-stone-300 bg-stone-100/95 p-4 shadow-xl backdrop-blur-md transition-transform duration-200 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-stone-200"
            onClick={() => setIsOpen(false)}
          >
            <img src={totLogo} alt="" className="h-8 w-8 rounded-full border border-amber-200" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-600">
              Triple One
            </span>
          </Link>
          <button
            type="button"
            className="rounded-full border border-stone-300 bg-white p-2 text-stone-700 hover:bg-stone-100"
            aria-label="Close navigation menu"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          {NAV_ITEMS.map((item) => {
            const active = isRouteActive(location.pathname, location.hash, item.href)
            const classes = active
              ? 'rounded-xl bg-stone-900 px-4 py-3 text-sm font-medium text-stone-50'
              : 'rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-stone-700 hover:border-stone-300 hover:bg-stone-200/70'

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
