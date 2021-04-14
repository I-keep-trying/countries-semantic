import React, { useState, useEffect } from 'react'
import Map from '../Map/Map'
import TileLayer from '../Layers/TileLayer'
import Controls from '../Controls'
import { fromLonLat } from 'ol/proj'
import * as olSource from 'ol/source'

const MapPage = ({ lat, lng }) => {
  const [center, setCenter] = useState(null)
  const [loading, setLoading] = useState(true)
  const source = new olSource.OSM()
  useEffect(() => {
    // console.log('useEffect center', center)
    //  console.log('useEffect loading', loading)
    setCenter([lng, lat])
    setLoading(false)
  }, [])
  console.log('global center', center)
  // console.log('global loading', loading)
  return !loading ? (
    <>
      <Map center={fromLonLat(center)}>
        <TileLayer
          name="Map"
          description="open street map"
          source={source}
          zIndex={0}
        />
        <Controls />
      </Map>
    </>
  ) : (
    <>Map Loading...</>
  )
}

export default React.memo(MapPage)
