import { FirebaseError } from 'firebase/app'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Globe2 } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'

import { AuthLoadingScreen } from '@/components/auth/AuthLoadingScreen'
import { useAuth } from '@/components/auth/AuthProvider'

type LoginSearch = {
  redirect?: string
}

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect:
      typeof search.redirect === 'string' && search.redirect.startsWith('/admin')
        ? search.redirect
        : undefined,
  }),
  component: LoginPage,
})

function getSignInError(error: unknown) {
  if (!(error instanceof FirebaseError)) {
    return 'Unable to sign in. Please try again.'
  }

  switch (error.code) {
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'The email or password is incorrect.'
    case 'auth/popup-closed-by-user':
      return 'Google sign-in was cancelled.'
    case 'auth/popup-blocked':
      return 'Your browser blocked the Google sign-in window.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.'
    default:
      return 'Unable to sign in. Please try again.'
  }
}

function LoginPage() {
  const { user, isLoading, signInWithEmail, signInWithGoogle } = useAuth()
  const { redirect } = Route.useSearch()
  const navigate = Route.useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isLoading && user) {
      void navigate({ to: redirect ?? '/admin/dashboard', replace: true })
    }
  }, [isLoading, navigate, redirect, user])

  if (isLoading || user) {
    return <AuthLoadingScreen />
  }

  async function handleEmailSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await signInWithEmail(email.trim(), password)
    } catch (signInError) {
      setError(getSignInError(signInError))
      setIsSubmitting(false)
    }
  }

  async function handleGoogleSignIn() {
    setError(null)
    setIsSubmitting(true)

    try {
      await signInWithGoogle()
    } catch (signInError) {
      setError(getSignInError(signInError))
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#ede8d1] px-6 py-12 text-[#3c3629]">
      <section className="w-full max-w-md rounded-3xl border border-[#3c3629]/15 bg-white/40 p-8 shadow-xl shadow-[#3c3629]/5 backdrop-blur sm:p-10">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-[#3c3629]/60">
          Triple One Therapy
        </p>
        <h1 className="mt-3 text-center text-3xl font-medium">Admin sign in</h1>
        <p className="mt-3 text-center text-sm leading-6 text-[#3c3629]/65">
          Sign in with an existing administrator account.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleEmailSignIn}>
          <label className="block text-sm font-medium">
            Email
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-[#3c3629]/20 bg-[#fffdf8]/80 px-4 py-3 outline-none transition focus:border-[#3c3629]/55 focus:ring-2 focus:ring-[#3c3629]/10"
            />
          </label>
          <label className="block text-sm font-medium">
            Password
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-[#3c3629]/20 bg-[#fffdf8]/80 px-4 py-3 outline-none transition focus:border-[#3c3629]/55 focus:ring-2 focus:ring-[#3c3629]/10"
            />
          </label>

          {error ? (
            <p className="rounded-xl bg-red-950/8 px-4 py-3 text-sm text-red-900" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-[#3c3629] px-5 py-3 font-medium text-[#f6f0e1] transition hover:bg-[#514938] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-[0.18em] text-[#3c3629]/45">
          <span className="h-px flex-1 bg-[#3c3629]/15" />
          or
          <span className="h-px flex-1 bg-[#3c3629]/15" />
        </div>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => void handleGoogleSignIn()}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-[#3c3629]/20 bg-white/55 px-5 py-3 font-medium transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="text-lg font-semibold text-[#4285f4]">G</span>
          Continue with Google
        </button>

        <p className="mt-7 text-center text-xs leading-5 text-[#3c3629]/50">
          Accounts are managed by the site administrator. New accounts cannot be
          created here.
        </p>

        <div className="mt-7 border-t border-[#3c3629]/15 pt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[#3c3629]/75 transition hover:bg-white/55 hover:text-[#3c3629]"
          >
            <Globe2 size={16} />
            Go to website
          </Link>
        </div>
      </section>
    </main>
  )
}
