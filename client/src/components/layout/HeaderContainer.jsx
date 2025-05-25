import { Link } from 'react-router-dom'

import { FaUser } from 'react-icons/fa'

function HeaderContainer() {
  return (
    <header id="header-container">
      <nav id="main-nav">
        <Link to='/'>
          <span id="logo"><em>OK</em>life</span>
        </Link>
        <ul className="main-nav-list">
          <li className="main-nav-item">
            <FaUser />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default HeaderContainer