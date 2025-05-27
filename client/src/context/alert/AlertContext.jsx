import PropTypes from 'prop-types'
import { createContext, useReducer } from 'react';

import alertReducer from './AlertReducer'

const AlertContext = createContext()

export const AlertProvider = ({children}) => {
  const initialState = null
  const [state, dispatch] = useReducer(alertReducer, initialState)
  const setAlertActive = (msg, type) => {
    dispatch({
      type: 'SET_ALERT_ACTIVE',
      payload: {msg, type}
    })
    setTimeout(() => dispatch({type: 'SET_ALERT_INACTIVE'}), 3640)
  }
  return (
    <AlertContext.Provider value={{
      alert: state,
      setAlertActive,
      dispatch
    }}>
      {children}
    </AlertContext.Provider>
  )
}

AlertProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default AlertContext