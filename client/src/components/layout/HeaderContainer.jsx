import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useLogoutMutation } from '../../slices/authApiSlice'

import { TbDoorExit, TbUser } from 'react-icons/tb'

import AlertContext from '../../context/alert/AlertContext'
import { clearCredentials } from '../../slices/authSlice'

function HeaderContainer() {
  const { userInfo } = useSelector((state) => state.auth)
  const { setAlertActive } = useContext(AlertContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [ logout ] = useLogoutMutation()
  const logoutHandler = async () => {
    try {
      await logout().unwrap()
      dispatch(clearCredentials())
      setAlertActive('User logged out', 'success')
      navigate('/')
    } catch (error) {
      setAlertActive(`Logout failed - ${error}`, 'error')
    }
  }
  return (
    <header id="header-container" style={{ padding: '0.75rem 0.75rem 0.5rem 0.75rem' }}>
      <nav id="main-nav">
        <Link to='/' style={{ padding: '0.25rem' }}>
          <span id="logo"><em>OK</em>life</span>
        </Link>
        <ul className="main-nav-list" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {
            userInfo &&
              <li className="main-nav-item" style={{ padding: '0.25rem', cursor: 'pointer' }} onClick={logoutHandler}>
                <TbDoorExit style={{ fontSize: '1.75rem' }} />
              </li>
          }
          <li className="main-nav-item" style={{ padding: '0.25rem', cursor: 'pointer' }} onClick={() => navigate('/login')}>
            <TbUser style={{ fontSize: '1.75rem' }} />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default HeaderContainer