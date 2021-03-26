import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Divider,
  Container,
  Table,
  Button,
  Dropdown,
  Header,
  Segment,
  Image,
} from 'semantic-ui-react'
import Country from './Country'
//import country from '../all-countries'

const Countries = ({
  countries,
  setInput,
  region,
  regions,
  subregion,
  setRegion,
  setSubRegion,
  isLoading,
  setIsLoading,
}) => {
  const [details, setDetails] = useState({})
  /*   useEffect(() => {
    if (countries.length === 1) {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${countries[0].name}`)
        .then((result) => {
          setDetails(result.data[0])
          setIsLoading(false)
        })
    }
  }, [countries]) */

  const reset = () => {
    setInput('')
    setRegion('All')
    setSubRegion('')
  }

  if (countries.length === 0) {
    return (
      <>
        <p>no matches</p>
        <Button onClick={reset}>new search</Button>
      </>
    )
  }

  if (countries.length === 1) {
    //  setDetails(countries[0])
    return !isLoading ? (
      <Country
        setInput={setInput}
        setRegion={setRegion}
        isLoading={isLoading}
        country={details}
        // country={country[0]}
        setSubRegion={setSubRegion}
        setIsLoading={setIsLoading}
      />
    ) : (
      <></>
    )
  }

  const selectRegions = regions.map((r) => {
    const select = new Object({ key: r.id, value: r.region, text: r.region })
    return select
  })

  const filterSubRegions = regions.filter((r, i) => {
    if (r.subregions !== undefined) {
      return r.region === region
    }
  })

  const selectSubregions = filterSubRegions.map((s) =>
    s.subregions.map((sr) => {
      return new Object({ key: sr, value: sr, text: sr })
    })
  )

  const handleChange = (e, { value }) => {
    setSubRegion('')
    setRegion(value)
  }

  const handleSubregionChange = (e, { value }) => {
    setSubRegion(value)
  }

  const handleClick = (c) => {
    setDetails(countries[0])
    setIsLoading(false)
    setInput(c.name)
  }

  return (
    <>
      <Container inverted>
        <Header as="h3">Region</Header>
        {selectSubregions.length === 1 ? (
          <>
            <Container inverted>
              <Dropdown
                onChange={handleChange}
                options={selectRegions}
                selection
                value={region}
                deburr
                search
              />
              <Header as="h3">SubRegion</Header>
              <Dropdown
                onChange={handleSubregionChange}
                options={selectSubregions[0]}
                selection
                value={subregion}
                deburr
                search
              />
            </Container>
          </>
        ) : (
          <>
            <Container inverted>
              <Dropdown
                onChange={handleChange}
                options={selectRegions}
                selection
                value={region}
                deburr
                search
              />
            </Container>
          </>
        )}
      </Container>
      {/*   <Table>
          <Table.Body>
           {countries.map((c) => {
              return (
                <Table.Row key={c.id}>
                  <Table.Cell style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <Image size="tiny" src={c.flag} alt="country flag" />
                  </Table.Cell>

                  <Table.Cell>{c.name}</Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => handleClick(c)}>Details</Button>
                  </Table.Cell>
                </Table.Row>
              )
            })} 
          </Table.Body>
        </Table> */}
    </>
  )
}

export default Countries
