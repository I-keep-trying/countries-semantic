import React, { useState, useEffect, useRef, useReducer } from 'react'
import { isMobile } from 'react-device-detect'
import ReactMapGL from 'react-map-gl'
import './mapbox-gl.css'

const initialState = {
  latitude: 45,
  longitude: 73,
  zoom: 7,
}

const viewportReducer = (state, action) => {
  switch (action.type) {
    case 'VIEWPORT_CHANGED': {
      console.log('state', state)
      console.log('action.payload', action.payload)
      return {
        ...state,
        latitude: action.payload.lat,
        longitude: action.payload.lng,
      }
    }
    case 'RESET': {
      return initialState
    }

    default:
      throw new Error(`Not supported action ${action.type}`)
  }
}

const MapView = ({ lat, lng }) => {
  const [viewport, dispatch] = useReducer(viewportReducer, initialState)
  const isMountedRef = useRef(null)

  const mapStyle = {
    width: '100%',
    height: 350,
  }

  const handleViewportChange = (viewport) => {
    dispatch({ type: 'VIEWPORT_CHANGED', payload: { viewport, lat, lng } })
  }

  return (
    <div>
      {!isNaN(lat) ? (
        <ReactMapGL
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          {...mapStyle}
          {...viewport}
          onViewportChange={handleViewportChange}
        />
      ) : (
        <div>Loading...</div>
      )}
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
