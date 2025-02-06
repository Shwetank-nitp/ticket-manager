import { Ticket } from '@/@core/types'
import { useEffect, useState } from 'react'
import { collection, DocumentData, onSnapshot, query, where } from 'firebase/firestore'
import app from '@/@services/AppInitialization/app'

const useCustomer = (user: DocumentData | null | undefined) => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  useEffect(() => {
    if (!user) return

    const db = app.getFirestoreInstance()
    const ticketsCollection = collection(db, 'tickets')
    const q = query(ticketsCollection, where('userId', '==', user.id))

    const unsub = onSnapshot(q, snapshot => {
      const ticketsData: Ticket[] = snapshot.docs.map(
        doc =>
          ({
            id: doc.id,
            ...doc.data()
          }) as Ticket
      )
      setTickets(ticketsData)
    })

    return () => unsub()
  }, [user])

  return {
    tickets
  }
}

export default useCustomer
