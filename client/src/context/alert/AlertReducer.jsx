const alertReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALERT_ACTIVE':
      return action.payload
    case 'SET_ALERT_INACTIVE':
      return null
    default:
      return state
  }
}

export default alertReducer