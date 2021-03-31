import React, { useRef, useEffect } from 'react'
import { Menu, Container, Icon, Input } from 'semantic-ui-react'

const Filter = ({ input, onChange, countries }) => {
  const inputRef = useRef()

  useEffect(() => {
    if (countries.length === 1) {
      inputRef.current.blur()
    }
  }, [countries])

  /*   if (countries.length === 1) {
    console.log('inputRef', inputRef.current.blur)
    inputRef.current.blur()
  } */

  return (
    <input
      type="text"
      ref={inputRef}
      value={input}
      onChange={onChange}
      placeholder="Start typing to search"
    />
  )
}

const HeaderNav = ({ input, handleChange, countries }) => {
  return (
    <Menu fixed="top" inverted>
      <Container fluid>
        <Menu.Item header>
          <Icon name="globe" color="grey" size="big" />
          <p> World Countries</p>
        </Menu.Item>
        <Menu.Item>
          {' '}
          <Filter input={input} onChange={handleChange} countries={countries} />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            as="a"
            href="https://github.com/I-keep-trying/countries-semantic"
          >
            <Icon name="github" size="big" />
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

export default HeaderNav
