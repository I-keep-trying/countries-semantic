import React from 'react'
import { isMobile } from 'react-device-detect'
import { Menu, Icon, Input } from 'semantic-ui-react'
import '../assets/css/App.css'

const HeaderNav = ({
  inputRef,
  input,
  setInput,
  countries,
  isLoading,
  setIsLoading,
  setRegion,
  setSubRegion,
}) => {
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

  return isMobile ? (
    <>
      <Menu inverted fixed="top" borderless fluid>
        <Menu.Item header>
          <Icon name="globe" color="teal" size="big" />
          <p> World Countries</p>
        </Menu.Item>
        <Menu.Menu position="right"></Menu.Menu>
      </Menu>
    </>
  ) : (
    <>
      <Menu inverted fixed="top" borderless>
        <Menu.Item header>
          <Icon className="App-logo" name="globe" color="teal" size="big" />
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
        <Menu.Menu position="right"></Menu.Menu>
      </Menu>
    </>
  )
}

export default HeaderNav
