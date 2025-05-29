import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Divider, FormLabel } from '@mui/material'
import { useForm } from 'react-hook-form'

import { useLoginMutation } from '../slices/authApiSlice'
import { setCredentials } from '../slices/authSlice'

import { FaEye, FaEyeSlash } from 'react-icons/fa'

import AlertContext from '../context/alert/AlertContext'

import MainContainer from '../components/layout/MainContainer'

import FormControl from '../components/shared/forms/FormControl'
import FormWidget from '../components/shared/forms/FormWidget'
import Spinner from '../components/shared/Spinner'

import googleLogo from '../assets/google-icon.png'
import facebookLogo from '../assets/facebook-icon.png'

function LoginPage() {
  const { userInfo } = useSelector((state) => state.auth)
  const { setAlertActive } = useContext(AlertContext)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    userInfo && navigate('/')
  }, [navigate, userInfo])
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'all'
  })
  const [ showPassword, setShowPassword ] = useState(false)
  const [ login, {isLoading} ] = useLoginMutation()
  const onSubmit = async () => {
    try {
      const res = await login({ email: getValues('email'), password: getValues('password') }).unwrap()
      dispatch(setCredentials(res))
      setAlertActive(`Welcome back, ${res.user.username}!`, 'success')
      navigate('/')
    } catch (error) {
      setAlertActive(error.data.message, 'error')
    }
  }
  return (
    <MainContainer page='login-page'>
      <FormWidget onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <h2>Welcome Back!</h2>
          <span style={{ maxWidth: '280px', fontSize: '10px', fontWeight: '300', textAlign: 'center' }}>Enter your details below...</span>
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
        <FormControl>
          <FormLabel component='label' style={{ width: 'calc(100% - 1.75rem)' }}>Password</FormLabel>
          <div className="icon-input">
            <input type={showPassword ? 'text' : 'password'} className={errors.password ? 'invalid' : ''} {
              ...register('password', {
                required: { value: true, message: 'Please enter a password' },
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                maxLength: { value: 50, message: 'Password must be no more than 50 characters' },
                pattern: {
                  value: /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹])/,
                  message: 'Passwords must contain at least one uppercase, and one lowercase letter, one number, and one special character.'
                }
              })
            } placeholder='Choose a password' />
            <button type="button" className='input-btn' onClick={() => setShowPassword(!showPassword)}>
              {
                showPassword ? <FaEyeSlash /> : <FaEye />
              }
            </button>
          </div>
          {
            errors.password && <span className="input-error" style={{ width: 'calc(100% - 1.75rem)' }}>{errors.password.message}</span>
          }
        </FormControl>
        <FormControl>
          {
            isLoading ? <Spinner />
            : <Button type='submit' fullWidth variant='contained' style={{ padding: '0.75rem 1rem', margin: '0.5rem 0', '&:hover': { scale: '1.04' } }}>Sign in</Button>
          }
        </FormControl>
        <Divider>or</Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Button type='button' className='o-auth' style={{ display: 'flex', alignItems: 'center', gap: '0.5rem',  padding: '0.5rem 1rem' }}>
            <img src={googleLogo} style={{ height: '18px', width: '18px' }} />
            Sign in with Google
          </Button>
          <Button type='button' className='o-auth' style={{ display: 'flex', alignItems: 'center', gap: '0.5rem',  padding: '0.5rem 1rem' }}>
            <img src={facebookLogo} style={{ height: '18px', width: '18px' }} />
            Sign in with Facebook
          </Button>
          <span style={{ margin: '0.75rem 0 -0.25rem 0', fontSize: '10px', textAlign: 'center' }}>Don't have an account with us?</span>
          <Link to='/register' style={{ padding: '0.25rem', fontSize: '10px', textAlign: 'center' }}>Sign up instead</Link>
        </Box>
      </FormWidget>
    </MainContainer>
  )
}

export default LoginPage