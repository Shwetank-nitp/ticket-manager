import { doc, Firestore, getDoc, setDoc } from 'firebase/firestore'
import appInstance from '../AppInitialization/app'
import { Ticket } from '@/@core/types'

class FirebaseAgent {
  dbInstance: Firestore

  constructor() {
    this.dbInstance = appInstance.getFirestoreInstance()
  }

  async create(email: string, id: string) {
    try {
      const newDocument = await setDoc(doc(this.dbInstance, 'users', id), {
        email,
        role: 'agent'
      })
      return newDocument
    } catch (error) {
      console.log('error : cannot create a new agent document')
      throw error
    }
  }

  async getTicketById(id: string) {
    try {
      const ticketRef = doc(this.dbInstance, 'users', id)
      const ticketSnapshot = await getDoc(ticketRef)
      if (ticketSnapshot.exists()) {
        return ticketSnapshot.data()
      } else {
        throw new Error('Ticket not found')
      }
    } catch (error) {
      console.error('Error fetching ticket: ', error)
      throw error
    }
  }

  async updateTicket(id: string, updateData: Partial<Ticket>) {
    try {
      const ticketRef = doc(this.dbInstance, 'tickets', id)
      await setDoc(
        ticketRef,
        {
          ...updateData,
          updatedAt: new Date()
        },
        { merge: true }
      )
    } catch (error) {
      console.error('Error updating ticket:', error)
      throw error
    }
  }
}

export const agent = new FirebaseAgent()
