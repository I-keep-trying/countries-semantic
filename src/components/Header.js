import React, { useRef, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { Menu, Container, Icon } from 'semantic-ui-react'

const HeaderNav = ({ input, handleChange, countries }) => {
  const inputRef = useRef()

  useEffect(() => {
    if (countries !== undefined) {
      if (countries.length === 1) {
        inputRef.current.blur()
      }
    }
  }, [countries])

  return isMobile ? (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item
          style={{ paddingLeft: 2, paddingRight: 0, marginRight: 15 }}
          header
        >
          <Icon name="globe" color="teal" size="large" />
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
          <input
            type="text"
            ref={inputRef}
            value={input}
            onChange={handleChange}
            placeholder="Start typing to search"
          />
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
      <Menu fixed="top" inverted>
        <Container fluid>
          <Menu.Item header>
            <Icon name="globe" color="teal" size="big" />
            <p> World Countries</p>
          </Menu.Item>
          <Menu.Item>
            <input
              type="text"
              ref={inputRef}
              value={input}
              onChange={handleChange}
              placeholder="Start typing to search"
            />
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
    </>
  )
}

export default HeaderNav
