import React, { useState } from 'react'
import { Divider, Menu, Container, Icon, Image } from 'semantic-ui-react'

const HeaderNav = () => {
  return (
    <Menu fixed="top" inverted>
      <Container fluid>
        <Menu.Item header>
          <Icon name="university" color="olive" size="big" />
          <p> World Countries</p>
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default HeaderNav
