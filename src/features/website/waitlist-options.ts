import {
  doc,
  onSnapshot,
  updateDoc,
  type DocumentData,
  type Unsubscribe,
} from 'firebase/firestore'

import { config } from '@/config'
import { getFirebaseServices } from '@/lib/firebase'

export type WaitlistOptions = {
  waitlist_enabled: boolean
  waitlist_homepage_message: string
}

export type WaitlistOptionKey = keyof WaitlistOptions

export const WAITLIST_OPTIONS_FALLBACK: WaitlistOptions = {
  waitlist_enabled: config.waitlist_enabled,
  waitlist_homepage_message: config.waitlist_homepage_message,
}

const COLLECTION_NAME = 'website-collection'
const DOCUMENT_NAME = 'waitlist-options'

function waitlistOptionsDocument() {
  const { db } = getFirebaseServices()
  return doc(db, COLLECTION_NAME, DOCUMENT_NAME)
}

function parseWaitlistOptions(data: DocumentData): WaitlistOptions {
  return {
    waitlist_enabled:
      typeof data.waitlist_enabled === 'boolean'
        ? data.waitlist_enabled
        : WAITLIST_OPTIONS_FALLBACK.waitlist_enabled,
    waitlist_homepage_message:
      typeof data.waitlist_homepage_message === 'string'
        ? data.waitlist_homepage_message
        : WAITLIST_OPTIONS_FALLBACK.waitlist_homepage_message,
  }
}

export function subscribeToWaitlistOptions(
  onValue: (options: WaitlistOptions) => void,
  onMissing: () => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    waitlistOptionsDocument(),
    (snapshot) => {
      if (!snapshot.exists()) {
        onMissing()
        return
      }

      onValue(parseWaitlistOptions(snapshot.data()))
    },
    onError,
  )
}

export async function updateWaitlistOption<Key extends WaitlistOptionKey>(
  key: Key,
  value: WaitlistOptions[Key],
) {
  await updateDoc(waitlistOptionsDocument(), { [key]: value })
}
