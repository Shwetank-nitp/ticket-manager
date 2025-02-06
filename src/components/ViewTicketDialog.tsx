'use client'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

// Icons
import CloseIcon from '@mui/icons-material/Close'

// Types
import type { Ticket } from '@/@core/types'

interface ViewTicketDialogboxProps {
  open: boolean
  setOpen: (open: boolean) => void
  ticket: Ticket
}

const ViewTicketDialogbox = ({ open, setOpen, ticket }: ViewTicketDialogboxProps) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='md'>
      <DialogTitle className='flex justify-between items-center'>
        <span>Ticket Details</span>
        <Button variant='text' onClick={() => setOpen(false)}>
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={4} className='pbe-4'>
          <Grid item xs={12}>
            <Typography variant='h6' className='mbe-2'>
              {ticket.title}
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' className='mbe-1'>
              Status
            </Typography>
            <Chip
              label={ticket.status}
              color={ticket.status === 'open' ? 'success' : ticket.status === 'pending' ? 'warning' : 'error'}
              variant='outlined'
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' className='mbe-1'>
              Priority
            </Typography>
            <Chip
              label={ticket.priority}
              color={ticket.priority === 'high' ? 'error' : ticket.priority === 'medium' ? 'warning' : 'success'}
              variant='outlined'
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='subtitle2' className='mbe-1'>
              Description
            </Typography>
            <Typography variant='body1' className='p-3 bg-action-hover rounded'>
              {ticket.description}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' className='mbe-1'>
              Category
            </Typography>
            <Typography variant='body1'>{ticket.category}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' className='mbe-1'>
              Issue Type
            </Typography>
            <Typography variant='body1'>{ticket.issueType}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' className='mbe-1'>
              Contact Email
            </Typography>
            <Typography variant='body1'>{ticket.contactEmail}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' className='mbe-1'>
              Phone Number
            </Typography>
            <Typography variant='body1'>{ticket.phone}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' className='mbe-1'>
              Assigned To
            </Typography>
            <Typography variant='body1'>{ticket.assigned === 'none' ? 'Unassigned' : ticket.assigned}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' className='mbe-1'>
              Subscription Plan
            </Typography>
            <Typography variant='body1'>{ticket.subscriptionPlan}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={() => setOpen(false)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ViewTicketDialogbox
