import { useEffect, useState } from 'react'

import {
  subscribeToWebsiteValues,
  WEBSITE_VALUES_FALLBACK,
  type WebsiteValues,
} from './website-values'

export function useWebsiteValues() {
  const [values, setValues] = useState<WebsiteValues>(WEBSITE_VALUES_FALLBACK)

  useEffect(() => {
    return subscribeToWebsiteValues(
      setValues,
      () => undefined,
      () => undefined,
    )
  }, [])

  return values
}
