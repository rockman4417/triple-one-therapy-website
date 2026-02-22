import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({ component: ContactPage })

function ContactPage() {
  return (
    <main className="min-h-screen bg-stone-100 px-6 pb-16 pt-28 text-stone-900">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-xs uppercase tracking-[0.24em] text-stone-500">
          Contact
        </p>
        <h1 className="mb-4 text-4xl font-semibold sm:text-5xl">
          Reach out to Triple One Therapy
        </h1>
        <p className="mb-10 text-lg text-stone-700">
          Share a bit about what you are looking for and I will follow up
          within 1-2 business days.
        </p>

        <form className="space-y-5 rounded-2xl border border-stone-300 bg-stone-50 p-6 sm:p-8">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-stone-700">
              Name
            </span>
            <input
              type="text"
              className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500"
              placeholder="Your name"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-stone-700">
              Email
            </span>
            <input
              type="email"
              className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500"
              placeholder="you@email.com"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-stone-700">
              Message
            </span>
            <textarea
              rows={6}
              className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500"
              placeholder="How can I support you?"
            />
          </label>

          <button
            type="submit"
            className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-stone-50 transition hover:bg-stone-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  )
}
