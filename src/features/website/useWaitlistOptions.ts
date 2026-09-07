import { useEffect, useState } from 'react'

import {
  subscribeToWaitlistOptions,
  WAITLIST_OPTIONS_FALLBACK,
  type WaitlistOptions,
} from './waitlist-options'

export function useWaitlistOptions() {
  const [options, setOptions] = useState<WaitlistOptions>(
    WAITLIST_OPTIONS_FALLBACK,
  )
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    return subscribeToWaitlistOptions(
      (nextOptions) => {
        setOptions(nextOptions)
        setIsLoading(false)
      },
      () => setIsLoading(false),
      () => setIsLoading(false),
    )
  }, [])

  return { ...options, isLoading }
}
