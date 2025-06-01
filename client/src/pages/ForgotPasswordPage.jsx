import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Divider, FormLabel } from '@mui/material'
import { useForm } from 'react-hook-form'

import { useForgotPasswordMutation } from '../slices/authApiSlice'

import AlertContext from '../context/alert/AlertContext'

import MainContainer from '../components/layout/MainContainer'

import FormControl from '../components/shared/forms/FormControl'
import FormWidget from '../components/shared/forms/FormWidget'
import Spinner from '../components/shared/Spinner'

function ForgotPasswordPage() {
  const navigate = useNavigate()
  const { setAlertActive } = useContext(AlertContext)
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit
  } = useForm({
    defaultValues: {
      email: ''
    },
    mode: 'all'
  })
  const [ forgotPassword, { isLoading } ] = useForgotPasswordMutation()
  const onSubmit = async () => {
    try {
      await forgotPassword({ email: getValues('email') }).unwrap()
      setAlertActive('An email has been sent to you', 'success')
      navigate('/')
    } catch (error) {
      setAlertActive(error.data.message, 'error')
    }
  }
  return (
    <MainContainer page='forgot-password-page'>
      <FormWidget onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <h2>No worries!</h2>
          <span style={{ maxWidth: '280px', fontSize: '10px', fontWeight: '300', textAlign: 'center' }}>Just enter your email address below and we will send you a reset a link</span>
        </FormControl>
        <FormControl>
          <FormLabel component='label' style={{ width: 'calc(100% - 1.75rem)' }}>Email</FormLabel>
          <input type='email' placeholder='Enter your email address' {
            ...register('email', {
              required: {
                value: true,
                message: 'Please enter your email address',
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please enter a valid email address'
              }
            })
          } />
          {
            errors.email && <span className="input-error" style={{ width: 'calc(100% - 1.75rem)' }}>{errors.email.message}</span>
          }
        </FormControl>
        <Link to='/login' style={{ padding: '0.25rem', fontSize: '10px', textAlign: 'center' }}>Sign in instead</Link>
        <FormControl>
          {
            isLoading ? <Spinner />
            : <Button type='submit' fullWidth variant='contained' style={{ padding: '0.75rem 1rem', margin: '0.5rem 0', '&:hover': { scale: '1.04' } }}>Send help</Button>
          }
        </FormControl>
        <Divider>or</Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <span style={{ margin: '0.75rem 0 -0.25rem 0', fontSize: '10px', textAlign: 'center' }}>Don't have an account with us?</span>
          <Link to='/register' style={{ padding: '0.25rem', fontSize: '10px', textAlign: 'center' }}>Sign up instead</Link>
        </Box>
      </FormWidget>
    </MainContainer>
  )
}

export default ForgotPasswordPage