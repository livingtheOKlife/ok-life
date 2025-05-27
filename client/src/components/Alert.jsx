import { useContext } from 'react'

import { PiCheckCircle, PiExclamationMarkFill, PiXBold } from 'react-icons/pi'

import AlertContext from '../context/alert/AlertContext' 

const Alert = () => {
  const { alert, dispatch } = useContext(AlertContext)
  return alert !== null &&
    <aside id='alert-zeta' className={alert.type === 'error' ? 'error' : alert.type === 'success' ? 'success' : ''}>
      {alert.type === 'error' && <PiExclamationMarkFill className='alert-icon' style={{ fontSize: '22px', minWidth: '22px' }} />}
      {alert.type === 'success' && <PiCheckCircle className='alert-icon' style={{ fontSize: '22px', minWidth: '22px' }} />}
      <span className='alert-text' style={{ fontSize: '10px', textAlign: 'center' }}>{alert.msg}</span>
      <button className='alert-btn' onClick={() => dispatch({type: 'SET_ALERT_INACTIVE'})}>
        <PiXBold style={{ fontSize: '14px' }} />
      </button>
      <div className="alert-progress-bg">
        <div className="alert-progress-bar"></div>
      </div>
    </aside>
}

export default Alert