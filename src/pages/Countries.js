import React, { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import axios from 'axios'
import { Container, Button, Image, Menu, Grid } from 'semantic-ui-react'
import Country from './Country'
import HeaderNav from '../components/Header'
import countriesList from '../countriesList'
import regions from '../regions'

const Countries = () => {
  const [country, setCountry] = useState(null)
  const [activeItem, setActiveItem] = useState('All')
  const [input, setInput] = useState('')
  const [region, setRegion] = useState('All')
  const [subregion, setSubRegion] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const filteredCountries = countriesList.filter((c) => {
    return c.name.toLowerCase().startsWith(input.toLowerCase())
  })

  const filterByRegion =
    region === 'All'
      ? filteredCountries
      : filteredCountries.filter((c) => {
          if (region === 'Other' || region === 'Polar') {
            return c.region === ''
          }
          return c.region.toLowerCase() === region.toLowerCase()
        })

  const filterBySubregion =
    subregion === ''
      ? filterByRegion
      : filterByRegion.filter((r) => r.subregion === subregion)

  useEffect(() => {
    if (filterBySubregion.length === 1) {
      setInput(filterBySubregion[0].name)
    }
  }, [filterBySubregion])

  useEffect(() => {
    if (input !== '') {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${input}`)
        .then((result) => {
          setCountry(result.data[0])
          setIsLoading(false)
        })
    }
  }, [input])

  const reset = () => {
    setInput('')
    setRegion('All')
    setSubRegion('')
  }

  const handleClick = (c) => {
    !isLoading ? setIsLoading(true) : isLoading
    setInput(c.name)
  }

  const filterReset = () => {
    setRegion('All')
    setSubRegion('')
  }

  const handleFilter = (e) => {
    filterReset()
    !isLoading ? setIsLoading(true) : isLoading
    setInput(e.target.value)
  }

  const handleRegionClick = (e, { name }) => {
    setSubRegion('')
    setRegion(name)
    setActiveItem(name)
  }

  const getSubregions = regions.filter((r) =>
    r.region === activeItem ? r : ''
  )

  const CountriesTable = () => {
    return isMobile ? (
      <div>
        {filterBySubregion.map((c) => {
          return (
            <Grid.Row key={c.id} style={{ marginTop: 3, marginBottom: 3 }}>
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
            </Grid.Row>
          )
        })}
      </div>
    ) : (
      <>
        {filterBySubregion.map((c) => {
          return (
            <Grid.Row
              verticalAlign="middle"
              columns={3}
              key={c.id}
              style={{
                padding: 0,
              }}
            >
              <Grid.Column width={2}>
                <Image size="mini" src={c.flag} alt="country flag" bordered />
              </Grid.Column>
              <Grid.Column width={12}>{c.name}</Grid.Column>
              <Grid.Column width={2}>
                <Button onClick={() => handleClick(c)} basic compact>
                  Details
                </Button>
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </>
    )
  }

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
                active={activeItem === r.region}
                onClick={handleRegionClick}
              >
                {r.name}
              </Menu.Item>
              {r.subregions.length > 0 && activeItem === r.region ? (
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
              active={activeItem === r.region}
              onClick={handleRegionClick}
            >
              {r.name}
            </Menu.Item>
          ))}
        </Menu>
        {activeItem !== 'All' &&
        activeItem !== 'Polar' &&
        activeItem !== 'Other' ? (
          <Menu attached="bottom" widths={getSubregions[0].subregions.length}>
            {regions.map((r) => {
              return activeItem === r.region ? (
                r.subregions.map((rs) => (
                  <Menu.Item
                    key={rs}
                    name={rs}
                    active={activeItem === rs}
                    onClick={() => {
                      setSubRegion(rs)
                    }}
                  />
                ))
              ) : (
                <></>
              )
            })}
          </Menu>
        ) : (
          <></>
        )}
      </>
    )
  }

  return (
    <>
      <HeaderNav
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        handleChange={handleFilter}
        countries={filterBySubregion}
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
                {country !== null ? (
                  <>
                    {!isLoading ? (
                      <Country
                        setInput={setInput}
                        setRegion={setRegion}
                        isLoading={isLoading}
                        country={country}
                        setSubRegion={setSubRegion}
                        setIsLoading={setIsLoading}
                        setActiveItem={setActiveItem}
                      />
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
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
