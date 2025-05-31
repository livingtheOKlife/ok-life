import { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Divider } from '@mui/material'

import { useVerifyMutation } from '../slices/authApiSlice'
import { useResendMutation } from '../slices/authApiSlice'
import { setCredentials } from '../slices/authSlice'

import AlertContext from '../context/alert/AlertContext'

import MainContainer from '../components/layout/MainContainer'

import FormWidget from '../components/shared/forms/FormWidget'
import FormControl from '../components/shared/forms/FormControl'
import Spinner from '../components/shared/Spinner'

function VerifyEmailPage() {
  const { userInfo } = useSelector((state) => state.auth)
  const { setAlertActive } = useContext(AlertContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    !userInfo && navigate('/login')
  }, [navigate, userInfo])
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef([])
  const [ resend ] = useResendMutation()
  const [ verify, { isLoading } ] = useVerifyMutation()
  const onChange = (i, value) => {
		const newCode = [...code]
		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("")
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || ""
			}
			setCode(newCode)
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "")
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5
			inputRefs.current[focusIndex].focus()
		} else {
			newCode[i] = value
			setCode(newCode)
			if (value && i < 5) {
				inputRefs.current[i + 1].focus()
			}
		}
	}
  const onKeyDown = (i, e) => {
		if (e.key === "Backspace" && !code[i] && i > 0) {
			inputRefs.current[i - 1].focus()
		}
	}
  const onSubmit = async (e) => {
		e.preventDefault()
		const token = code.join("")
		try {
			const res = await verify({ email: userInfo.user.email, token }).unwrap()
			dispatch(setCredentials({...res}))
			setAlertActive('Email verified successfully', 'success')
			navigate("/")
		} catch (error) {
			setAlertActive(error.data.message, 'error')
		}
	}
	const onResend = async (e) => {
		e.preventDefault()
		try {
			const res = await resend({ email: userInfo.user.email }).unwrap()
			dispatch(setCredentials({...res}))
			setAlertActive('A new code was sent to you', 'success')
			navigate('/verify')
		} catch (error) {
			setAlertActive(error.data.message, 'error')
		}
	}
  useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			onSubmit(new Event("submit"));
		}
	}, [code]);
  return (
    <MainContainer page='verify-page'>
      <FormWidget onSubmit={onSubmit}>
        <FormControl>
          <h2>Email Verification</h2>
          <span style={{ maxWidth: '280px', fontSize: '10px', fontWeight: '300', textAlign: 'center' }}>We have sent you an email with a 6 digit code. Enter your code below to get verified...</span>
        </FormControl>
        <FormControl style={{ flexDirection: 'row' }}>
          {
						code.map((digit, i) => (
							<input
								key={i}
								ref={(el) => (inputRefs.current[i] = el)}
								maxLength='6'
								value={digit}
                style={{ display: 'flex', justifyContent: 'center', fontSize: '24px' }}
								onChange={(e) => onChange(i, e.target.value)}
								onKeyDown={(e) => onKeyDown(i, e)}
							/>
						))
					}
        </FormControl>
        <FormControl>
          {
            isLoading ? <Spinner />
						: <Button type='submit' fullWidth variant='contained' style={{ padding: '0.75rem 1rem', margin: '0.5rem 0', '&:hover': { scale: '1.04' } }}>Get verified</Button>
          }
					</FormControl>
        <FormControl>
          <Link to='/' style={{ padding: '0.5rem', fontSize: '12px' }}>Skip for now</Link>
        </FormControl>
        <Divider>or</Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <span style={{ maxWidth: '320px', margin: '0.75rem auto -0.25rem auto', fontSize: '10px', textAlign: 'center' }}>If you didn't receive an email, or your verification code has expired, click the link below...</span>
          <button type='button' className='ghost-btn' style={{ padding: '0.5rem', fontSize: '12px', textAlign: 'center' }} onClick={onResend}>Resend Email</button>
        </Box>
      </FormWidget>
    </MainContainer>
  )
}

export default VerifyEmailPage