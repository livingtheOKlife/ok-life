import PropTypes from 'prop-types'

function MainContainer({page, children}) {
  return (
    <main id="main-container" className={page} style={{ padding: '0.5rem 1rem 1rem 1rem' }}>{children}</main>
  )
}

MainContainer.propTypes = {
  page: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default MainContainer