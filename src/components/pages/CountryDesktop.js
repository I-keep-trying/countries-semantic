import React, { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import {
  Divider,
  Menu,
  Container,
  Icon,
  Image,
  Button,
  Card,
  Popup,
  Grid,
  Header,
  Item,
  Flag,
  Breadcrumb,
} from 'semantic-ui-react'
import axios from 'axios'
import Weather from '../Weather'
import MapPage from './MapPage'

const Country = ({
  country,
  region,
  subregion,
  isLoading,
  setInput,
  setRegion,
  setSubRegion,
  setIsLoading,
  setActiveRegion,
  setActiveSubregion,
  handleRegionClick,
}) => {
  const [weather, setWeather] = useState({})
  const [unit, setUnit] = useState('metric')
  const [isWeatherLoading, setIsWeatherLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('Details')
  const [activeTab2, setActiveTab2] = useState('Flag')
  const [location, setLocation] = useState({})

  const [viewport, setViewport] = useState({
    latitude: 45,
    longitude: 73,
    zoom: 7,
  })

  // Get location coords of each country's capital, to use for weather
  useEffect(() => {
    axios
      .get(
        `https://geocode.search.hereapi.com/v1/geocode?q=${country.capital},${country.name}&apiKey=${process.env.REACT_APP_HERE_KEY}`
      )
      .then((res) => {
        setLocation(res.data.items[0].position)
      })
  }, [country])

  useEffect(() => {
    if (Object.entries(location).length > 0) {
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lng}&exclude=minutely,hourly&appid=${process.env.REACT_APP_OPENWEATHER_KEY}&units=${unit}`

      if (
        unit === 'metric' &&
        window.localStorage.getItem(`${country.name} weather in metric`) !==
          null
      ) {
        setIsWeatherLoading(true)
        setWeather(
          JSON.parse(
            window.localStorage.getItem(`${country.name} weather in metric`)
          )
        )
        setIsWeatherLoading(false)
        setIsLoading(false)

        setTimeout(() => {
          window.localStorage.removeItem(`${country.name} weather in metric`)
        }, 10000)
      } else if (
        unit === 'imperial' &&
        window.localStorage.getItem(`${country.name} weather in imperial`) !==
          null
      ) {
        setWeather(
          JSON.parse(
            window.localStorage.getItem(`${country.name} weather in imperial`)
          )
        )
        setIsWeatherLoading(false)
        setIsLoading(false)
        setTimeout(() => {
          window.localStorage.removeItem(`${country.name} weather in imperial`)
        }, 10000)
      } else {
        axios.get(url).then((response) => {
          setWeather(response.data)
          setIsWeatherLoading(false)
          setIsLoading(false)
          window.localStorage.setItem(
            `${country.name} weather in ${unit}`,
            JSON.stringify(response.data)
          )
        })
      }
    }
  }, [location, unit])

  const reset = () => {
    setInput('')
    setRegion('All')
    setSubRegion('')
    setActiveRegion('All')
    setActiveSubregion('')
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

  const handleItemClick = (e, { name }) => {
    setActiveTab(name)
  }

  const handleItemClick2 = (e, { name }) => {
    setActiveTab2(name)
  }

  // These coords are for the approximate center of the country, for the map
  const lat = Math.round(country.latlng[0])
  const lng = Math.round(country.latlng[1])

  const handleViewportChange = (viewport) => {
    setViewport({ ...viewport, latitude: lat, longitude: lng })
  }

  const getTimeZones = (country) => {
    const tzCount = country.timezones.length
    const tzEnd = country.timezones.length - 1
    return country.timezones.length > 1 ? (
      <Grid.Row style={{ padding: 0 }}>
        {country.timezones[0]} - {country.timezones[tzEnd]}
      </Grid.Row>
    ) : (
      <>{country.timezones[0]}</>
    )
  }

  const regionLink = () => {
    setInput('')
    setRegion(region)
    setActiveRegion(region)
    setSubRegion('')
    setActiveSubregion('')
  }

  const subregionLink = () => {
    setInput('')
    setRegion(region)
    setActiveRegion(region)
    setSubRegion(subregion)
    setActiveSubregion(subregion)
  }

  return !isLoading ? (
    <>
      <Breadcrumb>
        <Breadcrumb.Section
          key="All"
          style={{ cursor: 'pointer' }}
          link
          onClick={reset}
        >
          All
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section
          key={country.region}
          style={{ cursor: 'pointer' }}
          link
          onClick={regionLink}
        >
          {country.region}
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section
          key={country.subregion}
          style={{ cursor: 'pointer' }}
          link
          onClick={subregionLink}
        >
          {country.subregion}
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section key={country.name} active>
          {country.name}
        </Breadcrumb.Section>
      </Breadcrumb>
      <Container>
        <Grid style={{ margin: 0 }} columns={2}>
          <Grid.Column>
            {' '}
            <Grid.Row style={{ marginBottom: 0, marginTop: 10 }}>
              <Grid.Column
                style={{ paddingRight: 0 }}
                verticalAlign="middle"
                width={2}
              >
                <Card style={{ marginLeft: 1 }}>
                  <Image src={country.flag} alt="country flag" />
                </Card>
              </Grid.Column>
              <Grid.Column verticalAlign="middle" width={14}>
                <Header as="h1" style={{ paddingLeft: 0, marginTop: 10 }}>
                  {country.name}
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              {' '}
              <Header as="h3" style={{ marginBottom: 5, marginTop: 0 }}>
                Region: {country.region}
              </Header>
            </Grid.Row>
            <Grid.Row>
              <Header as="h3" style={{ marginBottom: 5, marginTop: 0 }}>
                Subregion:
                {country.subregion !== '' ? (
                  <> {country.subregion}</>
                ) : (
                  <>N/A</>
                )}
              </Header>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column style={{ padding: 0, marginLeft: -10 }}></Grid.Column>
        </Grid>
        <Button.Group>
          {unit === 'metric' ? (
            <>
              <Button color="black" onClick={handleUnitButtonClick}>
                Metric
              </Button>
              <Button.Or />
              <Button basic color="black" onClick={handleUnitButtonClick}>
                American <Flag name="us" />
              </Button>
            </>
          ) : (
            <>
              <Button basic color="black" onClick={handleUnitButtonClick}>
                Metric
              </Button>
              <Button.Or />
              <Button color="black" onClick={handleUnitButtonClick}>
                Imperial
              </Button>
            </>
          )}
        </Button.Group>
        <Menu
          style={{
            paddingTop: 10,
            marginBottom: 0,
            marginTop: 0,
            borderWidth: 0,
          }}
          tabular
        >
          <Menu.Item
            name="Details"
            active={activeTab === 'Details'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="Weather"
            active={activeTab === 'Weather'}
            onClick={handleItemClick}
          />
        </Menu>
        {activeTab === 'Details' && !isLoading ? (
          <>
            <Card fluid style={{ margin: 0 }}>
              <Grid style={{ margin: 0 }} columns={4}>
                <Grid.Row>
                  <Grid.Column>
                    <Item.Group relaxed>
                      <Item style={{ margin: 0 }}>
                        <Item.Content>
                          <Popup
                            style={{
                              borderRadius: 0,
                              padding: '2em',
                            }}
                            hoverable
                            inverted
                            aria-label="An endonym (also known as autonym) is a common, internal name for a geographical place, group of people, or a language/dialect, that is used only inside that particular place, group, or linguistic community."
                            trigger={<Item.Header>Endonym</Item.Header>}
                          >
                            <Popup.Content>
                              <>
                                An endonym (also known as autonym) is a common,
                                internal name for a geographical place, group of
                                people, or a language/dialect, that is used only
                                inside that particular place, group, or
                                linguistic community.
                                <a href="https://en.wikipedia.org/wiki/Endonym_and_exonym">
                                  <Icon name="external" />
                                </a>
                              </>
                            </Popup.Content>
                          </Popup>

                          <Item.Description>
                            {country.nativeName}
                          </Item.Description>
                        </Item.Content>
                      </Item>
                    </Item.Group>
                  </Grid.Column>

                  <Grid.Column>
                    <Item.Group relaxed>
                      <Item style={{ margin: 0 }}>
                        <Item.Content>
                          <Item.Header as="a">Capital</Item.Header>
                          <Item.Description>{country.capital}</Item.Description>
                        </Item.Content>
                      </Item>
                    </Item.Group>
                  </Grid.Column>
                  {country.area !== null ? (
                    <Grid.Column>
                      <Item.Group relaxed>
                        <Item style={{ margin: 0 }}>
                          <Item.Content>
                            <Item.Header>Size</Item.Header>
                            <Item.Description>
                              {unit === 'metric'
                                ? ` ${country.area.toLocaleString()} km²`
                                : ` ${Math.round(
                                    country.area * 1.609
                                  ).toLocaleString()} mi²`}
                            </Item.Description>
                          </Item.Content>
                        </Item>
                      </Item.Group>
                    </Grid.Column>
                  ) : (
                    <Grid.Column>
                      <Item.Group relaxed>
                        <Item style={{ margin: 0 }}>
                          <Item.Content>
                            <Item.Header>Size</Item.Header>
                            <Item.Description>Not provided.</Item.Description>
                          </Item.Content>
                        </Item>
                      </Item.Group>
                    </Grid.Column>
                  )}
                  <Grid.Column>
                    <Item.Group relaxed>
                      <Item style={{ margin: 0 }}>
                        <Item.Content>
                          <Item.Header>Population</Item.Header>
                          <Item.Description>
                            {country.population.toLocaleString()}
                          </Item.Description>
                        </Item.Content>
                      </Item>
                    </Item.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Divider style={{ margin: 0 }} />
              <Grid style={{ margin: 0 }} columns={2}>
                <Grid.Column>
                  <Item.Group relaxed>
                    <Item style={{ margin: 0 }}>
                      <Item.Content>
                        <Item.Header>Languages</Item.Header>
                        <Item.Description>
                          {country.languages.map((lang) => (
                            <Grid.Row style={{ padding: 0 }} key={lang.name}>
                              {lang.name}
                            </Grid.Row>
                          ))}
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Grid.Column>
                <Grid.Column>
                  <Item.Group relaxed>
                    <Item style={{ margin: 0 }}>
                      <Item.Content>
                        <Item.Header>Time Zones</Item.Header>
                        <Item.Description>
                          {getTimeZones(country)}
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Grid.Column>
              </Grid>
              <Divider style={{ margin: 0 }} />
              <Grid style={{ margin: 0 }} columns={3}>
                <Grid.Row style={{ paddingLeft: 14, paddingBottom: 0 }}>
                  <Header>Currencies</Header>
                </Grid.Row>

                <Grid.Column>
                  <Item.Group>
                    <Item>
                      <Item.Content>
                        <Item.Header> Symbol</Item.Header>
                        <Item.Description>
                          {country.currencies.map((curr) => (
                            <Grid.Row
                              columns={3}
                              style={{ padding: 0 }}
                              key={curr.symbol}
                            >
                              {curr.symbol}
                            </Grid.Row>
                          ))}
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Grid.Column>
                <Grid.Column>
                  <Item.Group>
                    <Item>
                      <Item.Content>
                        <Item.Header> Code</Item.Header>
                        <Item.Description>
                          {country.currencies.map((curr) => (
                            <Grid.Row
                              columns={3}
                              style={{ padding: 0 }}
                              key={curr.code}
                            >
                              {curr.code}
                            </Grid.Row>
                          ))}
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Grid.Column>
                <Grid.Column>
                  <Item.Group>
                    <Item>
                      <Item.Content>
                        <Item.Header>Name</Item.Header>
                        <Item.Description>
                          {country.currencies.map((curr) => (
                            <Grid.Row
                              columns={3}
                              style={{ padding: 0 }}
                              key={curr.name}
                            >
                              {curr.name}
                            </Grid.Row>
                          ))}
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Grid.Column>
              </Grid>
            </Card>
          </>
        ) : (
          <>
            {!isWeatherLoading && !isLoading ? (
              <Card fluid style={{ margin: 0 }}>
                <Weather
                  weather={weather}
                  unit={unit}
                  activeTab={activeTab}
                  country={country}
                />
              </Card>
            ) : (
              <Icon loading name="spinner" />
            )}
          </>
        )}
      </Container>
    </>
  ) : (
    <>
      <Icon loading name="spinner" />
    </>
  )
}

export default Country
