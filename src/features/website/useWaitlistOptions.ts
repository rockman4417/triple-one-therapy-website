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

  useEffect(() => {
    return subscribeToWaitlistOptions(
      setOptions,
      () => undefined,
      () => undefined,
    )
  }, [])

  return options
}
