export function AuthLoadingScreen() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#ede8d1] px-6 text-[#3c3629]">
      <div className="flex items-center gap-3" role="status" aria-live="polite">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#3c3629]/25 border-t-[#3c3629]" />
        <span className="text-sm uppercase tracking-[0.2em]">
          Checking your session
        </span>
      </div>
    </main>
  )
}
