import React, { useState } from 'react'
import { isMobile } from 'react-device-detect'
import ReactMapGL from 'react-map-gl'

const MapView = ({ lat, lng }) => {
  const [viewport, setViewport] = useState({
    latitude: 45,
    longitude: 73,
    zoom: 7,
  })

  const mapStyle = {
    width: '100%',
    height: 350,
  }

  const eventRecognizerOptions = isMobile
    ? {
        pan: { threshold: 10 },
        tap: { threshold: 5 },
      }
    : {}

  return (
    <div>
      {!isNaN(lat) ? (
        <ReactMapGL
          eventRecognizerOptions={eventRecognizerOptions}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          {...mapStyle}
          {...viewport}
          onViewportChange={(viewport) => {
            setViewport({ ...viewport, latitude: lat, longitude: lng })
          }}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default MapView
