import { Ticket } from '@/@core/types'
import app from '@/@services/AppInitialization/app'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const useAgent = () => {
  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(() => {
    const coll = collection(app.getFirestoreInstance(), 'tickets')

    const unsubscribe = onSnapshot(coll, snapshot => {
      const ticketsData: Ticket[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Ticket[]
      setTickets(ticketsData)
    })

    return () => unsubscribe()
  }, [])

  return { tickets }
}

export default useAgent
