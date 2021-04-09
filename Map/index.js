import React, { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import ReactMapGL from 'react-map-gl'
import './mapbox-gl.css'

const MapView = ({ lat, lng, viewport, handleViewportChange }) => {
  console.log('lat', lat)
  /*   const [viewport, setViewport] = useState({
    latitude: 45,
    longitude: 73,
    zoom: 7,
  })

  const mapStyle = {
    width: '100%',
    height: 350,
  }

  const handleViewportChange = (viewport) => {
    setViewport({ ...viewport, latitude: lat, longitude: lng })
  } */
  const mapStyle = {
    width: '100%',
    height: 350,
  }

  return (
    <div>
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        {...mapStyle}
        {...viewport}
        onViewportChange={handleViewportChange}
      />
    </div>
  )
}

export default MapView

/* 
   Viewport object returned from ReactMapGL, for reference:
     {viewport:
    { altitude: 1.5
      bearing: 0
      height: 600
      latitude: 45.50884
      longitude: -73.58781
      maxPitch: 85
      maxZoom: 24
      minPitch: 0
      minZoom: 0
      pitch: 0
      transitionDuration: 0
      transitionEasing: ƒ transitionEasing(t)
      transitionInterpolator: LinearInterpolator {propNames: Array(5)}
      transitionInterruption: 1
      width: 430
      zoom: 15}
     } */
