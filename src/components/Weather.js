import React, { useState } from 'react'
import {
  Card,
  Header,
  Image,
  Item,
  Grid,
  Button,
  Icon,
  Menu,
} from 'semantic-ui-react'
import moment from 'moment'
import Images from '../images/weather-animated/index'
import '../owm-right.css'

function WeatherWidget({
  weather,
  unit,
  setUnit,
  setIsWeatherLoading,
  isMobile,
}) {
  const [activeItem, setActiveItem] = useState(unit)

  const code = weather.weather[0].icon
  const icon = Images[code].path
  const alt = Images[code].alt
  const date = moment.unix(weather.dt).format('YYYY-MM-DD, h:mm a')

  /*   const setToggle = (e) => {
    e.preventDefault()
    if (unit === 'metric') {
      setIsWeatherLoading(true)
      setUnit('imperial')
      return true
    } else {
      setIsWeatherLoading(true)
      setUnit('metric')
      return false
    }
  } */

  const handleItemClick = (e, { name }) => {
    setUnit(name)
    setActiveItem(name)
  }

  // const bgStyle = isMobile ? { background: 'linear-gradient(to bottom, #feb020, #ffd05c)', padding: 0 } : {background: 'blue'}

  return (
    <>
      <Grid style={{ margin: 0 }}>
        {/* toggle, description, icon */}
        <Grid.Row
          style={{
            background: 'linear-gradient(to bottom, #feb020, #ffd05c)',
            padding: 0,
          }}
        >
          <Grid.Column verticalAlign="middle" width={12}>
            <Header>{weather.weather[0].description}</Header>
          </Grid.Column>
          <Grid.Column style={{ padding: 0 }} width={4}>
            <Image src={icon} alt={alt} />
          </Grid.Column>
        </Grid.Row>
        {/* temp, details */}
        <Grid.Row columns={2}>
          {/* temp */}
          <Grid.Column
            style={{ paddingLeft: 0, paddingRight: 0 }}
            textAlign="center"
            verticalAlign="middle"
            width={6}
          >
            <Header style={{ fontSize: '3rem' }}>
              {Math.round(weather.main.temp)}
              {`° `}
             {unit === 'metric' ? 'C' : 'F'}
            {/*   {activeItem === 'metric' ? 'C' : 'F'} */}
            </Header>
          </Grid.Column>
          {/* details */}
          <Grid.Column width={10}>
            <Grid.Row>
              <Header
                style={{
                  borderBottomStyle: 'solid',
                  borderBottomColor: 'teal',
                  borderBottomWidth: 'thin',
                }}
                as="h4"
              >
                Details
              </Header>
            </Grid.Row>

            <Grid>
              <Grid.Column width={8}>
                <Grid.Row>Feels like</Grid.Row>
                <Grid.Row>Wind</Grid.Row>
                <Grid.Row>Humidity</Grid.Row>
                <Grid.Row>Pressure</Grid.Row>{' '}
              </Grid.Column>
              <Grid.Column width={8}>
                <Grid.Row></Grid.Row>
                <Grid.Row>
                  {' '}
                  {Math.round(weather.main.feels_like)}
                  {`° `}
                  {/* {unit === 'metric' ? 'C' : 'F'} */}
                  {activeItem === 'metric' ? 'C' : 'F'}
                </Grid.Row>
                <Grid.Row>
                  {weather.wind.speed}
                  {/* {unit === 'metric' ? 'kph' : 'mph'} */}
                  {activeItem === 'metric' ? 'kph' : 'mph'}
                </Grid.Row>
                <Grid.Row>{weather.main.humidity}%</Grid.Row>
                <Grid.Row>{weather.main.pressure} hPa</Grid.Row>
              </Grid.Column>
            </Grid>
          </Grid.Column>{' '}
        </Grid.Row>
        {/* retrieved date */}
        <Grid.Row
          columns={1}
          style={{
            background: 'linear-gradient(to bottom, #feb020, #ffd05c)',
            paddingTop: 4,
            paddingBottom: 2,
          }}
        >
          <Grid.Column
            textAlign="right"
            style={{ paddingTop: 0, paddingBottom: 0, paddingRight: 5 }}
          >
            <Header style={{ fontSize: '.75rem', padding: 0 }} as="h6">
              Reported: {date}{' '}
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <div></div>
    </>
  )
}

export default WeatherWidget
