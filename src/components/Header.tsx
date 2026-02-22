import { Link, useLocation } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About Me', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
  { label: 'Landing Section', href: '/#landing' },
  { label: 'About Section', href: '/#about' },
  { label: 'Contact Section', href: '/#contact' },
]

function isRouteActive(pathname: string, hash: string, href: string) {
  if (href.startsWith('/#')) {
    return pathname === '/' && href === `/${hash}`
  }
  if (href === '/') {
    return pathname === '/'
  }
  return pathname.startsWith(href)
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-300/80 bg-stone-50/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="text-base font-semibold tracking-wide text-stone-900">
          Triple One Therapy
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = isRouteActive(location.pathname, location.hash, item.href)
            const sharedClasses =
              'rounded-full px-4 py-2 text-sm transition-colors'
            const activeClasses = active
              ? 'bg-stone-900 text-stone-50'
              : 'text-stone-700 hover:bg-stone-200'

            if (item.href.startsWith('/#')) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`${sharedClasses} ${activeClasses}`}
                >
                  {item.label}
                </a>
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
          className="rounded-md p-2 text-stone-700 hover:bg-stone-200 md:hidden"
          aria-label="Open navigation menu"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={20} />
        </button>
      </div>

      <aside
        className={`fixed right-0 top-0 h-full w-72 border-l border-stone-300 bg-stone-100 p-4 shadow-xl transition-transform duration-200 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm font-semibold uppercase tracking-widest text-stone-600">
            Menu
          </span>
          <button
            type="button"
            className="rounded-md p-2 text-stone-700 hover:bg-stone-200"
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
              ? 'rounded-md bg-stone-900 px-4 py-3 text-sm text-stone-50'
              : 'rounded-md px-4 py-3 text-sm text-stone-700 hover:bg-stone-200'

            if (item.href.startsWith('/#')) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={classes}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
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
    </header>
  )
}
