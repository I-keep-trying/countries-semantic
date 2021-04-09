import React, { useState, useEffect } from 'react'
import './Map.css'
import 'ol/ol.css'
import MapContext from './MapContext'
import * as ol from 'ol'

const Map = ({ children, center }) => {
  const [map, setMap] = useState(null)
  console.log('center fromLonLat', center)
  useEffect(() => {
    let options = {
      target: 'map',
      view: new ol.View({
        zoom: 7,
        center: center,
      }),
    }
    let mapObject = new ol.Map(options)
    setMap(mapObject)
  }, [center])

  return (
    <MapContext.Provider value={{ map }}>
      {String()}
      <div id="map" className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  )
}
export default Map
