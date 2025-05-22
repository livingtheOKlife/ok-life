import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div id="App">
      <header id="header-container">OKlife</header>
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
