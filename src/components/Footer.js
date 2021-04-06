import React from 'react'
import { Menu, Header } from 'semantic-ui-react'

const Footer = () => {
  return (
    <>
      <Menu fixed="bottom" className="ui fluid three item menu">
        <Menu.Item>
          <Header as="h6">Made by Andrea Crego</Header>
        </Menu.Item>
      </Menu>
    </>
  )
}

export default Footer
