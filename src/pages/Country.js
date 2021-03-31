import React, { useState, useEffect } from 'react'
import {
  Tab,
  Divider,
  Menu,
  Container,
  Icon,
  Image,
  Button,
  Segment,
  Table,
  Card,
  Popup,
  Grid,
  Flag,
  Header,
  Statistic,
} from 'semantic-ui-react'
import axios from 'axios'
import Weather from '../components/Weather'

const Country = ({
  country,
  isLoading,
  setInput,
  setRegion,
  setSubRegion,
  setIsLoading,
  isMobile,
}) => {
  const [weather, setWeather] = useState({})
  const [unit, setUnit] = useState('metric')
  const [isWeatherLoading, setIsWeatherLoading] = useState(true)
  const [activeItem, setActiveItem] = useState('Details')
  const [activeUnit, setActiveUnit] = useState(unit)

  useEffect(() => {
    if (!isLoading) {
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
        const lat = Math.round(country.latlng[0])
        const lon = Math.round(country.latlng[1])
        !isWeatherLoading ? setIsWeatherLoading(true) : isWeatherLoading

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHER_KEY}&units=${unit}`

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
  }, [country, unit, isLoading])

  const reset = () => {
    setInput('')
    setRegion('All')
    setSubRegion('')
  }

  const handleUnitClick = (e, { name }) => {
    setUnit(name)
    setActiveUnit(name)
  }

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
  }

  return !isLoading ? (
    <Container>
      <Button basic onClick={reset}>
        Back
      </Button>
      <Grid style={{ margin: 0 }}>
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
            <Header as="h1" style={{ paddingLeft: 0, marginTop: 0 }}>
              {country.name}{' '}
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Header
        as="h3"
        style={{ paddingLeft: 10, marginBottom: 5, marginTop: 0 }}
      >
        Region: {country.region}{' '}
      </Header>
      {country.subregion !== '' ? (
        <Header
          as="h3"
          style={{ paddingLeft: 10, marginBottom: 10, marginTop: 0 }}
        >
          Subregion: {country.subregion}{' '}
        </Header>
      ) : (
        <></>
      )}{' '}
      <Menu
        inverted
        size="mini"
        widths={2}
        style={{ margin: 0, padding: 0, borderWidth: 0, borderRadius: 0 }}
        borderless
      >
        <Menu.Item
          style={{ fontSize: '1rem', fontWeight: 600, padding: 0 }}
          name="metric"
          active={activeUnit === 'metric'}
          onClick={handleUnitClick}
        />
        <Menu.Item
          style={{ fontSize: '1rem', fontWeight: 600, padding: 0 }}
          name="imperial"
          active={activeUnit === 'imperial'}
          onClick={handleUnitClick}
        />
      </Menu>
      <Menu
        style={{ paddingTop: 0, marginBottom: 0, marginTop: 0, borderWidth: 0 }}
        widths={2}
        tabular
      >
        <Menu.Item
          name="Details"
          active={activeItem === 'Details'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Weather"
          active={activeItem === 'Weather'}
          onClick={handleItemClick}
        />
      </Menu>
      <Card fluid style={{ marginTop: 0 }}>
        {activeItem === 'Details' && !isLoading ? (
          <>
            <Card.Group
              centered
              stackable
              style={{ margin: 0 }}
              itemsPerRow={4}
            >
              <Card style={{ margin: 0 }} description={country.nativeName}>
                <Card.Content>
                  <Card.Header>
                    <Popup
                      style={{
                        borderRadius: 0,
                        padding: '2em',
                      }}
                      hoverable
                      inverted
                      aria-label="An endonym (also known as autonym) is a common, internal name for a geographical place, group of people, or a language/dialect, that is used only inside that particular place, group, or linguistic community."
                      trigger={
                        <div>
                          Endonym <Header as="h6"> (Native Name) </Header>
                        </div>
                      }
                    >
                      <Popup.Content>
                        <>
                          {`An endonym (also known as autonym) is a common, internal name for a geographical place, group of people, or a language/dialect, that is used only inside that particular place, group, or linguistic community.`}
                          <a href="https://en.wikipedia.org/wiki/Endonym_and_exonym">
                            <Icon name="external" />
                          </a>
                        </>
                      </Popup.Content>
                    </Popup>
                  </Card.Header>
                  <Card.Description>{country.nativeName}</Card.Description>
                </Card.Content>
              </Card>
              <Card
                style={{ margin: 0 }}
                header="Capital"
                description={country.capital}
              />
              {/* provided in km */}
              {country.area !== null ? (
                <Card
                  style={{ margin: 0 }}
                  header="Size"
                  description={
                    unit === 'metric'
                      ? ` ${country.area.toLocaleString()} km²`
                      : ` ${Math.round(country.area * 1.609).toLocaleString()} mi²`
                  }
                />
              ) : (
                <Card
                  style={{ margin: 0 }}
                  header="Size"
                  description={'Not provided'}
                />
              )}
              <Card
                style={{ margin: 0 }}
                header="Population"
                description={country.population.toLocaleString()}
              />
            </Card.Group>
            <Divider />
            <Card.Group
              centered
              stackable
              style={{ margin: 0 }}
              itemsPerRow={2}
            >
              <Card style={{ margin: 0 }}>
                <Card.Content>
                  <Card.Header>Languages</Card.Header>
                  <Card.Description>
                    <Grid style={{ margin: 0 }}>
                      {country.languages.map((lang) => (
                        <Grid.Row style={{ padding: 0 }} key={lang.name}>
                          {lang.name}
                        </Grid.Row>
                      ))}{' '}
                    </Grid>
                  </Card.Description>
                </Card.Content>
              </Card>

              <Card style={{ margin: 0 }}>
                <Card.Content>
                  <Card.Header>Time Zones</Card.Header>
                  <Card.Description>
                    <Grid style={{ margin: 0 }}>
                      {country.timezones.map((tz) => (
                        <Grid.Row style={{ padding: 0 }} key={tz}>
                          {tz}
                        </Grid.Row>
                      ))}
                    </Grid>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
            <Divider />
            <Card.Group itemsPerRow={1}>
              <Card style={{ margin: 0 }}>
                <Card.Content>
                  <Card.Header>Currencies</Card.Header>
                  <Card.Description>
                    <Grid style={{ margin: 0 }}>
                      <Grid.Row
                        style={{ paddingTop: 0, paddingLeft: 5 }}
                        columns={3}
                      >
                        <Grid.Column style={{ padding: 0 }}>
                          <strong> Symbol</strong>{' '}
                        </Grid.Column>
                        <Grid.Column>
                          {' '}
                          <strong> Code</strong>
                        </Grid.Column>
                        <Grid.Column style={{ paddingRight: 0 }}>
                          <strong> Name</strong>
                        </Grid.Column>
                      </Grid.Row>
                      {country.currencies.map((curr) => (
                        <>
                          <Grid.Row
                            columns={3}
                            style={{ padding: 0 }}
                            key={curr.code}
                          >
                            <Grid.Column>{curr.symbol}</Grid.Column>
                            <Grid.Column>{curr.code}</Grid.Column>
                            <Grid.Column style={{ paddingRight: 0 }}>
                              {curr.name}
                            </Grid.Column>
                          </Grid.Row>
                          <Divider />
                        </>
                      ))}
                    </Grid>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </>
        ) : (
          <>
            <Segment style={{ padding: 0, margin: 0, borderWidth: 0 }}>
              {!isWeatherLoading && !isLoading ? (
                <>
                  <Weather
                    weather={weather}
                    unit={unit}
                    setUnit={setUnit}
                    setIsWeatherLoading={setIsWeatherLoading}
                    isMobile={isMobile}
                  />
                </>
              ) : (
                <Icon loading name="spinner" />
              )}
            </Segment>
          </>
        )}
      </Card>
    </Container>
  ) : (
    <>
      <Icon loading name="spinner" />{' '}
    </>
  )
}

export default Country
