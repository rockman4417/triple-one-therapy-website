import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <main className="min-h-screen bg-transparent px-6 pb-16 pt-28 text-stone-900">
      <div className="mx-auto max-w-4xl">
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
        <p className="mb-10 text-lg leading-relaxed text-stone-700">
          Every care plan is individualized. Sessions are collaborative,
          strengths-based, and paced according to your needs.
        </p>

        <div className="rounded-2xl border border-stone-300 bg-stone-50 p-8">
          <h2 className="mb-4 text-2xl font-semibold">What to Expect</h2>
          <ul className="space-y-3 text-stone-700">
            <li>Clear treatment goals and regular progress check-ins</li>
            <li>Evidence-based interventions tailored to your context</li>
            <li>A compassionate and non-judgmental therapeutic space</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
