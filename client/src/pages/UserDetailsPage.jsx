import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button, FormLabel } from '@mui/material'

import { useUpdateUserMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'

import AlertContext from '../context/alert/AlertContext'

import MainContainer from '../components/layout/MainContainer'

import FormWidget from '../components/shared/forms/FormWidget'
import FormControl from '../components/shared/forms/FormControl'
import Spinner from '../components/shared/Spinner'

function UserDetailsPage() {
  const { userInfo } = useSelector((state) => state.auth)
  const { setAlertActive } = useContext(AlertContext)
  const [ updateUser, { isLoading } ] = useUpdateUserMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useParams()
  useEffect(() => {
    !userInfo && navigate('/login')
  }, [navigate, userInfo])
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: ''
    },
    mode: 'all'
  })
  const onSubmit = async () => {
    try {
      const res = await updateUser({
        token: token,
        firstName: getValues('firstName'),
        lastName: getValues('lastName'),
        dateOfBirth: getValues('dateOfBirth')
      }).unwrap()
      console.log(getValues('dateOfBirth'))
      dispatch(setCredentials({...res}))
      setAlertActive('Details added successfully', 'success')
      navigate('/')
    } catch (error) {
			setAlertActive(error.data.message, 'error')
    }
  }
  return (
    <MainContainer page='user-details-page'>
      <FormWidget onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <h2>Nearly there!</h2>
          <span style={{ maxWidth: '280px', fontSize: '10px', fontWeight: '300', textAlign: 'center' }}>We just need a few more details before you get started...</span>
        </FormControl>
        <FormControl>
          <FormLabel style={{ width: 'calc(100% - 1.75rem)' }}>First name</FormLabel>
          <input type="text" placeholder='Enter your first name' {
            ...register('firstName', {
              required: { value: true, message: 'Please enter your first name' },
              minLength: { value: 2, message: 'Your name must be at least 2 characters' },
              maxLength: { value: 50, message: 'Your name must be less than 50 characters' },
            })
          } />
          {
            errors.firstName && <span className="input-error" style={{ width: 'calc(100% - 1.75rem)' }}>{errors.firstName.message}</span>
          }
        </FormControl>
        <FormControl>
          <FormLabel style={{ width: 'calc(100% - 1.75rem)' }}>Surname</FormLabel>
          <input type="text" placeholder='Enter your surname' {
            ...register('lastName', {
              minLength: { value: 2, message: 'Your surname must be at least 2 characters' },
              maxLength: { value: 50, message: 'Your surname must be less than 50 characters' },
            })
          } />
          {
            errors.lastName && <span className="input-error" style={{ width: 'calc(100% - 1.75rem)' }}>{errors.lastName.message}</span>
          }
        </FormControl>
        <FormControl>
          <FormLabel style={{ width: 'calc(100% - 1.75rem)' }}>Date of birth</FormLabel>
          <input type="date" placeholder='dd/mm/yyyy' {
            ...register('dateOfBirth', {
              required: { value: true, message: 'Please enter your date of birth' },
            })
          } />
          {
            errors.dateOfBirth && <span className="input-error" style={{ width: 'calc(100% - 1.75rem)' }}>{errors.dateOfBirth.message}</span>
          }
        </FormControl>
        <FormControl>
          {
            isLoading ? <Spinner />
            : <Button type="submit" fullWidth variant='contained' style={{ padding: '0.75rem 1rem', margin: '0.5rem 0', '&:hover': { scale: '1.04' } }}>Finish</Button>
          }
        </FormControl>
      </FormWidget>
    </MainContainer>
  )
}

export default UserDetailsPage