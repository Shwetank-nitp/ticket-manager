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
import { agent } from '@/@services/FirebaseFireStore/agent'

interface EditTicketDialogboxProps {
  open: boolean
  setOpen: (open: boolean) => void
  ticket: Ticket
}

const AgentEditerBox = ({ open, setOpen, ticket }: EditTicketDialogboxProps) => {
  // States
  const [ticketData, setTicketData] = useState<Ticket>(ticket)

  const handleFormChange = (field: keyof Ticket, value: any) => {
    setTicketData(prev => ({ ...prev, [field]: value }))
  }

  const handleUpdate = async (e: React.FormEvent) => {
    try {
      e.preventDefault()

      await agent.updateTicket(ticket.id, {
        category: ticketData.category,
        status: ticketData.status,
        phone: ticketData.phone,
        issueType: ticketData.issueType,
        repeatIssue: ticketData.repeatIssue,
        assigned: ticketData.assigned
      })

      console.log('Updated ticket:', ticketData)
    } catch (error) {
      console.error(error)
    } finally {
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='md'>
      <DialogTitle>Update the tickets</DialogTitle>
      <DialogContent>
        <form onSubmit={handleUpdate}>
          <Grid container spacing={2}>
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
                name='assigned'
                type='tel'
                label='Assign agent the task'
                value={ticketData.assigned} // Adjusted field name if necessary
                onChange={e => handleFormChange('assigned', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component='fieldset'>
                <Typography variant='subtitle1' sx={{ marginBottom: 1 }}>
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
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
          <DialogActions sx={{ marginTop: 2 }}>
            <Button variant='outlined' color='secondary' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant='contained' type='submit'>
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AgentEditerBox
