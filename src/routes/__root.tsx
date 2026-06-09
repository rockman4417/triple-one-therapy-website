import {
  HeadContent,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useEffect } from 'react'

import Header from '../components/Header'
import UnderConstruction from '../components/UnderConstruction'
import {
  SIMPLE_PRACTICE_SCRIPT_ID,
  SIMPLE_PRACTICE_SCRIPT_SRC,
} from '../components/simple-practice-widget'

import appCss from '../styles.css?url'

const SITE_UNDER_CONSTRUCTION = false

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Triple One Therapy',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const existingScript = document.getElementById(
      SIMPLE_PRACTICE_SCRIPT_ID,
    ) as HTMLScriptElement | null

    if (existingScript) {
      return
    }

    const script = document.createElement('script')
    script.id = SIMPLE_PRACTICE_SCRIPT_ID
    script.src = SIMPLE_PRACTICE_SCRIPT_SRC
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="relative min-h-screen">
        <div className="relative z-10">
          <Header />
          {children}
        </div>
        <UnderConstruction isOpen={SITE_UNDER_CONSTRUCTION} />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
