// MUI imports
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import Checkbox from '@mui/material/Checkbox'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography
} from '@mui/material'

import PerfectScrollbar from 'react-perfect-scrollbar'

// types
import { NewTicketType } from '@/@core/types'

//Hooks
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { user } from '@/@services/FirebaseFireStore/user'
import useAuth from '@/hooks/useAuth'

interface RaiseTicketDialogboxProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

function RaiseTicketDialogbox({ open, setOpen }: RaiseTicketDialogboxProps) {
  // Hooks
  const [newTicket, setNewTicket] = useState<NewTicketType>({
    title: '',
    description: '',
    priority: 'medium',
    category: 'technical',
    contactEmail: '',
    phone: '',
    dueDate: '',
    issueType: 'bug',
    termsAccepted: false,
    subscriptionPlan: 'basic',
    browser: '',
    os: '',
    contactMethod: 'email',
    repeatIssue: false
  })
  const { user: authUser } = useAuth()

  const handleCreateTicket = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const formEntry: NewTicketType = {
      title: formData.get('title')?.toString() || '',
      description: formData.get('description')?.toString() || '',
      priority: (formData.get('priority')?.toString() as NewTicketType['priority']) || 'medium',
      category: (formData.get('category')?.toString() as NewTicketType['category']) || 'technical',
      contactEmail: formData.get('contactEmail')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      dueDate: formData.get('dueDate')?.toString() || '',
      issueType: (formData.get('issueType')?.toString() as NewTicketType['issueType']) || 'bug',
      termsAccepted: formData.get('termsAccepted') !== null, // Checkbox is present if checked
      subscriptionPlan: (formData.get('subscriptionPlan')?.toString() as NewTicketType['subscriptionPlan']) || 'basic',
      browser: (formData.get('browser')?.toString() as NewTicketType['browser']) || 'chrome',
      os: (formData.get('os')?.toString() as NewTicketType['os']) || 'windows',
      contactMethod: (formData.get('contactMethod')?.toString() as NewTicketType['contactMethod']) || 'email',
      repeatIssue: formData.get('repeatIssue') !== null // Checkbox is present if checked
    }

    try {
      if (formEntry.termsAccepted && authUser) {
        await user.createTicket(authUser.id, formEntry)
        setOpen(false)
      } else {
        alert('Accept terms and contition to continue')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      style={{
        minWidth: 'fit-content'
      }}
    >
      <DialogTitle>Ticket Details</DialogTitle>

      <form onSubmit={handleCreateTicket}>
        <DialogContent style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <PerfectScrollbar
            options={{
              suppressScrollX: true,
              wheelPropagation: false
            }}
            className='flex flex-col gap-4'
            style={{ maxHeight: 'calc(70vh - 64px)', padding: '0 16px' }}
          >
            <TextField
              name='title'
              autoFocus
              label='Title'
              fullWidth
              required
              value={newTicket.title}
              onChange={e => setNewTicket({ ...newTicket, title: e.target.value })}
            />

            <TextField
              name='description'
              label='Description'
              multiline
              rows={4}
              fullWidth
              required
              value={newTicket.description}
              onChange={e => setNewTicket({ ...newTicket, description: e.target.value })}
            />

            <div className='flex gap-4'>
              <TextField
                name='category'
                select
                label='Category'
                fullWidth
                value={newTicket.category}
                onChange={e => setNewTicket({ ...newTicket, category: e.target.value })}
              >
                <MenuItem value='technical'>Technical</MenuItem>
                <MenuItem value='billing'>Billing</MenuItem>
                <MenuItem value='sales'>Sales</MenuItem>
                <MenuItem value='general'>General</MenuItem>
              </TextField>

              <TextField
                name='priority'
                select
                label='Priority'
                fullWidth
                value={newTicket.priority}
                onChange={e => setNewTicket({ ...newTicket, priority: e.target.value as any })}
              >
                <MenuItem value='low'>Low</MenuItem>
                <MenuItem value='medium'>Medium</MenuItem>
                <MenuItem value='high'>High</MenuItem>
              </TextField>
            </div>

            <div className='flex gap-4'>
              <TextField
                name='contactEmail'
                label='Contact Email'
                type='email'
                fullWidth
                required
                value={newTicket.contactEmail}
                onChange={e => setNewTicket({ ...newTicket, contactEmail: e.target.value })}
              />

              <TextField
                name='phone'
                label='Phone Number'
                type='tel'
                fullWidth
                value={newTicket.phone}
                onChange={e => setNewTicket({ ...newTicket, phone: e.target.value })}
              />
            </div>

            <TextField
              name='dueDate'
              label='Due Date'
              type='date'
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={newTicket.dueDate}
              onChange={e => setNewTicket({ ...newTicket, dueDate: e.target.value })}
            />

            <FormControl component='fieldset'>
              <FormLabel component='legend'>Issue Type</FormLabel>
              <RadioGroup
                name='issueType'
                row
                value={newTicket.issueType}
                onChange={e => setNewTicket({ ...newTicket, issueType: e.target.value })}
              >
                <FormControlLabel value='bug' control={<Radio />} label='Bug' />
                <FormControlLabel value='feature' control={<Radio />} label='Feature Request' />
                <FormControlLabel value='other' control={<Radio />} label='Other' />
              </RadioGroup>
            </FormControl>

            <div className='flex gap-4'>
              <TextField
                select
                name='subscriptionPlan'
                label='Subscription Plan'
                fullWidth
                value={newTicket.subscriptionPlan}
                onChange={e => setNewTicket({ ...newTicket, subscriptionPlan: e.target.value })}
              >
                <MenuItem value='basic'>Basic</MenuItem>
                <MenuItem value='pro'>Pro</MenuItem>
                <MenuItem value='enterprise'>Enterprise</MenuItem>
              </TextField>

              <TextField
                select
                name='browser'
                label='Browser Used'
                fullWidth
                value={newTicket.browser}
                onChange={e => setNewTicket({ ...newTicket, browser: e.target.value })}
              >
                <MenuItem value='chrome'>Chrome</MenuItem>
                <MenuItem value='firefox'>Firefox</MenuItem>
                <MenuItem value='safari'>Safari</MenuItem>
                <MenuItem value='edge'>Edge</MenuItem>
              </TextField>

              <TextField
                select
                name='os'
                label='Operating System'
                fullWidth
                value={newTicket.os}
                onChange={e => setNewTicket({ ...newTicket, os: e.target.value })}
              >
                <MenuItem value='windows'>Windows</MenuItem>
                <MenuItem value='macos'>MacOS</MenuItem>
                <MenuItem value='linux'>Linux</MenuItem>
                <MenuItem value='other'>Other</MenuItem>
              </TextField>
            </div>

            <FormControl component='fieldset'>
              <FormLabel component='legend'>Preferred Contact Method</FormLabel>
              <RadioGroup
                name='contactMethod'
                row
                value={newTicket.contactMethod}
                onChange={e => setNewTicket({ ...newTicket, contactMethod: e.target.value })}
              >
                <FormControlLabel value='email' control={<Radio />} label='Email' />
                <FormControlLabel value='phone' control={<Radio />} label='Phone' />
                <FormControlLabel value='both' control={<Radio />} label='Both' />
              </RadioGroup>
            </FormControl>

            <div className='flex gap-4'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newTicket.repeatIssue}
                    onChange={e => setNewTicket({ ...newTicket, repeatIssue: e.target.checked })}
                  />
                }
                label='Repeat Issue'
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name='termsAccepted'
                    required
                    checked={newTicket.termsAccepted}
                    onChange={e => setNewTicket({ ...newTicket, termsAccepted: e.target.checked })}
                  />
                }
                label='Accept Terms & Conditions'
              />
            </div>
          </PerfectScrollbar>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant='contained' type='submit'>
            Create Ticket
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default RaiseTicketDialogbox
