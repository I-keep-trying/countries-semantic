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
  Breadcrumb,
} from 'semantic-ui-react'
import axios from 'axios'
import Weather from '../components/Weather'
import '../owm-right.css'

const Country = ({
  unit,
  setUnit,
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
  isWeatherLoading,
  setIsWeatherLoading,
}) => {
  console.log('country', country)
  const [weather, setWeather] = useState({})
  const [activeTab, setActiveTab] = useState('Flag')
  const [location, setLocation] = useState({})
  // const [unit, setUnit] = useState('metric')

  useEffect(() => {
    // Get location coords of country capital, to use for weather
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

  const handleItemClick = (e, { name }) => {
    setActiveTab(name)
  }

  const getTimeZones = (country) => {
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

  return !isLoading ? (
    <>
      <Menu
        secondary
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 0,
          paddingBottom: 10,
          marginBottom: 0,
        }}
      >
        <Breadcrumb
          size={isMobile ? 'mini' : 'small'}
          style={
            isMobile
              ? { paddingLeft: 3, paddingTop: 4 }
              : { marginLeft: 10, paddingTop: 4 }
          }
        >
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
          {country.subregion !== '' ? (
            <>
              <Breadcrumb.Divider icon="right chevron" />
              <Breadcrumb.Section
                key={country.subregion}
                style={{ cursor: 'pointer' }}
                link
                onClick={subregionLink}
              >
                {country.subregion}
              </Breadcrumb.Section>
            </>
          ) : (
            <></>
          )}
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section key={country.name} active>
            {country.name}
          </Breadcrumb.Section>
        </Breadcrumb>
        <Menu.Item
          position="right"
          style={{
            padding: 0,
          }}
        >
          <Button.Group attached="bottom">
            <Button
              size={isMobile ? `mini` : `medium`}
              basic={unit === 'metric' ? false : true}
              color="black"
              onClick={handleUnitButtonClick}
              style={{ padding: 4 }}
            >
              Metric
            </Button>
            <Button
              size={isMobile ? `mini` : `medium`}
              basic={unit === 'metric' ? true : false}
              color="black"
              onClick={handleUnitButtonClick}
              style={{ padding: 4 }}
            >
              Imperial
            </Button>
          </Button.Group>
        </Menu.Item>
      </Menu>

      <Container fluid style={isMobile ? { padding: 4 } : { padding: 14 }}>
        <Menu pointing secondary>
          <Menu.Item
            //  active
            name="Flag"
            active={activeTab === 'Flag'}
            onClick={handleItemClick}
          />
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

        {activeTab === 'Flag' && !isLoading ? (
          <Card fluid>
            <Image src={country.flag} alt="country flag" />
          </Card>
        ) : (
          <></>
        )}
        {activeTab === 'Details' && !isLoading ? (
          <Card fluid style={{ margin: 0 }}>
            <Grid style={{ margin: 0 }} columns={isMobile ? 2 : 4}>
              <Grid.Row>
                <Grid.Column style={{ paddingRight: 4 }}>
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
                              inside that particular place, group, or linguistic
                              community.
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

                <Grid.Column style={{ paddingLeft: 0 }}>
                  <Item.Group relaxed>
                    <Item style={{ margin: 0 }}>
                      <Item.Content>
                        <Item.Header as="a">Capital</Item.Header>
                        <Item.Description>{country.capital}</Item.Description>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Grid.Column>

                {isMobile ? (
                  <></>
                ) : (
                  <>
                    <Grid.Column style={{ paddingRight: 4 }}>
                      <Item.Group relaxed>
                        <Item style={{ margin: 0 }}>
                          <Item.Content>
                            <Item.Header>Size</Item.Header>
                            {country.area !== null ? (
                              <Item.Description>
                                {unit === 'metric'
                                  ? ` ${country.area.toLocaleString()} km²`
                                  : ` ${Math.round(
                                      country.area * 1.609
                                    ).toLocaleString()} mi²`}
                              </Item.Description>
                            ) : (
                              <Item.Description>Not provided.</Item.Description>
                            )}
                          </Item.Content>
                        </Item>
                      </Item.Group>
                    </Grid.Column>

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
                  </>
                )}
              </Grid.Row>
              {isMobile ? (
                <>
                  <Divider style={{ margin: 0 }} />
                  <Grid.Row>
                    <Grid.Column style={{ paddingRight: 4 }}>
                      <Item.Group relaxed>
                        <Item style={{ margin: 0 }}>
                          <Item.Content>
                            <Item.Header>Size</Item.Header>
                            {country.area !== null ? (
                              <Item.Description>
                                {unit === 'metric'
                                  ? ` ${country.area.toLocaleString()} km²`
                                  : ` ${Math.round(
                                      country.area * 1.609
                                    ).toLocaleString()} mi²`}
                              </Item.Description>
                            ) : (
                              <Item.Description>Not provided.</Item.Description>
                            )}
                          </Item.Content>
                        </Item>
                      </Item.Group>
                    </Grid.Column>

                    <Grid.Column style={{ paddingLeft: 0 }}>
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
                </>
              ) : (
                <></>
              )}
            </Grid>

            <Divider style={{ margin: 0 }} />
            <Grid style={{ margin: 0 }} columns={2}>
              <Grid.Column style={{ paddingRight: 4 }}>
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
              <Grid.Column style={{ paddingLeft: 0 }}>
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

              <Grid.Column style={{ paddingRight: 4 }}>
                <Item.Group>
                  <Item style={isMobile ? { margin: 0 } : {}}>
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
              <Grid.Column style={{ paddingLeft: 0, paddingRight: 0 }}>
                <Item.Group>
                  <Item style={isMobile ? { margin: 0 } : {}}>
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
              <Grid.Column style={{ paddingLeft: 0 }}>
                <Item.Group>
                  <Item style={isMobile ? { margin: 0 } : {}}>
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
        ) : (
          <></>
        )}
        {activeTab === 'Weather' && !isLoading ? (
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
        ) : (
          <></>
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
