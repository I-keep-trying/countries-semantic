import React, { PureComponent } from 'react'
import ReactMapGL from 'react-map-gl'

const mapStyle = {
  width: '100%',
  height: 600,
}

const mapboxApiKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

class MapView extends PureComponent {
  constructor(props) {
    // console.log('props', props) // always {}
    super(props)
    this.state = {
      viewport: {
        latitude: 45.50884,
        longitude: -73.58781,
        zoom: 15,
      },
    }
  }

  render() {
    const { viewport } = this.state
   
    /* 
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
    return (
      <div>
        <ReactMapGL
          mapboxApiAccessToken={mapboxApiKey}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          {...viewport}
          {...mapStyle}
          onViewportChange={(viewport) => {
            this.setState({ viewport })
          }}
        ></ReactMapGL>
      </div>
    )
  }
}

export default MapView
