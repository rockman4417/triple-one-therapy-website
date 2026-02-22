import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (!hash) {
      return
    }
    const target = document.getElementById(hash)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <main className="bg-stone-100 pt-20 text-stone-900">
      <section
        id="landing"
        className="section-anchor relative overflow-hidden px-6 py-24"
      >
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.24em] text-stone-500">
            Welcome
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-6xl">
            Triple One Therapy
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-stone-700 sm:text-xl">
            A calm, supportive space for individuals and families seeking
            practical therapy with compassion and clarity.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-stone-50 transition hover:bg-stone-700"
            >
              Book a Consultation
            </a>
            <a
              href="/#about"
              className="rounded-full border border-stone-400 px-6 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-600"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="section-anchor border-y border-stone-300 px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.24em] text-stone-500">
              About Me
            </p>
            <h2 className="mb-4 text-3xl font-semibold sm:text-4xl">
              Person-centered care with structured tools
            </h2>
            <p className="text-base leading-relaxed text-stone-700">
              Triple One Therapy combines evidence-based methods with a
              personalized approach. Sessions are tailored around your goals,
              pace, and lived experience.
            </p>
          </div>
          <div className="rounded-2xl border border-stone-300 bg-stone-50 p-6">
            <h3 className="mb-4 text-xl font-semibold">Areas of Focus</h3>
            <ul className="space-y-3 text-stone-700">
              <li>Anxiety and stress management</li>
              <li>Life transitions and burnout</li>
              <li>Relationship and communication challenges</li>
              <li>Trauma-informed support</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="section-anchor px-6 py-24">
        <div className="mx-auto max-w-5xl rounded-2xl border border-stone-300 bg-stone-50 p-8 text-center sm:p-12">
          <p className="mb-3 text-xs uppercase tracking-[0.24em] text-stone-500">
            Contact
          </p>
          <h2 className="mb-5 text-3xl font-semibold sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mx-auto max-w-2xl text-stone-700">
            Reach out to schedule an introductory call and see if we are a fit.
            I respond to all inquiries within 1-2 business days.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-block rounded-full bg-stone-900 px-7 py-3 text-sm font-semibold text-stone-50 transition hover:bg-stone-700"
          >
            Open Contact Page
          </a>
        </div>
      </section>
    </main>
  )
}
