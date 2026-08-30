import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAoYdL41ANgGh1S8oNfAAmrtPf1o2Ngke8',
  authDomain: 'therapy-website-a9544.firebaseapp.com',
  projectId: 'therapy-website-a9544',
  storageBucket: 'therapy-website-a9544.firebasestorage.app',
  messagingSenderId: '47071119874',
  appId: '1:47071119874:web:639bca1d0f99047ce2751b',
}

export type FirebaseServices = {
  app: FirebaseApp
  auth: Auth
  db: Firestore
}

let services: FirebaseServices | undefined

export function getFirebaseServices(): FirebaseServices {
  if (typeof window === 'undefined') {
    throw new Error('Firebase client services are only available in the browser.')
  }

  if (!services) {
    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

    services = {
      app,
      auth: getAuth(app),
      db: getFirestore(app),
    }
  }

  return services
}
