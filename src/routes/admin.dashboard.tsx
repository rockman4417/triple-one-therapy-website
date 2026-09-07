import { Link, createFileRoute } from '@tanstack/react-router'
import { AlertCircle, Check, Globe2, LogOut, Save } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'

import { useAuth } from '@/components/auth/AuthProvider'
import {
  subscribeToWebsiteValues,
  updateWebsiteValue,
  type WebsiteValueKey,
  type WebsiteValues,
} from '@/features/website/website-values'
import {
  subscribeToWaitlistOptions,
  updateWaitlistOption,
  type WaitlistOptions,
} from '@/features/website/waitlist-options'

export const Route = createFileRoute('/admin/dashboard')({
  component: AdminDashboard,
})

type FieldDefinition<Key extends WebsiteValueKey = WebsiteValueKey> = {
  key: Key
  label: string
  description: string
  inputMode?: 'decimal' | 'numeric' | 'tel' | 'text'
  maxLength?: number
  sanitize?: (value: string) => string
  type?: 'email' | 'number' | 'text' | 'tel'
  parse: (value: string) =>
    | { value: WebsiteValues[Key]; error?: never }
    | { value?: never; error: string }
}

function digitsOnly(maxLength: number) {
  return (value: string) => value.replace(/\D/g, '').slice(0, maxLength)
}

function requiredText(
  label: string,
  options: { min: number; max: number; pattern?: RegExp; patternMessage?: string },
) {
  return (input: string) => {
    const value = input.trim()

    if (value.length < options.min || value.length > options.max) {
      return {
        error: `${label} must be between ${options.min} and ${options.max} characters.`,
      }
    }

    if (options.pattern && !options.pattern.test(value)) {
      return { error: options.patternMessage ?? `${label} is not valid.` }
    }

    return { value }
  }
}

const FIELD_DEFINITIONS: FieldDefinition[] = [
  {
    key: 'address_line_1',
    label: 'Street address',
    description: 'The primary street address shown on the website.',
    inputMode: 'text',
    parse: requiredText('Street address', { min: 5, max: 120 }),
  },
  {
    key: 'city',
    label: 'City',
    description: 'The city shown with the practice address.',
    inputMode: 'text',
    parse: requiredText('City', {
      min: 2,
      max: 80,
      pattern: /^[\p{L} .'-]+$/u,
      patternMessage: 'City contains unsupported characters.',
    }),
  },
  {
    key: 'state',
    label: 'State',
    description: 'Use the two-letter state abbreviation.',
    inputMode: 'text',
    parse: (input) => {
      const value = input.trim().toUpperCase()
      return /^[A-Z]{2}$/.test(value)
        ? { value }
        : { error: 'State must be a two-letter abbreviation, such as TX.' }
    },
  },
  {
    key: 'zip',
    label: 'ZIP code',
    description: 'A five-digit ZIP code.',
    inputMode: 'numeric',
    maxLength: 5,
    sanitize: digitsOnly(5),
    parse: (input) =>
      /^\d{5}$/.test(input.trim())
        ? { value: Number(input.trim()) }
        : { error: 'ZIP code must contain exactly five digits.' },
  },
  {
    key: 'phone',
    label: 'Phone number',
    description: 'A ten-digit US phone number.',
    inputMode: 'tel',
    maxLength: 10,
    sanitize: digitsOnly(10),
    type: 'tel',
    parse: (input) => {
      const digits = input.replace(/\D/g, '')
      return digits.length === 10
        ? { value: Number(digits) }
        : { error: 'Phone number must contain exactly ten digits.' }
    },
  },
  {
    key: 'support_email',
    label: 'Support email',
    description: 'The public contact email shown on the website.',
    inputMode: 'text',
    maxLength: 254,
    type: 'email',
    parse: (input) => {
      const value = input.trim()
      const isValid =
        value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)

      return isValid
        ? { value }
        : { error: 'Enter a valid email address.' }
    },
  },
  {
    key: 'hourly_rate',
    label: 'Hourly rate',
    description: 'The session rate in whole US dollars.',
    inputMode: 'numeric',
    maxLength: 5,
    sanitize: digitsOnly(5),
    parse: (input) => {
      const value = Number(input)
      return Number.isInteger(value) && value >= 1 && value <= 10_000
        ? { value }
        : { error: 'Hourly rate must be a whole number between 1 and 10,000.' }
    },
  },
]

function formatFirestoreError(error: Error) {
  if (error.message.includes('permission')) {
    return 'Firebase denied access. Check the Firestore security rules for authenticated users.'
  }

  return 'Unable to load the settings from Firestore. Please try again.'
}

function FieldEditor({
  definition,
  value,
}: {
  definition: FieldDefinition
  value: WebsiteValues[WebsiteValueKey]
}) {
  const persistedValue = String(value)
  const [draft, setDraft] = useState(persistedValue)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    setDraft(persistedValue)
  }, [persistedValue])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSaved(false)

    const result = definition.parse(draft)
    if (result.error !== undefined) {
      setError(result.error)
      return
    }

    if (result.value === undefined) {
      setError('This value is not valid.')
      return
    }

    setIsSaving(true)
    try {
      await updateWebsiteValue(definition.key, result.value)
      setDraft(String(result.value))
      setIsSaved(true)
    } catch {
      setError('Unable to save this value. Check your connection and try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const inputId = `website-value-${definition.key}`
  const hasChanges = draft !== persistedValue

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[#3c3629]/15 bg-white/40 p-5 shadow-sm sm:p-6"
    >
      <label htmlFor={inputId} className="block text-base font-medium">
        {definition.label}
      </label>
      <p className="mt-1 min-h-10 text-sm leading-5 text-[#3c3629]/60">
        {definition.description}
      </p>
      <input
        id={inputId}
        name={definition.key}
        type={definition.type ?? 'text'}
        inputMode={definition.inputMode}
        maxLength={definition.maxLength}
        min={definition.key === 'hourly_rate' ? 1 : undefined}
        max={definition.key === 'hourly_rate' ? 10_000 : undefined}
        step={definition.key === 'hourly_rate' ? 1 : undefined}
        required
        value={draft}
        onChange={(event) => {
          const nextValue = definition.sanitize
            ? definition.sanitize(event.target.value)
            : event.target.value
          setDraft(nextValue)
          setError(null)
          setIsSaved(false)
        }}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className="mt-4 w-full rounded-xl border border-[#3c3629]/20 bg-[#fffdf8]/80 px-4 py-3 outline-none transition focus:border-[#3c3629]/55 focus:ring-2 focus:ring-[#3c3629]/10"
      />

      {error ? (
        <p
          id={`${inputId}-error`}
          className="mt-3 flex items-start gap-2 text-sm text-red-800"
          role="alert"
        >
          <AlertCircle className="mt-0.5 shrink-0" size={15} />
          {error}
        </p>
      ) : null}

      <div className="mt-4 flex min-h-10 items-center justify-between gap-3">
        <span
          className={`flex items-center gap-1.5 text-sm text-emerald-800 transition-opacity ${
            isSaved ? 'opacity-100' : 'opacity-0'
          }`}
          aria-live="polite"
        >
          <Check size={15} /> Saved
        </span>
        <button
          type="submit"
          disabled={isSaving || !hasChanges}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3c3629] px-5 py-2.5 text-sm font-medium text-[#f6f0e1] transition hover:bg-[#514938] disabled:cursor-not-allowed disabled:opacity-45"
        >
          <Save size={15} />
          {isSaving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </form>
  )
}

function WaitlistSettings({ options }: { options: WaitlistOptions }) {
  const persistedMessage = options.waitlist_homepage_message
  const [isEnabled, setIsEnabled] = useState(options.waitlist_enabled)
  const [message, setMessage] = useState(persistedMessage)
  const [toggleError, setToggleError] = useState<string | null>(null)
  const [messageError, setMessageError] = useState<string | null>(null)
  const [isSavingToggle, setIsSavingToggle] = useState(false)
  const [isSavingMessage, setIsSavingMessage] = useState(false)
  const [isMessageSaved, setIsMessageSaved] = useState(false)

  useEffect(() => {
    setIsEnabled(options.waitlist_enabled)
  }, [options.waitlist_enabled])

  useEffect(() => {
    setMessage(persistedMessage)
  }, [persistedMessage])

  async function handleToggle(nextValue: boolean) {
    const previousValue = isEnabled
    setIsEnabled(nextValue)
    setToggleError(null)
    setIsSavingToggle(true)

    try {
      await updateWaitlistOption('waitlist_enabled', nextValue)
    } catch {
      setIsEnabled(previousValue)
      setToggleError(
        'Unable to update the waitlist. Check your connection and try again.',
      )
    } finally {
      setIsSavingToggle(false)
    }
  }

  async function handleMessageSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessageError(null)
    setIsMessageSaved(false)

    const value = message.trim()
    if (value.length < 1 || value.length > 300) {
      setMessageError(
        'The homepage message must be between 1 and 300 characters.',
      )
      return
    }

    setIsSavingMessage(true)
    try {
      await updateWaitlistOption('waitlist_homepage_message', value)
      setMessage(value)
      setIsMessageSaved(true)
    } catch {
      setMessageError(
        'Unable to save the homepage message. Check your connection and try again.',
      )
    } finally {
      setIsSavingMessage(false)
    }
  }

  return (
    <div className="mt-7 grid gap-5 md:grid-cols-2">
      <div className="rounded-2xl border border-[#3c3629]/15 bg-white/40 p-5 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="text-base font-medium">Waitlist enabled</h3>
            <p className="mt-1 text-sm leading-5 text-[#3c3629]/60">
              Switch public calls to action from booking to the waitlist.
            </p>
          </div>
          <label className="relative mt-1 inline-flex shrink-0 cursor-pointer items-center has-[:disabled]:cursor-wait">
            <span className="sr-only">Enable waitlist</span>
            <input
              type="checkbox"
              className="peer sr-only"
              checked={isEnabled}
              disabled={isSavingToggle}
              onChange={(event) => void handleToggle(event.target.checked)}
            />
            <span className="h-7 w-12 rounded-full bg-[#3c3629]/20 transition peer-checked:bg-[#3c3629] peer-focus-visible:ring-2 peer-focus-visible:ring-[#3c3629]/30 peer-focus-visible:ring-offset-2 peer-disabled:cursor-wait peer-disabled:opacity-60 after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:after:translate-x-5" />
          </label>
        </div>
        <p className="mt-6 text-sm font-medium" aria-live="polite">
          {isSavingToggle
            ? 'Saving…'
            : isEnabled
              ? 'Waitlist is active'
              : 'Online booking is active'}
        </p>
        {toggleError ? (
          <p
            className="mt-3 flex items-start gap-2 text-sm text-red-800"
            role="alert"
          >
            <AlertCircle className="mt-0.5 shrink-0" size={15} />
            {toggleError}
          </p>
        ) : null}
      </div>

      <form
        onSubmit={handleMessageSubmit}
        className="rounded-2xl border border-[#3c3629]/15 bg-white/40 p-5 shadow-sm sm:p-6"
      >
        <label
          htmlFor="waitlist-homepage-message"
          className="block text-base font-medium"
        >
          Homepage message
        </label>
        <p className="mt-1 text-sm leading-5 text-[#3c3629]/60">
          Shown above the waitlist button when the waitlist is enabled.
        </p>
        <textarea
          id="waitlist-homepage-message"
          name="waitlist_homepage_message"
          rows={4}
          maxLength={300}
          required
          value={message}
          onChange={(event) => {
            setMessage(event.target.value)
            setMessageError(null)
            setIsMessageSaved(false)
          }}
          aria-invalid={messageError ? true : undefined}
          aria-describedby={
            messageError ? 'waitlist-homepage-message-error' : undefined
          }
          className="mt-4 w-full resize-y rounded-xl border border-[#3c3629]/20 bg-[#fffdf8]/80 px-4 py-3 leading-6 outline-none transition focus:border-[#3c3629]/55 focus:ring-2 focus:ring-[#3c3629]/10"
        />
        <div className="mt-1 flex justify-between text-xs text-[#3c3629]/50">
          <span>Required</span>
          <span>{message.length}/300</span>
        </div>

        {messageError ? (
          <p
            id="waitlist-homepage-message-error"
            className="mt-3 flex items-start gap-2 text-sm text-red-800"
            role="alert"
          >
            <AlertCircle className="mt-0.5 shrink-0" size={15} />
            {messageError}
          </p>
        ) : null}

        <div className="mt-4 flex min-h-10 items-center justify-between gap-3">
          <span
            className={`flex items-center gap-1.5 text-sm text-emerald-800 transition-opacity ${
              isMessageSaved ? 'opacity-100' : 'opacity-0'
            }`}
            aria-live="polite"
          >
            <Check size={15} /> Saved
          </span>
          <button
            type="submit"
            disabled={isSavingMessage || message === persistedMessage}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3c3629] px-5 py-2.5 text-sm font-medium text-[#f6f0e1] transition hover:bg-[#514938] disabled:cursor-not-allowed disabled:opacity-45"
          >
            <Save size={15} />
            {isSavingMessage ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}

function AdminDashboard() {
  const { user, signOut } = useAuth()
  const [values, setValues] = useState<WebsiteValues | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [waitlistOptions, setWaitlistOptions] =
    useState<WaitlistOptions | null>(null)
  const [waitlistLoadError, setWaitlistLoadError] = useState<string | null>(null)

  useEffect(() => {
    return subscribeToWebsiteValues(
      (nextValues) => {
        setValues(nextValues)
        setLoadError(null)
      },
      () => {
        setLoadError(
          'The Firestore document website-collection/website-values does not exist.',
        )
      },
      (error) => setLoadError(formatFirestoreError(error)),
    )
  }, [])

  useEffect(() => {
    return subscribeToWaitlistOptions(
      (nextOptions) => {
        setWaitlistOptions(nextOptions)
        setWaitlistLoadError(null)
      },
      () => {
        setWaitlistLoadError(
          'The Firestore document website-collection/waitlist-options does not exist.',
        )
      },
      (error) => setWaitlistLoadError(formatFirestoreError(error)),
    )
  }, [])

  return (
    <main className="min-h-screen bg-[#ede8d1] px-6 py-10 text-[#3c3629] sm:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-5 border-b border-[#3c3629]/20 pb-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#3c3629]/65">
              Triple One Therapy
            </p>
            <h1 className="mt-2 text-3xl font-medium">Website settings</h1>
            <p className="mt-2 text-sm text-[#3c3629]/70">
              Signed in as {user?.email ?? user?.displayName ?? 'Administrator'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 self-start">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#3c3629]/25 px-5 py-2.5 text-sm font-medium transition hover:bg-white/45"
            >
              <Globe2 size={16} />
              Go to website
            </Link>
            <button
              type="button"
              onClick={() => void signOut()}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#3c3629]/25 px-5 py-2.5 text-sm font-medium transition hover:bg-[#3c3629] hover:text-[#ede8d1]"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        </header>

        <section className="mt-10">
          <div>
            <h2 className="text-xl font-medium">Contact and pricing</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#3c3629]/65">
              Each setting is saved independently to Firestore. Changes from
              another signed-in session will appear here automatically.
            </p>
          </div>

          {loadError ? (
            <div
              className="mt-7 flex items-start gap-3 rounded-2xl border border-red-900/20 bg-red-950/8 p-5 text-red-900"
              role="alert"
            >
              <AlertCircle className="mt-0.5 shrink-0" size={18} />
              <p>{loadError}</p>
            </div>
          ) : null}

          {!values && !loadError ? (
            <div className="mt-10 flex items-center gap-3" role="status">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#3c3629]/25 border-t-[#3c3629]" />
              <span className="text-sm uppercase tracking-[0.2em]">
                Loading website values
              </span>
            </div>
          ) : null}

          {values ? (
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {FIELD_DEFINITIONS.map((definition) => (
                <FieldEditor
                  key={definition.key}
                  definition={definition}
                  value={values[definition.key]}
                />
              ))}
            </div>
          ) : null}
        </section>

        <section className="mt-12 border-t border-[#3c3629]/20 pt-10">
          <div>
            <h2 className="text-xl font-medium">Waitlist</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#3c3629]/65">
              Control whether the site sends visitors to the waitlist and edit
              the message shown on the homepage.
            </p>
          </div>

          {waitlistLoadError ? (
            <div
              className="mt-7 flex items-start gap-3 rounded-2xl border border-red-900/20 bg-red-950/8 p-5 text-red-900"
              role="alert"
            >
              <AlertCircle className="mt-0.5 shrink-0" size={18} />
              <p>{waitlistLoadError}</p>
            </div>
          ) : null}

          {!waitlistOptions && !waitlistLoadError ? (
            <div className="mt-10 flex items-center gap-3" role="status">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#3c3629]/25 border-t-[#3c3629]" />
              <span className="text-sm uppercase tracking-[0.2em]">
                Loading waitlist options
              </span>
            </div>
          ) : null}

          {waitlistOptions ? (
            <WaitlistSettings options={waitlistOptions} />
          ) : null}
        </section>
      </div>
    </main>
  )
}
