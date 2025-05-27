import { Outlet } from 'react-router-dom'

import HeaderContainer from './components/layout/HeaderContainer'

function App() {
  return (
    <div id="App">
      <HeaderContainer />
      <Outlet />
      <section id="copyright-container">
        <div id="copyright-wrapper">
          <div id="brand">
            <h1>livingthe<em>OK</em>life</h1>
            <span>&copy; 2025</span>
          </div>
          <span>All rights reserved.</span>
        </div>
      </section>
    </div>
  )
}

export default App
