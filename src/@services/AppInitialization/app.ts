import { initializeApp, type FirebaseApp as FirebaseType } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getStorage, type FirebaseStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
}

class FirebaseApp {
  private static instance: FirebaseApp
  private app: FirebaseType
  private auth: Auth
  private db: Firestore
  private store: FirebaseStorage

  private constructor() {
    this.app = initializeApp(firebaseConfig)
    this.auth = getAuth(this.app)
    this.db = getFirestore(this.app)
    this.store = getStorage(this.app)
  }

  public static getInstance(): FirebaseApp {
    if (!FirebaseApp.instance) {
      FirebaseApp.instance = new FirebaseApp()
    }
    return FirebaseApp.instance
  }

  public getAuthInstance(): Auth {
    return this.auth
  }

  public getFirestoreInstance(): Firestore {
    return this.db
  }

  public getFirebaseStorageInstance(): FirebaseStorage {
    return this.store
  }
}

export default FirebaseApp.getInstance()
