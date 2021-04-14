import React, { useState, Component, createRef } from 'react'
import {
  Checkbox,
  Grid,
  Header,
  Image,
  Rail,
  Ref,
  Segment,
  Sticky,
  Icon
} from 'semantic-ui-react'

const Placeholder = () => (
  <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
)

const App = () => {
  const [state, setState] = useState({ active: true })
  //  state = { active: true }
  const contextRef = createRef()

  const handleToggle = () =>
    setState((prevState) => ({ active: !prevState.active }))

  // const { active } = state

  return (
    <Grid centered columns={3}>
      <Grid.Column>
        <Ref innerRef={contextRef}>
          <Segment>
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />

            <Rail position="left">
              <Sticky context={contextRef}>
                <Checkbox
                as='Icon'
                    checked={state.active}
                    label="Activate Sticky on right"
                    onChange={handleToggle}
                    toggle
                  />
              </Sticky>
            </Rail>

            <Rail position="right">
              <Sticky active={state.active} context={contextRef}>
                <Header as="h3">Stuck Content</Header>
                <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
              </Sticky>
            </Rail>
          </Segment>
        </Ref>
      </Grid.Column>
    </Grid>
  )
}

export default App
