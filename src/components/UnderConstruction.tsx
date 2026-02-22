import { Cog, Wrench } from 'lucide-react'

type UnderConstructionProps = {
  isOpen: boolean
  title?: string
  message?: string
}

export default function UnderConstruction({
  isOpen,
  title = 'Under Construction',
  message = 'We are making a few updates and will be back shortly.',
}: UnderConstructionProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-stone-950/70 p-6 backdrop-blur-md">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-amber-300/60 bg-stone-50 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.65)]">
        <div className="h-3 w-full bg-[repeating-linear-gradient(45deg,#f59e0b_0_14px,#1f2937_14px_28px)]" />

        <div className="relative px-8 py-10 sm:px-12">
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-amber-200/45 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-44 w-44 rounded-full bg-teal-200/45 blur-2xl" />

          <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center">
            <div className="absolute h-24 w-24 animate-[spin_14s_linear_infinite] rounded-full border-4 border-stone-400/30 border-t-stone-600/60" />
            <div className="absolute h-16 w-16 rounded-full bg-stone-900 text-stone-100 shadow-lg">
              <div className="flex h-full items-center justify-center gap-1.5">
                <Cog size={16} className="animate-[spin_5s_linear_infinite]" />
                <Wrench size={16} />
              </div>
            </div>
          </div>

          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.26em] text-amber-700">
            Triple One Therapy
          </p>
          <h1 className="text-center text-3xl font-semibold text-stone-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-base leading-relaxed text-stone-700 sm:text-lg">
            {message}
          </p>

          <div className="mx-auto mt-8 max-w-lg rounded-2xl border border-stone-300 bg-white/70 p-5">
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
              Contact
            </p>
            <div className="space-y-2 text-center text-sm text-stone-700 sm:text-base">
              <p>
                Email:{' '}
                <a
                  href="mailto:triple1therapy@gmail.com"
                  className="font-medium text-stone-900 underline underline-offset-4 hover:text-amber-700"
                >
                  triple1therapy@gmail.com
                </a>
              </p>
              <p>
                Phone:{' '}
                <a
                  href="tel:+15551234567"
                  className="font-medium text-stone-900 underline underline-offset-4 hover:text-amber-700"
                >
                  (806) 707-0111
                </a>
              </p>
              <p>
                Psychology Today:{' '}
                <a
                  href="https://www.psychologytoday.com/us/therapists/catherine-cat-tillinghast-lubbock-tx/906024"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-stone-900 underline underline-offset-4 hover:text-amber-700"
                >
                  View Profile
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-stone-700/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-stone-700/50" />
            <span className="h-2.5 w-2.5 rounded-full bg-stone-700/30" />
          </div>
        </div>
      </div>
    </div>
  )
}
