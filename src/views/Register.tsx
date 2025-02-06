'use client'

// React Imports
import { FormEvent, useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

// Type Imports
import type { Mode } from '@core/types'

// Component Imports
import Illustrations from '@components/Illustrations'
import Logo from '@components/layout/shared/Logo'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { auth } from '@/@services/FirebaseAuthentication/auth'
import { useRouter } from 'next/navigation'
import { user } from '@/@services/FirebaseFireStore/user'

const Register = ({ mode }: { mode: Mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [loading, setLoading] = useState(false)

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
      const username = formData.get('Username') as string
      const email = formData.get('Email') as string
      const password = formData.get('Password') as string

      // Firebase Requests
      const data = await auth.signup(email, password)
      await user.create(username, email, data.user.uid)

      router.replace('/')
    } catch (error) {
      alert('error occured check conole')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='p-6 sm:!p-12'>
          <Link href='/' className='flex justify-center items-start mbe-6'>
            <Logo />
          </Link>
          <Typography variant='h4'>Adventure starts here 🚀</Typography>
          <div className='flex flex-col gap-5'>
            <Typography className='mbs-1'>Make your app management easy and fun!</Typography>
            <form onSubmit={handleSubmit} noValidate autoComplete='off'>
              <fieldset disabled={loading} className='flex flex-col gap-5'>
                <TextField name='Username' autoFocus fullWidth label='Username' />
                <TextField name='Email' fullWidth label='Email' />
                <TextField
                  name='Password'
                  fullWidth
                  label='Password'
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
                  Sign Up
                </Button>
                <div className='flex justify-center items-center flex-wrap gap-2'>
                  <Typography>Already have an account?</Typography>
                  <Typography component={Link} href='/login' color='primary'>
                    Sign in instead
                  </Typography>
                </div>
                <Divider className='gap-3'>Or</Divider>
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
      <Illustrations maskImg={{ src: authBackground }} />
    </div>
  )
}

export default Register
