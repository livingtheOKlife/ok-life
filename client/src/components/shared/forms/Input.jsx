import PropTypes from 'prop-types'

function Input({type, placeholder}) {
  return (
    <input type={type} placeholder={placeholder} />
  )
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export default Input