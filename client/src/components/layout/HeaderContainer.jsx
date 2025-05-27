import { Link, useNavigate } from 'react-router-dom'

import { FaUser } from 'react-icons/fa'

const smallScreenStyles = {
  padding: '0.75rem 0.75rem 0.5rem 0.75rem'
}

function HeaderContainer() {
  const navigate = useNavigate()
  return (
    <header id="header-container" style={smallScreenStyles}>
      <nav id="main-nav">
        <Link to='/' style={{ padding: '0.25rem' }}>
          <span id="logo"><em>OK</em>life</span>
        </Link>
        <ul className="main-nav-list" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <li className="main-nav-item" style={{ padding: '0.25rem', cursor: 'pointer' }} onClick={() => navigate('/login')}>
            <FaUser style={{ fontSize: '22px' }} />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default HeaderContainer