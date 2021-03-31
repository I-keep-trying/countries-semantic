import React, { useState, useEffect, useRef } from 'react'
import { isMobile } from 'react-device-detect'
import axios from 'axios'
import { Container, Button, Image, Menu, Grid, Card } from 'semantic-ui-react'
import Country from './Country'

const Countries = ({
  countries,
  setInput,
  regions,
  setRegion,
  setSubRegion,
  isLoading,
  setIsLoading,
  handleChange,
}) => {
  const [country, setCountry] = useState({})
  const [activeItem, setActiveItem] = useState('All')

  const inputRef = useRef()

  useEffect(() => {
    if (countries.length === 1) {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${countries[0].name}`)
        .then((result) => {
          setCountry(result.data[0])
          setIsLoading(false)
        })
    }
  }, [countries])

  const reset = () => {
    setInput('')
    setRegion('All')
    setSubRegion('')
  }

  const handleClick = (c) => {
    setInput(c.name)
  }

  const handleRegionClick = (e, { name }) => {
    setSubRegion('')
    setRegion(name)
    setActiveItem(name)
  }

  if (countries.length === 0) {
    return (
      <>
        <p>no matches</p>
        <Button onClick={reset}>new search</Button>
      </>
    )
  }

  if (countries.length === 1) {
    return !isLoading ? (
      <Country
        setInput={setInput}
        setRegion={setRegion}
        isLoading={isLoading}
        country={country}
        setSubRegion={setSubRegion}
        setIsLoading={setIsLoading}
        isMobile={isMobile}
      />
    ) : (
      <></>
    )
  }

  const getSubregions = regions.filter((r) =>
    r.region === activeItem ? r : ''
  )

  const CountriesTable = () => {
    return isMobile ? (
      <>
        {countries.map((c) => {
          return (
            <Grid.Row key={c.id} style={{ marginTop: 3, marginBottom: 3 }}>
              <Grid style={{ margin: 0 }} id="grid in row">
                <Grid.Column
                  width={2}
                  style={{
                    paddingLeft: 2,
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingRight: 0,
                  }}
                >
                  <Image size="tiny" src={c.flag} alt="country flag" />
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
      </>
    ) : (
      <>
        {countries.map((c) => {
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
                <Card style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <Image size="tiny" src={c.flag} alt="country flag" />
                </Card>
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
    return (
      <>
        <Menu
          style={{ top: 60, width: '6rem' }}
          fixed="right"
          size="mini"
          tabular="right"
          vertical
          borderless
        >
          {regions.map((r) => {
            return (
              <>
                <Menu.Item
                  key={r.id}
                  name={r.region}
                  active={activeItem === r.region}
                  onClick={handleRegionClick}
                >
                  {r.name}
                </Menu.Item>
                {r.subregions.length > 0 && activeItem === r.region ? (
                  <>
                    {r.subregions.map((s) => {
                      return (
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
                      )
                    })}
                  </>
                ) : (
                  <></>
                )}
              </>
            )
          })}
        </Menu>
      </>
    )
  }

  return isMobile ? (
    <>
      <Container fluid>
        <Grid>
          <Grid.Column style={{ paddingLeft: 0, paddingRight: 0 }} width={12}>
            <CountriesTable />
          </Grid.Column>
          <Grid.Column style={{ paddingLeft: 0, paddingRight: 0 }} width={4}>
            <CountriesMenu />
          </Grid.Column>
        </Grid>
      </Container>
    </>
  ) : (
    <>
      {/* desktop */}
      <Container fluid>
        <Grid
          style={{ marginLeft: 0, marginRight: 0, marginTop: 5 }}
          id="Grid1"
        >
          <Menu attached="top" widths={8}>
            {regions.map((r) => {
              return (
                <>
                  <Menu.Item
                    key={r.id}
                    name={r.region}
                    active={activeItem === r.region}
                    onClick={handleRegionClick}
                  >
                    {r.name}
                  </Menu.Item>
                </>
              )
            })}
          </Menu>
          {activeItem !== 'All' &&
          activeItem !== 'Polar' &&
          activeItem !== 'Other' ? (
            <>
              <Menu
                attached="bottom"
                widths={getSubregions[0].subregions.length}
              >
                {regions.map((r) => {
                  return activeItem === r.region ? (
                    r.subregions.map((rs) => (
                      <>
                        <Menu.Item
                          name={rs}
                          active={activeItem === rs}
                          onClick={() => {
                            setSubRegion(rs)
                          }}
                        />
                      </>
                    ))
                  ) : (
                    <></>
                  )
                })}
              </Menu>
            </>
          ) : (
            <></>
          )}
          <CountriesTable />
        </Grid>
      </Container>
    </>
  )
}

export default Countries
