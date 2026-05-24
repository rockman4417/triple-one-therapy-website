import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <main className="bg-transparent pt-20 text-stone-900">
      <section
        id="intro"
        data-route-background="about-intro"
        className="section-anchor flex min-h-screen items-center px-6 py-24"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="route-scene">
            <p className="mb-4 text-xs uppercase tracking-[0.24em] text-stone-500">
              About Me
            </p>
            <h1 className="mb-6 text-4xl font-semibold sm:text-5xl">
              Therapy rooted in trust, structure, and progress
            </h1>
            <p className="mb-5 text-lg leading-relaxed text-stone-700">
              I work with clients who are navigating anxiety, major transitions,
              and relationship stress. Together we build practical strategies that
              can be used in daily life, not just in session.
            </p>
            <p className="mb-4 text-lg leading-relaxed text-stone-700">
              Every care plan is individualized. Sessions are collaborative,
              strengths-based, and paced according to your needs.
            </p>
            <p className="text-lg leading-relaxed text-stone-700">
              The work is practical, relational, and paced to what is usable in
              your actual life. I want therapy to feel clear and grounded, not
              vague or performative.
            </p>
          </div>

          <div className="route-card rounded-2xl border border-stone-300 bg-stone-50/92 p-8">
            <h3 className="mb-4 text-2xl font-semibold">What to Expect</h3>
            <ul className="space-y-3 text-stone-700">
              <li>Clear treatment goals and regular progress check-ins</li>
              <li>Evidence-based interventions tailored to your context</li>
              <li>A compassionate and non-judgmental therapeutic space</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
