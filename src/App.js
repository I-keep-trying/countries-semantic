import React from 'react'
import { Container } from 'semantic-ui-react'
import Footer from './components/Footer'
import Countries from './pages/Countries'
import './App.css'

function App() {
  return (
    <div style={{ paddingBottom: '100px' }}>
      <Countries />
      <Container fluid>
        <Footer />
      </Container>
    </div>
  )
}

export default App
