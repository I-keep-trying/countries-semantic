import React, { useEffect, useContext, useRef } from 'react'
import { isMobile } from 'react-device-detect'
import {
  Menu,
  Container,
  Icon,
  Input,
  Checkbox,
  Rail,
  Sticky,
  Dropdown,
  Button,
  Flag,
} from 'semantic-ui-react'
import MyContext from '../context/MyContext'

const HeaderNav = ({
  inputRef,
  input,
  setInput,
  countries,
  isLoading,
  setIsLoading,
  region,
  setRegion,
  subregion,
  setSubRegion,
  unit,
  setUnit,
  isWeatherLoading,
  setIsWeatherLoading,
  handleUnitButtonClick,
}) => {
  const contextRef = useRef()

  const context = useContext(MyContext)
  const { dark, setDark, theme } = context

  // light/dark theme toggler
  const handleModeChange = () => setDark(!dark)

  useEffect(() => {
    const setThemeColors = () => {
      const { background, text } = theme
      document.body.style.backgroundColor = background
      document.getElementById('root').style.color = text
    }
    setThemeColors()
  })
  console.log('theme', theme)

  const clearInput = () => {
    setInput('')
    setRegion('All')
    setSubRegion('')
  }

  const handleChange = (e) => {
    if (countries.length === 1) {
      setRegion('All')
      setSubRegion('')
    }
    if (!inputRef.current) {
      inputRef.current = e.target
    }

    !isLoading ? setIsLoading(true) : isLoading
    setInput(e.target.value)

    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  if (countries.length === 1) {
    setRegion(countries[0].region)
    setSubRegion(countries[0].subregion)
  }

  // console.log('region - Header', countries[0].region)
  return isMobile ? (
    <Menu
      fixed="top"
      //    inverted
    >
      <Container>
        <Menu.Item
          style={{ paddingLeft: 2, paddingRight: 0, marginRight: 15 }}
          header
        >
          <Icon name="globe" color="teal" />
          <Menu.Menu>
            <Menu.Item style={{ padding: 0 }}>World</Menu.Item>
            <Menu.Item
              style={{
                paddingLeft: 0,
                paddingTop: 0,
                paddingBottom: 0,
                paddingRight: 7,
              }}
            >
              Countries
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item fitted>
          {input.length > 0 ? (
            <Input
              type="search"
              icon={<Icon name="close" link onClick={clearInput} />}
              // ref={inputRef}
              value={input}
              onChange={handleChange}
              placeholder="Start typing to search"
            />
          ) : (
            <Input
              icon={<Icon name="search" />}
              type="search"
              //    ref={inputRef}
              value={input}
              onChange={handleChange}
              placeholder="Start typing to search"
            />
          )}
        </Menu.Item>
        <Menu.Item style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Icon name="sun" size="big" />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            style={{ paddingLeft: 0, paddingRight: 0 }}
            as="a"
            href="https://github.com/I-keep-trying/countries-semantic"
          >
            <Icon name="github" size="big" />
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  ) : (
    <>
      <Menu
        fixed="top"
        className="top-header"
        style={{ backgroundColor: theme.elements }}
        //  inverted
      >
        <Container fluid>
          <Menu.Item header>
            <Icon name="globe" color="teal" size="big" />
            <p> World Countries</p>
          </Menu.Item>
          <Menu.Item>
            {input.length > 0 ? (
              <Input
                icon={<Icon name="close" link onClick={clearInput} />}
                type="search"
                value={input}
                onChange={handleChange}
              />
            ) : (
              <Input
                icon={<Icon name="search" />}
                type="search"
                value={input}
                onChange={handleChange}
                placeholder="Start typing to search"
              />
            )}
          </Menu.Item>

          <Menu.Menu position="right">
            <Dropdown item icon="cogs">
              <Dropdown.Menu >
                <Dropdown.Item >
                  {dark ? (
                    <Icon
                      name="sun"
                      size="mini"
                      link
                      onClick={() => handleModeChange()}
                    />
                  ) : (
                    <Icon
                      name="moon"
                      size="mini"
                      link
                      onClick={() => handleModeChange()}
                    />
                  )}
                </Dropdown.Item>
                <Dropdown.Item>
                  <Button.Group>
                    <>
                      <Button
                        basic={unit === 'metric' ? false : true}
                        color="black"
                        onClick={handleUnitButtonClick}
                      >
                        Metric
                      </Button>
                      <Button.Or />
                      <Button
                        basic={unit === 'metric' ? true : false}
                        color="black"
                        onClick={handleUnitButtonClick}
                      >
                        American <Flag name="us" />
                      </Button>
                    </>
                  </Button.Group>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/*  <Menu.Item
              as="a"
              href="https://github.com/I-keep-trying/countries-semantic"
            >
              <Icon name="github" size="big" />
            </Menu.Item> */}
          </Menu.Menu>
        </Container>
      </Menu>
    </>
  )
}

export default HeaderNav
