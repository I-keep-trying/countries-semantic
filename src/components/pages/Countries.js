import React, { useState, useEffect, useRef } from 'react'
import { isMobile } from 'react-device-detect'
import axios from 'axios'
import {
  Divider,
  Container,
  Button,
  Image,
  Menu,
  Grid,
  Icon,
} from 'semantic-ui-react'
import CountryDesktop from './CountryDesktop'
import CountryMobile from './CountryMobile'
import Country from './Country'
import HeaderNav from '../Header'
import countriesList from '../../countriesList'
import regions from '../../regions'

const Countries = () => {
  const [country, setCountry] = useState(null)
  const [activeRegion, setActiveRegion] = useState('All')
  const [activeSubregion, setActiveSubregion] = useState('')
  const [input, setInput] = useState('')
  const [region, setRegion] = useState('All')
  const [subregion, setSubRegion] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isWeatherLoading, setIsWeatherLoading] = useState(true)
  const [unit, setUnit] = useState('metric')

  const inputRef = useRef()

  const filteredCountries = countriesList.filter((c) => {
    return c.name.toLowerCase().startsWith(input.toLowerCase())
  })

  const filterByRegion =
    region === 'All'
      ? filteredCountries
      : filteredCountries.filter(
          (c) => c.region.toLowerCase() === region.toLowerCase()
        )

  const filterBySubregion =
    subregion === ''
      ? filterByRegion
      : filterByRegion.filter((r) => {
          return r.subregion === subregion
        })

  /*   useEffect(() => {
    if (filterBySubregion.length === 1) {
      setActiveSubregion(subregion)
      setInput(filterBySubregion[0].name)
    }
  }, [filterBySubregion]) */

  useEffect(() => {
    if (filterBySubregion.length === 1) {
      //   setIsLoading(true)
      setActiveSubregion(subregion)
      setInput(filterBySubregion[0].name)
      axios
        .get(
          `https://restcountries.eu/rest/v2/name/${filterBySubregion[0].name}`
        )
        .then((result) => {
          setCountry(result.data[0])
          setRegion(result.data[0].region)
          setSubRegion(result.data[0].subregion)
          //   console.log('isLoading s/b true', isLoading)
          //   setIsLoading(false)
        })
    }
  }, [input])

  if (filterBySubregion.length === 1) {
    console.log('Country should be loading, isLoading s/b ??', isLoading)
  }

  // reset for when no matches returned from filter
  const reset = () => {
    setInput('')
    setRegion('All')
    setSubRegion('')
  }

  const handleClick = (c) => {
    setIsLoading(true)
    setInput(c.name)
    setRegion(c.region)
    setSubRegion(c.subregion)
    setTimeout(() => {
      console.log('isLoading set to false')
      setIsLoading(false)
    }, 1500)
  }

  const getSubregions = regions.filter((r) =>
    r.region === activeRegion ? r : ''
  )

  const handleRegionClick = (e, { name }) => {
    setSubRegion('')
    setActiveSubregion('')
    setRegion(name)
    setActiveRegion(name)
  }

  const handleSubregionClick = (e, { name }) => {
    setSubRegion(name)
    setActiveSubregion(name)
  }

  const CountriesTable = () => (
    <>
      {filterBySubregion.map((c) => {
        return (
          <Grid.Row
            key={c.id}
            verticalAlign="middle"
            columns={isMobile ? 1 : 3}
            style={{
              marginTop: 3,
              marginBottom: 3,
              padding: 0,
              boxShadow: '0px 1px 2px rgba(0,0,0,0.25)',
            }}
          >
            {isMobile ? (
              <Grid style={{ margin: 0 }}>
                <Grid.Column
                  width={2}
                  style={{
                    paddingLeft: 2,
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingRight: 0,
                  }}
                >
                  <Image bordered size="mini" src={c.flag} alt="country flag" />
                </Grid.Column>
                <Grid.Column width={10} style={{ paddingTop: 0 }}>
                  {c.name}
                </Grid.Column>
                <Grid.Column width={4} style={{ padding: 0 }}>
                  <Button onClick={() => handleClick(c)} size="mini" basic>
                    Details
                  </Button>
                </Grid.Column>
              </Grid>
            ) : (
              <>
                <Grid.Column width={1} style={{ paddingRight: 0 }}>
                  <Image size="mini" src={c.flag} alt="country flag" bordered />
                </Grid.Column>
                <Grid.Column width={13}>{c.name}</Grid.Column>
                <Grid.Column width={2}>
                  <Button onClick={() => handleClick(c)} basic compact>
                    Details
                  </Button>
                </Grid.Column>
              </>
            )}
          </Grid.Row>
        )
      })}
    </>
  )

  const CountriesMenu = () => {
    return isMobile ? (
      <div>
        <Menu
          style={{ top: 60, width: '6rem' }}
          fixed="right"
          size="mini"
          tabular="right"
          vertical
          borderless
        >
          {regions.map((r) => (
            <div key={r.id}>
              <Menu.Item
                name={r.region}
                active={activeRegion === r.region}
                onClick={handleRegionClick}
              >
                {r.name}
              </Menu.Item>
              {r.subregions.length > 0 && activeRegion === r.region ? (
                <div>
                  {r.subregions.map((s) => (
                    <Menu size="mini" key={s}>
                      <Menu.Item
                        name={s}
                        onClick={() => {
                          setSubRegion(s)
                        }}
                      >
                        {s}
                      </Menu.Item>
                    </Menu>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </Menu>
      </div>
    ) : (
      <>
        <Menu attached="top" widths={8}>
          {regions.map((r) => (
            <Menu.Item
              key={r.id}
              name={r.region}
              active={activeRegion === r.region}
              onClick={handleRegionClick}
            >
              {r.name}
            </Menu.Item>
          ))}
        </Menu>
        {getSubregions[0].subregions.length > 0 ? (
          <Menu attached="bottom" widths={getSubregions[0].subregions.length}>
            {getSubregions[0].subregions.map((rs) => (
              <Menu.Item
                key={rs}
                name={rs}
                active={activeSubregion === rs}
                onClick={handleSubregionClick}
              />
            ))}
          </Menu>
        ) : (
          <></>
        )}
      </>
    )
  }

  const handleUnitButtonClick = () => {
    if (unit === 'metric') {
      setIsWeatherLoading(true)
      setUnit('imperial')
      return true
    }
    setIsWeatherLoading(true)
    setUnit('metric')
    return false
  }

  return (
    <>
      <HeaderNav
        inputRef={inputRef}
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        countries={filterBySubregion}
        setRegion={setRegion}
        setSubRegion={setSubRegion}
        unit={unit}
        setUnit={setUnit}
        handleUnitButtonClick={handleUnitButtonClick}
        isWeatherLoading={isWeatherLoading}
        setIsWeatherLoading={setIsWeatherLoading}
      />
      <Container fluid>
        {filterBySubregion.length === 0 ? (
          <>
            <p>no matches</p>
            <Button onClick={reset}>new search</Button>
          </>
        ) : (
          <>
            {filterBySubregion.length === 1 ? (
              <>
                {console.log('render Country isLoading', isLoading)}
                {country !== null && !isLoading ? (
                  <>
                    <>
                      <Country
                        unit={unit}
                        setUnit={setUnit}
                        handleUnitButtonClick={handleUnitButtonClick}
                        isWeatherLoading={isWeatherLoading}
                        setIsWeatherLoading={setIsWeatherLoading}
                        setInput={setInput}
                        setRegion={setRegion}
                        isLoading={isLoading}
                        country={country}
                        region={region}
                        subregion={subregion}
                        setSubRegion={setSubRegion}
                        setIsLoading={setIsLoading}
                        setActiveRegion={setActiveRegion}
                        setActiveSubregion={setActiveSubregion}
                      />
                      {/*   {isMobile ? (
                          <CountryMobile
                            setInput={setInput}
                            setRegion={setRegion}
                            isLoading={isLoading}
                            country={country}
                            region={region}
                            subregion={subregion}
                            setSubRegion={setSubRegion}
                            setIsLoading={setIsLoading}
                            setActiveRegion={setActiveRegion}
                            setActiveSubregion={setActiveSubregion}
                          />
                        ) : (
                          <CountryDesktop
                            setInput={setInput}
                            setRegion={setRegion}
                            isLoading={isLoading}
                            country={country}
                            region={region}
                            subregion={subregion}
                            setSubRegion={setSubRegion}
                            setIsLoading={setIsLoading}
                            setActiveRegion={setActiveRegion}
                            setActiveSubregion={setActiveSubregion}
                            handleRegionClick={handleRegionClick}
                          />
                        )} */}
                    </>
                  </>
                ) : (
                  <Icon loading name="spinner" />
                )}
              </>
            ) : (
              <>
                {isMobile ? (
                  <>
                    <Grid>
                      <Grid.Column
                        style={{ paddingLeft: 0, paddingRight: 0 }}
                        width={12}
                      >
                        <CountriesTable />
                      </Grid.Column>
                      <Grid.Column
                        style={{ paddingLeft: 0, paddingRight: 0 }}
                        width={4}
                      >
                        <CountriesMenu />
                      </Grid.Column>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid style={{ margin: 0, padding: 0 }} id="Grid1">
                      <CountriesMenu />
                      <CountriesTable />
                    </Grid>
                  </>
                )}
              </>
            )}
          </>
        )}
      </Container>
    </>
  )
}

export default Countries
