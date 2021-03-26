import React from 'react'
import { Card, Header, Image } from 'semantic-ui-react'
import moment from 'moment'
import Images from '../images/weather-animated/index'
//import '../owm-right.css'

const WeatherIcon = ({ src, alt }) => <Image src={src} alt={alt} />

function Details({ title }) {
  return (
    <></>
    /*  <Stack spacing={0}>
      <Box borderBottom="1px" borderBottomColor="cyan.400" pl={1} mr={2}>
        <Heading fontSize="l">{title}</Heading>
      </Box>
    </Stack> */
  )
}

function DetailsList({ weather, feels, wind, hum, press, unit }) {
  return (
    <>
      {/*     <Stack spacing={0}>
      <Box p={1}>
        <HStack>
          <Text w="50%" fontSize="sm" mt={0}>
            {feels}
          </Text>
          <Text as="strong" fontSize="sm" mt={0}>
            {Math.round(weather.main.feels_like)} <Text as="sup">°</Text> {unit === 'metric' ? 'C' : 'F'}
          </Text>

         
        </HStack>

        <HStack>
          <Text w="50%" fontSize="sm" mt={0}>
            {wind}
          </Text>
          <Text as="strong" fontSize="sm" mt={0}>
            {weather.wind.speed} mph
          </Text>
        </HStack>

        <HStack>
          <Text w="50%" fontSize="sm" mt={0}>
            {hum}
          </Text>
          <Text as="strong" fontSize="sm" mt={0}>
            {weather.main.humidity}%
          </Text>
        </HStack>

        <HStack>
          <Text w="50%" fontSize="sm" mt={0}>
            {press}
          </Text>
          <Text as="strong" fontSize="sm" mt={0}>
            {weather.main.pressure} hPa
          </Text>
        </HStack>
      </Box>
    </Stack> */}
    </>
  )
}

function WeatherWidget({ weather, unit, setUnit, setIsWeatherLoading }) {
  const code = weather.weather[0].icon
  const icon = Images[code].path
  const alt = Images[code].alt
  const date = moment.unix(weather.dt).format('YYYY-MM-DD, h:mm a')

  const setToggle = (e) => {
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
  }

  return (
    <>
      {/* 
      <Box id="weather Box" shadow="md" w="100%">
        <VStack
          borderTopLeftRadius="20px"
          borderTopRightRadius="20px"
          className="widget-right--brown"
          spacing={0}
          align="stretch"
        >
          <HStack spacing={0}>
            <Container>
              <HStack>
                <Header as='h1'>
                  C
                </Header>
                <Switch
                  colorScheme="whiteAlpha"
                  size="lg"
                  value={unit}
                  isChecked={unit === 'imperial'}
                  onChange={setToggle}
                />
                <Header as='h1'>
                  F
                </Header>
              </HStack>

              <Header >{weather.weather[0].description}</Header>
            </Container>
            <WeatherIcon src={icon} alt={alt} />
          </HStack>
        </VStack>

        <HStack display={{ sm: 'flex' }} spacing={0}>
          <Center w="40%">
            <Header>
              {Math.round(weather.main.temp)}
              <Header>°</Header>
              {unit === 'metric' ? 'C' : 'F'}
            </Header>
          </Center>

          <Stack w="60%" p={5}>
            <Details title="Details" />
            <DetailsList
              feels="Feels like"
              wind="Wind"
              hum="Humidity"
              press="Pressure"
              weather={weather}
              unit={unit}
            />
          </Stack>
        </HStack>
        <HStack
          borderBottomLeftRadius="20px"
          borderBottomRightRadius="20px"
          className="widget-right--brown"
        >
          <Container textAlign="right" spacing={0}>
            <Header as='h6'>Reported: {date} </Header>
          </Container>
        </HStack>
      </Box> */}
    </>
  )
}

export default WeatherWidget
