import {
  doc,
  onSnapshot,
  updateDoc,
  type DocumentData,
  type Unsubscribe,
} from 'firebase/firestore'

import { getFirebaseServices } from '@/lib/firebase'
import websiteValuesFallback from '@/data/website-values-fallback.json'

export type WebsiteValues = {
  address_line_1: string
  city: string
  hourly_rate: number
  phone: number
  state: string
  support_email: string
  zip: number
}

export type WebsiteValueKey = keyof WebsiteValues

export const WEBSITE_VALUES_FALLBACK: WebsiteValues = websiteValuesFallback

const COLLECTION_NAME = 'website-collection'
const DOCUMENT_NAME = 'website-values'

function websiteValuesDocument() {
  const { db } = getFirebaseServices()
  return doc(db, COLLECTION_NAME, DOCUMENT_NAME)
}

function readString(
  data: DocumentData,
  key: 'address_line_1' | 'city' | 'state' | 'support_email',
) {
  return typeof data[key] === 'string'
    ? data[key]
    : WEBSITE_VALUES_FALLBACK[key]
}

function readNumber(
  data: DocumentData,
  key: 'hourly_rate' | 'phone' | 'zip',
) {
  return typeof data[key] === 'number' && Number.isFinite(data[key])
    ? data[key]
    : WEBSITE_VALUES_FALLBACK[key]
}

function parseWebsiteValues(data: DocumentData): WebsiteValues {
  return {
    address_line_1: readString(data, 'address_line_1'),
    city: readString(data, 'city'),
    hourly_rate: readNumber(data, 'hourly_rate'),
    phone: readNumber(data, 'phone'),
    state: readString(data, 'state'),
    support_email: readString(data, 'support_email'),
    zip: readNumber(data, 'zip'),
  }
}

export function subscribeToWebsiteValues(
  onValue: (values: WebsiteValues) => void,
  onMissing: () => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    websiteValuesDocument(),
    (snapshot) => {
      if (!snapshot.exists()) {
        onMissing()
        return
      }

      onValue(parseWebsiteValues(snapshot.data()))
    },
    onError,
  )
}

export async function updateWebsiteValue<Key extends WebsiteValueKey>(
  key: Key,
  value: WebsiteValues[Key],
) {
  await updateDoc(websiteValuesDocument(), { [key]: value })
}
