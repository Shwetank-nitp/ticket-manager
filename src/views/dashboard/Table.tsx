'use client'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import PerfectScrollbar from 'react-perfect-scrollbar'

// Icons Imports
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AddIcon from '@mui/icons-material/Add'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'
import { useEffect, useState } from 'react'
import RaiseTicketDialogbox from './RaiseTicketDialogbox'
import { Ticket } from '@/@core/types'

import { user as userStore } from '@/@services/FirebaseFireStore/user'
import useAuth from '@/hooks/useAuth'

import app from '@/@services/AppInitialization/app'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import EditTicketDialogbox from '@/components/EditDialog'
import ViewTicketDialogbox from '@/components/ViewTicketDialog'
import useCustomerTickets from '@/hooks/useCustomer'
import useAgentTicket from '@/hooks/useAgent'
import useCustomer from '@/hooks/useCustomer'
import useAgent from '@/hooks/useAgent'
import AgentEditerBox from '@/components/AgentEditBox'

const SupportDashboard = () => {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const [openEdit, setOpenEdit] = useState(false)
  const [ticketEdit, setTicketEdit] = useState<Ticket | null | undefined>(null)
  const [openView, setOpenView] = useState(false)

  const { tickets: userTickets } = useCustomer(user)
  const { tickets: agentTickets } = useAgent()

  let tickets: Ticket[] | null | undefined
  if (user) {
    tickets = user.role === 'user' ? userTickets : agentTickets
  }

  const D = async (id: string) => {
    try {
      await userStore.deleteTicket(id)
    } catch (error) {
      console.error(error)
    }
  }

  const E = (id: string) => {
    setOpenEdit(true)
    setTicketEdit(tickets?.find(ticket => ticket.id === id))
  }

  const V = (id: string) => {
    setOpenView(true)
    setTicketEdit(tickets?.find(ticket => ticket.id === id))
  }

  return (
    <>
      <Card className='m-4'>
        <div className='flex justify-between items-center p-4'>
          <Typography variant='h5'>Support Tickets</Typography>
          {user && user.role === 'user' && (
            <Button variant='contained' startIcon={<AddIcon />} onClick={() => setOpen(true)}>
              Create Ticket
            </Button>
          )}
        </div>
        <div className='overflow-x-auto'>
          <PerfectScrollbar
            options={{
              suppressScrollY: true,
              wheelPropagation: false
            }}
            className='flex flex-col gap-4'
            style={{ maxHeight: 'calc(70vh - 64px)', padding: '0 16px' }}
          >
            <table className={tableStyles.table}>
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Created By</th>
                  <th>Assigned To</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets?.map(ticket => (
                  <tr key={ticket.id + '!'}>
                    <td>{ticket.id}</td>
                    <td className='font-medium'>{ticket.title}</td>
                    <td>
                      <Typography noWrap sx={{ maxWidth: '200px' }}>
                        {ticket.description}
                      </Typography>
                    </td>
                    <td>
                      <Chip
                        label={ticket.priority}
                        variant='tonal'
                        color={
                          ticket.priority === 'high' ? 'error' : ticket.priority === 'medium' ? 'warning' : 'success'
                        }
                        size='small'
                      />
                    </td>
                    <td>
                      <Chip
                        label={ticket.status}
                        variant='tonal'
                        color={
                          ticket.status === 'open' ? 'success' : ticket.status === 'pending' ? 'warning' : 'secondary'
                        }
                        size='small'
                      />
                    </td>
                    <td>{ticket.contactEmail}</td>
                    <td>{ticket.assigned === 'none' ? 'Unassigned' : ticket.assigned}</td>
                    <td>
                      <IconButton onClick={() => V(ticket.id)}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          E(ticket.id)
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      {user && user?.role === 'user' && (
                        <IconButton onClick={() => D(ticket.id)}>
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PerfectScrollbar>
        </div>
      </Card>
      {/* Create Ticket Modal */}
      <RaiseTicketDialogbox open={open} setOpen={setOpen} />
      {ticketEdit && user?.role === 'user' && (
        <EditTicketDialogbox ticket={ticketEdit} open={openEdit} setOpen={setOpenEdit} />
      )}
      {ticketEdit && <ViewTicketDialogbox ticket={ticketEdit} open={openView} setOpen={setOpenView} />}
      {ticketEdit && user?.role === 'agent' && (
        <AgentEditerBox ticket={ticketEdit} open={openEdit} setOpen={setOpenEdit} />
      )}
    </>
  )
}

export default SupportDashboard
