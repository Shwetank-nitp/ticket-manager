'use client'

// React Imports
import { useState } from 'react'
import type { FormEvent } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

// Type Imports
import type { Mode } from '@core/types'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import Illustrations from '@components/Illustrations'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

// services Imports
import { auth } from '@/@services/FirebaseAuthentication/auth'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

const Login = ({ mode }: { mode: Mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorDialogOpen, setErrorDialogOpen] = useState(false)
  // Vars
  const darkImg = '/images/pages/auth-v1-mask-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-light.png'

  // Hooks
  const router = useRouter()
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create a FormData object from the form
      const formData = new FormData(e.currentTarget)

      // Get individual fields
      const email = formData.get('Email') as string
      const password = formData.get('Password') as string
      await auth.signin(email, password)

      router.replace('/')
    } catch (error) {
      console.error(error)
      setErrorDialogOpen(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='p-6 sm:!p-12'>
          <Link href='/' className='flex justify-center items-center mbe-6'>
            <Logo />
          </Link>
          <div className='flex flex-col gap-5'>
            <div>
              <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}!👋🏻`}</Typography>
              <Typography className=' '>Please sign-in to your account and start the adventure</Typography>
            </div>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
              <fieldset disabled={loading} className='flex flex-col gap-5'>
                <TextField autoFocus fullWidth label='Email' name='Email' />
                <TextField
                  name='Password'
                  fullWidth
                  label='Password'
                  id='outlined-adornment-password'
                  type={isPasswordShown ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          size='small'
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={e => e.preventDefault()}
                        >
                          <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Button fullWidth variant='contained' type='submit'>
                  Log In
                </Button>
                <div className='flex justify-center items-center flex-wrap gap-2'>
                  <Typography>New on our platform?</Typography>
                  <Typography component={Link} href='/register' color='primary'>
                    Create an account
                  </Typography>
                </div>
                <Divider className='gap-3'>or</Divider>
                <div className='flex justify-center items-center gap-2'>
                  <IconButton size='small' className='text-facebook'>
                    <i className='ri-facebook-fill' />
                  </IconButton>
                  <IconButton size='small' className='text-twitter'>
                    <i className='ri-twitter-fill' />
                  </IconButton>
                  <IconButton size='small' className='text-github'>
                    <i className='ri-github-fill' />
                  </IconButton>
                  <IconButton size='small' className='text-googlePlus'>
                    <i className='ri-google-fill' />
                  </IconButton>
                </div>
              </fieldset>
            </form>
          </div>
        </CardContent>
      </Card>
      <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>The email or password you entered is incorrect. Please try again.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setErrorDialogOpen(false)} color='primary'>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Illustrations maskImg={{ src: authBackground }} />
    </div>
  )
}

export default Login
