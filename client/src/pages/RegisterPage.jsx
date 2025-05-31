import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Box, Button, Divider, FormLabel } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { useCreateAccountMutation } from '../slices/authApiSlice'
import { setCredentials } from '../slices/authSlice'

import { FaEye, FaEyeSlash } from 'react-icons/fa'

import AlertContext from '../context/alert/AlertContext'

import MainContainer from '../components/layout/MainContainer'

import FormWidget from '../components/shared/forms/FormWidget'
import FormControl from '../components/shared/forms/FormControl'
import Spinner from '../components/shared/Spinner'

import googleLogo from '../assets/google-icon.png'
import facebookLogo from '../assets/facebook-icon.png'

function RegisterPage() {
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { setAlertActive } = useContext(AlertContext)
  const [createAccount, { isLoading }] = useCreateAccountMutation()
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'all'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const onSubmit = async () => {
    try {
      if (!getValues('password') === getValues('confirmPassword')) {
        setAlertActive('Passwords do not match', 'error')
      } else {
        const res = await createAccount({
          username: getValues('username'),
          email: getValues('email'),
          password: getValues('password')
        }).unwrap()
        dispatch(setCredentials({...res}))
        setAlertActive(`Welcome, ${getValues('username')}`, 'success')
        navigate('/verify')
      }
    } catch (error) {
      setAlertActive(error.data.message, 'error')
    }
  }
  return (
    <MainContainer>
      <FormWidget onSubmit={handleSubmit(onSubmit)}>
        <FormControl style={{ marginBottom: '0.5rem' }}>
          <h2>Welcome!</h2>
          <span style={{ maxWidth: '280px', fontSize: '10px', fontWeight: '300', textAlign: 'center' }}>Enter your details below to get started...</span>
        </FormControl>
        <FormControl>
          <FormLabel style={{ width: 'calc(100% - 1.75rem)' }}>Username</FormLabel>
          <input type='text' placeholder='Choose a username' {
            ...register('username', {
              required: { value: true, message: 'Please enter a username' },
              minLength: { value: 2, message: 'Username must be at least 2 characters' },
              maxLength: { value: 16, message: 'Username must be no more than 16 characters' },
              pattern: {
                value: /^(?=[\w.-])(?:[\d_.-]*[a-zA-Z])[\w.-]*$/,
                message: "Usernames must contain at least one letter, and can only contain letters, numbers, and _ . -",
              },
            })
          } />
          {
            errors.username && <span className="input-error" style={{ width: 'calc(100% - 1.75rem)' }}>{errors.username.message}</span>
          }
        </FormControl>
        <FormControl>
          <FormLabel style={{ width: 'calc(100% - 1.75rem)' }}>Email</FormLabel>
          <input type='email' placeholder='Enter your email address' {
            ...register('email', {
              required: {
                value: true,
                message: 'Please enter your email address'
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email address",
              },
            })
          } />
          {
            errors.email && <span className="input-error" style={{ width: 'calc(100% - 1.75rem)' }}>{errors.email.message}</span>
          }
        </FormControl>
        <FormControl>
          <FormLabel style={{ width: 'calc(100% - 1.75rem)' }}>Password</FormLabel>
          <div className="icon-input">
            <input type={showPassword ? 'text' : 'password'} placeholder='Choose a password' {
              ...register('password', {
                required: { value: true, message: 'Please enter a password' },
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                maxLength: { value: 50, message: 'Password must be no more than 50 characters' },
                pattern: {
                  value: /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹])/,
                  message: 'Passwords must contain at least one uppercase, and one lowercase letter, one number, and one special character.'
                }
              })
            } />
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
          <FormLabel style={{ width: 'calc(100% - 1.75rem)' }}>Confirm Password</FormLabel>
          <div className="icon-input">
            <input type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm your password' {
              ...register('confirmPassword', {
                required: { value: true, message: 'Please confirm your password' },
                validate: (value) => value === getValues('password') || 'Passwords do not match'
              })
            } />
            <button type="button" className='input-btn' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {
                showConfirmPassword ? <FaEyeSlash /> : <FaEye />
              }
            </button>
          </div>
          {
            errors.confirmPassword && <span className="input-error" style={{ width: 'calc(100% - 1.75rem)' }}>{errors.confirmPassword.message}</span>
          }
        </FormControl>
        <FormControl>
          {
            isLoading ? <Spinner />
            : <Button type='submit' fullWidth variant='contained' style={{ padding: '0.75rem 1rem', margin: '0.5rem 0', '&:hover': { scale: '1.04' } }}>Sign up</Button>
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
          <span style={{ margin: '0.75rem 0 -0.25rem 0', fontSize: '10px', textAlign: 'center' }}>Already have an account with us?</span>
          <Link to='/login' style={{ padding: '0.25rem', fontSize: '10px', textAlign: 'center' }}>Sign in instead</Link>
        </Box>
      </FormWidget>
    </MainContainer>
  )
}

export default RegisterPage