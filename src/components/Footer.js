import React from 'react'
import { Menu, Header, Icon } from 'semantic-ui-react'

const Footer = () => {
  return (
    <>
      <Menu fixed="bottom" className="ui fluid two item menu">
        <Menu.Item>
          <Header as="h5">Made by Andrea Crego</Header>
        </Menu.Item>
        <Menu.Item
          as="a"
          href="https://github.com/I-keep-trying/countries-semantic"
        >
          <Icon name="github" size="big" />
        </Menu.Item>
      </Menu>
    </>
  )
}

export default Footer
