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
    <main className="bg-transparent pt-20 text-stone-900">
      <section
        id="landing"
        data-route-background
        className="section-anchor relative flex min-h-screen items-center overflow-hidden px-6 py-24"
      >
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.24em] text-stone-500">
            Welcome
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-6xl">
            Depth-oriented therapy for the wandering soul
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-stone-700 sm:text-xl">
            finding alignment in seasons of change.
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

      <section
        id="about"
        data-route-background
        className="section-anchor flex min-h-screen items-center border-y border-stone-300 px-6 py-24"
      >
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

      <section
        id="services"
        data-route-background
        className="section-anchor flex min-h-screen items-center px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.24em] text-stone-500">
              Services
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">How I Can Support You</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-stone-300 bg-stone-50 p-6 sm:p-8">
              <h3 className="text-2xl font-semibold">Individual Psychotherapy</h3>
              <p className="mt-3 text-stone-700">
                One-on-one therapy tailored to your needs and goals.
              </p>
              <p className="mt-5 text-lg font-semibold text-stone-900">$130</p>
            </article>

            <article className="rounded-2xl border border-stone-300 bg-stone-50 p-6 sm:p-8">
              <h3 className="text-2xl font-semibold">Group Therapy</h3>
              <p className="mt-3 text-stone-700">
                Supportive group sessions focused on shared growth and connection.
              </p>
              <p className="mt-5 text-lg font-semibold text-stone-900">Price varies</p>
            </article>
          </div>
        </div>
      </section>

      <section
        id="contact"
        data-route-background
        className="section-anchor flex min-h-screen items-center px-6 py-24"
      >
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
