import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'

import { vanish } from './hooks/Vanish.js'
import LoadingScreen from './components/organisms/LoadingScreen.jsx'
import Navbar from './components/organisms/Navbar.jsx'
import Home from './pages/Home.jsx'

function App() {
  const { showSplash, fadeOut } = vanish(1200, 500)

  return (
    <>
      {showSplash && <LoadingScreen fadeOut={fadeOut} />}
    <Navbar />
      <Container className="mt-4 mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
