import { Auth as AuthType, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import appInstance from '../AppInitialization/app'
import Cookie from 'js-cookie'

class Auth {
  auth: AuthType
  constructor() {
    const app = appInstance
    this.auth = app.getAuthInstance()
  }

  async signup(email: string, password: string) {
    try {
      const credentials = await createUserWithEmailAndPassword(this.auth, email, password)
      Cookie.set('id', credentials.user.uid)
      return credentials
    } catch (error) {
      console.log('error: signup failed', error)
      throw error
    }
  }

  async signin(email: string, password: string) {
    try {
      const credentials = await signInWithEmailAndPassword(this.auth, email, password)
      Cookie.set('id', credentials.user.uid)
      return credentials
    } catch (error) {
      console.log('error: signin failed', error)
      throw error
    }
  }

  async signout() {
    try {
      await signOut(this.auth)
      Cookie.remove('id')
    } catch (error) {
      console.log('error in signout :', error)
      throw error
    }
  }
}

export const auth = new Auth()
