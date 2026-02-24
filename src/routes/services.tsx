import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services')({ component: ServicesPage })

function ServicesPage() {
  return (
    <main className="min-h-screen bg-transparent px-6 pb-16 pt-28 text-stone-900">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-xs uppercase tracking-[0.24em] text-stone-500">
          Services
        </p>
        <h1 className="mb-8 text-4xl font-semibold sm:text-5xl">
          Therapy Services
        </h1>

        <div className="space-y-5">
          <article className="rounded-2xl border border-stone-300 bg-stone-50 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Individual Psychotherapy</h2>
            <p className="mt-3 text-stone-700">
              One-on-one therapy tailored to your needs and goals.
            </p>
            <p className="mt-4 text-lg font-semibold text-stone-900">$130</p>
          </article>

          <article className="rounded-2xl border border-stone-300 bg-stone-50 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Group Therapy</h2>
            <p className="mt-3 text-stone-700">
              Supportive group sessions focused on shared growth and connection.
            </p>
            <p className="mt-4 text-lg font-semibold text-stone-900">
              Price varies
            </p>
          </article>
        </div>
      </div>
    </main>
  )
}
