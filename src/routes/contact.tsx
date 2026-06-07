import { createFileRoute } from '@tanstack/react-router'
import { createServerFn, useServerFn } from '@tanstack/react-start'
import { useState, type FormEvent } from 'react'

import contactBackground from '../assets/backgrounds/contact-placeholder.jpeg'
import RouteSceneLayout, {
  type BackgroundScene,
} from '../components/RouteSceneLayout'

export const Route = createFileRoute('/contact')({ component: ContactPage })

type ContactPayload = {
  name: string
  email: string
  message: string
  website?: string
}

const scenes: Record<string, BackgroundScene> = {
  'contact-intro': {
    kind: 'split',
    image: contactBackground,
    color: '#eadfd2',
    split: 'right',
    overlay:
      'linear-gradient(90deg, rgb(255 248 242 / 10%) 0%, rgb(255 248 242 / 28%) 100%)',
  },
}

const submitContactForm = createServerFn({ method: 'POST' })
  .inputValidator((data: ContactPayload) => data)
  .handler(
  async ({ data }: { data: ContactPayload }) => {
    const name = data?.name?.trim()
    const email = data?.email?.trim()
    const message = data?.message?.trim()
    const website = data?.website?.trim()

    if (website) {
      return { ok: true }
    }

    if (!name || !email || !message) {
      return { ok: false, error: 'Please fill out name, email, and message.' }
    }

    const resendApiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.CONTACT_TO_EMAIL
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ?? 'Triple One Therapy <onboarding@resend.dev>'

    if (!resendApiKey) {
      return { ok: false, error: 'Server email config is missing (RESEND_API_KEY).' }
    }

    if (!toEmail) {
      return { ok: false, error: 'Server email config is missing (CONTACT_TO_EMAIL).' }
    }

    const subject = `New Contact Form Submission - ${name}`
    const text = [
      'New contact form submission',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      'Message:',
      message,
    ].join('\n')

    const html = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br />')}</p>
    `

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject,
        text,
        html,
        reply_to: email,
      }),
    })

    if (!response.ok) {
      const body = await response.text()
      return { ok: false, error: `Email send failed: ${body}` }
    }

    return { ok: true }
  },
)

function ContactPage() {
  const sendContact = useServerFn(submitContactForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ ok: boolean; error?: string } | null>(
    null,
  )

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setResult(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    const payload: ContactPayload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
      website: String(formData.get('website') ?? ''),
    }

    try {
      const response = await sendContact({ data: payload })
      setResult(response)
      if (response.ok) {
        form.reset()
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to send message.'
      setResult({ ok: false, error: message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <RouteSceneLayout scenes={scenes} initialSceneId="contact-intro">
      <main className="bg-transparent pt-20 text-stone-900">
        <section
          id="intro"
          data-route-background="contact-intro"
          className="section-anchor flex min-h-screen items-center px-6 py-24"
        >
          <div className="mx-auto w-full max-w-3xl">
            <div className="route-scene mb-10 text-center">
              <p className="mb-4 text-xs uppercase tracking-[0.24em] text-stone-500">
                Contact
              </p>
              <h1 className="mb-4 text-4xl font-semibold sm:text-5xl">
                Reach out to Triple One Therapy
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-700">
                Share a bit about what you are looking for and I will follow up
                within 1-2 business days.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="route-card space-y-5 rounded-2xl border border-stone-300 bg-stone-50/94 p-6 sm:p-8"
            >
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-stone-700">
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  required
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
                  name="email"
                  required
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
                  name="message"
                  required
                  className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500"
                  placeholder="How can I support you?"
                />
              </label>

              {result?.ok && (
                <p className="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  Message sent. I will get back to you soon.
                </p>
              )}

              {result && !result.ok && (
                <p className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
                  {result.error ?? 'Unable to send message. Please try again.'}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-stone-50 transition hover:bg-stone-700"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </section>
      </main>
    </RouteSceneLayout>
  )
}
