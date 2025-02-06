import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'
import appInstance from '../AppInitialization/app'
import { FirebaseStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { NewTicketType, Ticket } from '@/@core/types'

class FirebaseUser {
  dbInstance: Firestore
  storageInstance: FirebaseStorage
  constructor() {
    this.dbInstance = appInstance.getFirestoreInstance()
    this.storageInstance = appInstance.getFirebaseStorageInstance()
  }

  async create(username: string, email: string, id: string) {
    try {
      const newDocument = setDoc(doc(this.dbInstance, 'users', id), {
        username,
        email,
        role: 'user'
      })
      return newDocument
    } catch (error) {
      console.log('error in creating ', error)
      throw error
    }
  }

  async getUserById(id: string) {
    try {
      const userRef = doc(this.dbInstance, 'users', id)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        return userSnap.data()
      } else {
        return null
      }
    } catch (error) {
      console.log('error in creating', error)
    }
  }

  async createTicket(id: string, fields: NewTicketType) {
    try {
      // Create the document in Firestore
      const ticketsCollection = collection(this.dbInstance, 'tickets')

      // Add a new document with auto-generated ID
      const ticketRef = await addDoc(ticketsCollection, {
        ...fields,
        userId: id,
        assigned: 'none',
        status: 'pending',
        createdAt: new Date()
      })

      return ticketRef
    } catch (error) {
      console.error('Error creating document with attachments: ', error)
      throw error
    }
  }

  async deleteTicket(id: string) {
    try {
      const ticketRef = doc(this.dbInstance, 'tickets', id)
      await deleteDoc(ticketRef) // Delete the document
      console.log('Ticket deleted successfully!')
    } catch (error) {
      console.error('Error deleting ticket: ', error)
      throw error
    }
  }

  async getTicketById(id: string) {
    try {
      const ticketRef = doc(this.dbInstance, 'tickets', id)
      const ticketSnapshot = await getDoc(ticketRef) // Get the document snapshot

      if (ticketSnapshot.exists()) {
        return ticketSnapshot.data() // Return the document data
      } else {
        throw new Error('Ticket not found')
      }
    } catch (error) {
      console.error('Error fetching ticket: ', error)
      throw error
    }
  }

  async editTicket(id: string, updatedFields: Partial<Ticket>) {
    try {
      // Create a reference to the specific ticket document
      const ticketRef = doc(this.dbInstance, 'tickets', id)

      // Update the document with the new fields
      await updateDoc(ticketRef, {
        ...updatedFields,
        updatedAt: new Date() // Add update timestamp
      })

      console.log('Ticket updated successfully')
      return ticketRef
    } catch (error) {
      console.error('Error updating ticket: ', error)
      throw error
    }
  }

  async getAllTicket(userId: string) {
    try {
      // Get reference to tickets collection
      const ticketsCollection = collection(this.dbInstance, 'tickets')

      // Create query for tickets where userId matches
      const q = query(ticketsCollection, where('userId', '==', userId))

      // Execute the query
      const querySnapshot = await getDocs(q)

      // Map through documents and combine ID with data
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('Error fetching tickets: ', error)
      throw error
    }
  }
}

export const user = new FirebaseUser()
