'use client'

// React Imports
import { useState } from 'react'
import type { ChangeEvent } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// Types
import type { NewTicketType, Ticket } from '@/@core/types'
import { user } from '@/@services/FirebaseFireStore/user'

interface EditTicketDialogboxProps {
  open: boolean
  setOpen: (open: boolean) => void
  ticket: Ticket
}

const EditTicketDialogbox = ({ open, setOpen, ticket }: EditTicketDialogboxProps) => {
  // States
  const [ticketData, setTicketData] = useState<Ticket>(ticket)

  const handleFormChange = (field: keyof Ticket, value: any) => {
    setTicketData(prev => ({ ...prev, [field]: value }))
  }

  const handleUpdate = async (e: React.FormEvent) => {
    try {
      e.preventDefault()

      await user.editTicket(ticket.id, ticketData)

      console.log('Updated ticket:', ticketData)
    } catch (error) {
      console.error(error)
    } finally {
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='md'>
      <DialogTitle>Edit Ticket Details</DialogTitle>
      <DialogContent>
        <form onSubmit={handleUpdate}>
          <Grid container spacing={5} className='pbe-5'>
            <Grid item xs={12} sm={6}>
              <TextField
                name='title'
                fullWidth
                label='Title'
                value={ticketData.title}
                required
                onChange={e => handleFormChange('title', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  name='priority'
                  value={ticketData.priority}
                  label='Priority'
                  onChange={e => handleFormChange('priority', e.target.value)}
                >
                  <MenuItem value='low'>Low</MenuItem>
                  <MenuItem value='medium'>Medium</MenuItem>
                  <MenuItem value='high'>High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='description'
                fullWidth
                multiline
                rows={4}
                label='Description'
                value={ticketData.description}
                required
                onChange={e => handleFormChange('description', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={ticketData.category}
                  name='category'
                  label='Category'
                  onChange={e => handleFormChange('category', e.target.value)}
                >
                  <MenuItem value='technical'>Technical</MenuItem>
                  <MenuItem value='billing'>Billing</MenuItem>
                  <MenuItem value='sales'>Sales</MenuItem>
                  <MenuItem value='general'>General</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name='status'
                  value={ticketData.status}
                  label='Status'
                  onChange={e => handleFormChange('status', e.target.value)}
                >
                  <MenuItem value='open'>Open</MenuItem>
                  <MenuItem value='pending'>Pending</MenuItem>
                  <MenuItem value='closed'>Closed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name='contactEmail'
                type='email'
                label='Contact Email'
                value={ticketData.contactEmail}
                required
                onChange={e => handleFormChange('contactEmail', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name='phone'
                type='tel'
                label='Phone Number'
                value={ticketData.phone}
                onChange={e => handleFormChange('phone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Subscription Plan</InputLabel>
                <Select
                  name='subscriptionPlan'
                  value={ticketData.subscriptionPlan}
                  label='Subscription Plan'
                  onChange={e => handleFormChange('subscriptionPlan', e.target.value)}
                >
                  <MenuItem value='basic'>Basic</MenuItem>
                  <MenuItem value='pro'>Pro</MenuItem>
                  <MenuItem value='enterprise'>Enterprise</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component='fieldset'>
                <Typography variant='subtitle1' className='mbe-2'>
                  Issue Type
                </Typography>
                <RadioGroup
                  name='issueType'
                  row
                  value={ticketData.issueType}
                  onChange={e => handleFormChange('issueType', e.target.value)}
                >
                  <FormControlLabel value='bug' control={<Radio />} label='Bug' />
                  <FormControlLabel value='feature' control={<Radio />} label='Feature Request' />
                  <FormControlLabel value='other' control={<Radio />} label='Other' />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component='fieldset'>
                <Typography variant='subtitle1' className='mbe-2'>
                  Contact Method
                </Typography>
                <RadioGroup
                  name='contactEmail'
                  row
                  value={ticketData.contactEmail}
                  onChange={e => handleFormChange('contactEmail', e.target.value)}
                >
                  <FormControlLabel value='email' control={<Radio />} label='Email' />
                  <FormControlLabel value='phone' control={<Radio />} label='Phone' />
                  <FormControlLabel value='both' control={<Radio />} label='Both' />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <div className='flex gap-4'>
                <FormControlLabel
                  control={
                    <Checkbox
                      name='repeatIssue'
                      checked={ticketData.repeatIssue}
                      onChange={e => handleFormChange('repeatIssue', e.target.checked)}
                    />
                  }
                  label='Repeat Issue'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name='termsAccepted'
                      checked={ticketData.termsAccepted}
                      onChange={e => handleFormChange('termsAccepted', e.target.checked)}
                    />
                  }
                  label='Terms Accepted'
                />
              </div>
            </Grid>
          </Grid>
          <DialogActions className='gap-2'>
            <Button variant='outlined' color='secondary' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} variant='contained' type='submit'>
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditTicketDialogbox
