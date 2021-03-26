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
}) => {
  const [weather, setWeather] = useState({})
  const [unit, setUnit] = useState('metric')
  const [isWeatherLoading, setIsWeatherLoading] = useState(true)
  const [activeItem, setActiveItem] = useState('Details')

  console.log('country component', country)
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

  const handleItemClick = (e, { name }) => setActiveItem(name)
  console.log('weather', weather)
  //<img src={`/icons/${iconName}.png`} ... />
  return !isLoading ? (
    <>

      <Card fluid>
        <Button basic onClick={reset}>
          Back
        </Button>
        <Menu tabular>
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
        {activeItem === 'Details' ? (
          <Segment>
            <Image src={country.flag} alt="country flag" />
            <Table attached="top">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell selectable>
                    Endonym
                    <Popup
                      content={
                        'An endonym (also known as autonym) is a common, internal name for a geographical place, group of people, or a language/dialect, that is used only inside that particular place, group, or linguistic community.'
                      }
                      style={{
                        borderRadius: 0,
                        opacity: 0.7,
                        padding: '2em',
                      }}
                      inverted
                      aria-label="An endonym (also known as autonym) is a common, internal name for a geographical place, group of people, or a language/dialect, that is used only inside that particular place, group, or linguistic community."
                    ></Popup>
                    <a href="https://en.wikipedia.org/wiki/Endonym_and_exonym">
                      <Icon name="external" />
                    </a>
                  </Table.HeaderCell>
                  <Table.HeaderCell>Capital</Table.HeaderCell>
                  <Table.HeaderCell isNumeric>Population</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>{country.nativeName}</Table.Cell>
                  <Table.Cell>{country.capital}</Table.Cell>
                  <Table.Cell isNumeric>
                    {country.population.toLocaleString()}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Languages</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {country.languages.map((lang) => (
                  <Table.Row key={lang.name}>
                    <Table.Cell>{lang.name}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Segment>
        ) : (
          <Segment>
            WEATHER
            {JSON.stringify(weather)}
            {/* {!isWeatherLoading ? (
                <Weather
                  weather={weather}
                  unit={unit}
                  setUnit={setUnit}
                  setIsWeatherLoading={setIsWeatherLoading}
                />
              ) : (
                <Text>Weather loading...</Text>
              )} */}
          </Segment>
        )}
      </Card>
      {/* <Box mb={5}>
        <Button basic onClick={reset}>
          Back
        </Button>
      </Box>
      <Tabs isFitted isLazy>
        <TabList>
          <Tab>
            <Heading
              textAlign="center"
              fontSize="xl"
            >{`${country.name} Details`}</Heading>
          </Tab>
          <Tab>
            {' '}
            <Heading
              textAlign="center"
              fontSize="xl"
            >{`Weather in ${country.name}`}</Heading>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel id="tab panel" mb={12}>
            <Box
              id="details Box"
              borderWidth="3px"
              shadow="md"
              borderRadius="20px"
              textAlign="left"
            >
              <VStack id="details VStack" display={{ sm: 'flex' }} spacing={4}>
                <Image
                  borderTopLeftRadius="20px"
                  borderTopRightRadius="20px"
                  src={country.flag}
                  alt="country flag"
                />
                <Table size="sm" id="Table">
                  <Thead>
                    <Tr>
                      <Th>
                        <Link
                          href="https://en.wikipedia.org/wiki/Endonym_and_exonym"
                          isExternal
                        >
                          <Tooltip
                            label={
                              <Text as="i" color="gray.500">
                                An endonym (from Greek: éndon,
                                `&#39;`inner`&#39;` + ónoma, `&#39;`name`&#39;`;
                                also known as autonym) is a common, internal
                                name for a geographical place, group of people,
                                or a language/dialect, that is used only inside
                                that particular place, group, or linguistic
                                community.
                              </Text>
                            }
                            aria-label="An endonym (from Greek: éndon, 'inner' + ónoma, 'name'; also known as autonym) is a common, internal name for a geographical place, group of people, or a language/dialect, that is used only inside that particular place, group, or linguistic community."
                          >
                            Endonym
                          </Tooltip>
                          <ExternalLinkIcon mx="2px" />
                        </Link>
                      </Th>
                      <Th>Capital</Th>
                      <Th isNumeric>Population</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    <Tr>
                      <Td>{country.nativeName}</Td>
                      <Td>{country.capital}</Td>
                      <Td isNumeric>{country.population.toLocaleString()}</Td>
                    </Tr>
                  </Tbody>
                </Table>
                <Table mb={4} size="sm">
                  <Thead>
                    <Tr>
                      <Th>Languages</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {country.languages.map(lang => (
                      <Tr key={lang.name}>
                        <Td>{lang.name}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </VStack>
            </Box>
          </TabPanel>
          <TabPanel>
            <Center
              shadow="md"
              borderRadius="20px"
              borderWidth="3px"
              id="weather Center"
              p={0}
            >
              {!isWeatherLoading ? (
                <Weather
                  weather={weather}
                  unit={unit}
                  setUnit={setUnit}
                  setIsWeatherLoading={setIsWeatherLoading}
                />
              ) : (
                <Text>Weather loading...</Text>
              )}
            </Center>
          </TabPanel>
        </TabPanels>
      </Tabs> */}
    </>
  ) : (
    <> {/* <Text>Loading... </Text> */} </>
  )
}

export default Country
