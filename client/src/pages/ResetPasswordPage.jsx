import { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Box, Button, Divider, FormLabel } from '@mui/material'

import { useResetPasswordMutation } from '../slices/authApiSlice'
import { setCredentials } from '../slices/authSlice'

import { TbEye, TbEyeOff } from 'react-icons/tb'

import AlertContext from '../context/alert/AlertContext'

import MainContainer from '../components/layout/MainContainer'

import FormControl from '../components/shared/forms/FormControl'
import FormWidget from '../components/shared/forms/FormWidget'
import Spinner from '../components/shared/Spinner'

function ResetPasswordPage() {
  const { setAlertActive } = useContext(AlertContext)
  const { token } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'all'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [ resetPassword, { isLoading } ] = useResetPasswordMutation()
  const onSubmit = async () => {
    if (getValues('password') !== getValues('confirmPassword')) {
      setAlertActive('Passwords do not match', 'error')
    } else {
      try {
        const res = await resetPassword({ token: token, password: getValues('password') }).unwrap()
        dispatch(setCredentials({...res}))
        setAlertActive('Password reset successfully!', 'success')
        navigate('/')
      } catch (error) {
        setAlertActive(error.data.message, 'error')
      }
    }
  }
  return (
    <MainContainer page='reset-password-page'>
      <FormWidget onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <h2>Nearly there!</h2>
          <span style={{ maxWidth: '280px', fontSize: '10px', fontWeight: '300', textAlign: 'center' }}>Enter a new password below</span>
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
                showPassword ? <TbEyeOff /> : <TbEye />
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
                showConfirmPassword ? <TbEyeOff /> : <TbEye />
              }
            </button>
          </div>
          {
            errors.confirmPassword && <span className="input-error" style={{ width: 'calc(100% - 1.75rem)' }}>{errors.confirmPassword.message}</span>
          }
        </FormControl>
          <Link to='/login' style={{ padding: '0.25rem', fontSize: '10px', textAlign: 'center' }}>Sign in instead</Link>
        <FormControl>
          {
            isLoading ? <Spinner />
            : <Button type='submit' fullWidth variant='contained' style={{ padding: '0.75rem 1rem', margin: '0.5rem 0', '&:hover': { scale: '1.04' } }}>Reset Password</Button>
          }
        </FormControl>
      </FormWidget>
    </MainContainer>
  )
}

export default ResetPasswordPage