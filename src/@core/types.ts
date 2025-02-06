// React Imports
import type { ReactNode } from 'react'

export type Skin = 'default' | 'bordered'

export type Mode = 'light' | 'dark'

export type SystemMode = 'light' | 'dark'

export type Direction = 'ltr' | 'rtl'

export type ChildrenType = {
  children: ReactNode
}

export type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

export type NewTicketType = {
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  category: string
  contactEmail: string
  phone: string
  dueDate: string
  issueType: string
  termsAccepted: boolean
  subscriptionPlan: string
  browser: string
  os: string
  contactMethod: string
  repeatIssue: boolean
}

export interface Ticket extends Omit<NewTicketType, 'dueDate' | 'contactMethod'> {
  assigned: string | 'none'
  id: string
  status: string
}
