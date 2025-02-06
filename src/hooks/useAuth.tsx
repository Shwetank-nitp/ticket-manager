import { onAuthStateChanged, User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import app from '@/@services/AppInitialization/app'
import { user as userService } from '@/@services/FirebaseFireStore/user'
import { DocumentData } from 'firebase/firestore'

const useAuth = () => {
  const [user, setUser] = useState<DocumentData | null | undefined>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(app.getAuthInstance(), async (firebaseUser: User | null) => {
      if (firebaseUser) {
        const userData = await userService.getUserById(firebaseUser.uid)
        setUser(userData ? { ...userData, id: firebaseUser.uid } : null)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => {
      unsub()
      setLoading(true)
    }
  }, [])

  return {
    user,
    loading
  }
}

export default useAuth
