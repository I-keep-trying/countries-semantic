import React from 'react'
import { Container } from 'semantic-ui-react'
import Footer from './components/Footer'
import Countries from './components/pages/Countries'
import MyProvider from './context/MyProvider'
//import './assets/css/App.css'

function App() {
  return (
    <MyProvider>
      <div style={{ paddingBottom: '100px' }}>
        <Countries />
        <Container fluid>
          <Footer />
        </Container>
      </div>
    </MyProvider>
  )
}

export default App
