import React, { useState } from 'react'
import { Container } from 'semantic-ui-react'
import Footer from './components/Footer'
import HeaderNav from './components/Header'
import Countries from './pages/Countries'
import countriesList from './countriesList'
import regions from './regions'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [region, setRegion] = useState('All')
  const [subregion, setSubRegion] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  /*  
// Keeping temporarily - generates new static list

 const countriesFlags = countriesListApi.map((c) => {
    return new Object({
      id: nanoid(),
      name: c.name,
      region: c.region,
      subregion: c.subregion,
      flag: c.flag,
    })
  }) */

  const filteredCountries = countriesList.filter((c) => {
    return c.name.toLowerCase().startsWith(input.toLowerCase())
  })

  const filterByRegion =
    region === 'All'
      ? filteredCountries
      : filteredCountries.filter((c) => {
          if (region.toLowerCase() === 'other') {
            return c.region === ''
          }
          return c.region.toLowerCase() === region.toLowerCase()
        })

  const filterBySubregion =
    subregion === ''
      ? filterByRegion
      : filterByRegion.filter((r) => r.subregion === subregion)

  const handleChange = (event) => {
    !isLoading ? setIsLoading(true) : isLoading
    setInput(event.target.value)
  }

  return (
    <div>
      <HeaderNav
        input={input}
        setInput={setInput}
        setRegion={setRegion}
        setSubRegion={setSubRegion}
        handleChange={handleChange}
      />
      <Countries
        region={region}
        regions={regions}
        countries={filterBySubregion}
        setInput={setInput}
        setRegion={setRegion}
        setSubRegion={setSubRegion}
        subregion={subregion}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      <Container fluid className="Footer-container">
        <Footer />
      </Container>
    </div>
  )
}

export default App
