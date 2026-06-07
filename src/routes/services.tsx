import { createFileRoute } from '@tanstack/react-router'

import RouteSceneLayout, {
  type BackgroundScene,
} from '../components/RouteSceneLayout'

export const Route = createFileRoute('/services')({ component: ServicesPage })

const scenes: Record<string, BackgroundScene> = {
  'services-overview': {
    kind: 'gradient',
    gradient:
      'linear-gradient(135deg, #e6efe8 0%, #d8e6df 35%, #cfded9 65%, #f4eee5 100%)',
    overlay:
      'radial-gradient(circle at 20% 20%, rgb(255 255 255 / 28%) 0%, transparent 45%)',
  },
}

function ServicesPage() {
  return (
    <RouteSceneLayout scenes={scenes} initialSceneId="services-overview">
      <main className="bg-transparent pt-20 text-stone-900">
        <section
          id="overview"
          data-route-background="services-overview"
          className="section-anchor flex min-h-screen items-center px-6 py-24"
        >
          <div className="mx-auto w-full max-w-6xl">
            <div className="route-scene mb-10 max-w-2xl">
              <p className="mb-4 text-xs uppercase tracking-[0.24em] text-stone-500">
                Services
              </p>
              <h1 className="mb-4 text-4xl font-semibold sm:text-5xl">
                Therapy Services
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-stone-700">
                Support can take different shapes depending on the season you are in.
                Each offering is built to be practical, relational, and responsive to
                what you actually need.
              </p>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Individual and group options
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <article className="route-card rounded-2xl border border-stone-300 bg-stone-50/92 p-6 sm:p-8">
                <h3 className="text-2xl font-semibold">Individual Psychotherapy</h3>
                <p className="mt-3 text-stone-700">
                  One-on-one therapy tailored to your needs and goals.
                </p>
                <p className="mt-4 text-lg font-semibold text-stone-900">$130</p>
              </article>

              <article className="route-card rounded-2xl border border-stone-300 bg-stone-50/92 p-6 sm:p-8">
                <h3 className="text-2xl font-semibold">Group Therapy</h3>
                <p className="mt-3 text-stone-700">
                  Supportive group sessions focused on shared growth and connection.
                </p>
                <p className="mt-4 text-lg font-semibold text-stone-900">
                  Price varies
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </RouteSceneLayout>
  )
}
