import PropTypes from 'prop-types'

import Card from '../Card'

function FormWidget({onSubmit, children}) {
  return (
    <Card component='form' className='card' style={{ padding: '1rem 1rem 2rem 1rem' }} onSubmit={onSubmit} noValidate>{children}</Card>
  )
}

FormWidget.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default FormWidget