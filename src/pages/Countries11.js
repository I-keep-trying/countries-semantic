import React, { useState } from 'react'
import { Dropdown, Grid, Segment } from 'semantic-ui-react'

const Countries = ({ countries, regions, region, setRegion }) => {
  const selectRegions = regions.map(
    (r) => new Object({ key: r.id, value: r.region, text: r.region })
  )

  const handleChange = (e, { value }) => {
    setRegion(value)
  }

  console.log('value', region)

  return (
    <Grid columns={3}>
      <Grid.Column>
        <Dropdown
          onChange={handleChange}
          options={selectRegions}
          placeholder="Choose an option"
          selection
          value={region}
        />
      </Grid.Column>
      <Grid.Column>
        <Segment secondary>
          {countries.map((c) => {
            return (
              <>
                <div>
                  {JSON.stringify(c.name)} {' - '} {JSON.stringify(c.region)}
                </div>
              </>
            )
          })}
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment secondary>
          <pre>Current value: {region}</pre>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default Countries
