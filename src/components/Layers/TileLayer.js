import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import {Tile} from "ol/layer";


const TileLayer = ({ name, description, source, zIndex = 0 }) => {

    const { map } = useContext(MapContext);

    useEffect(() => {
        if (!map) return;

        let tileLayer = new Tile({
            name,
            description,
            source,
            zIndex,
        });
        map.addLayer(tileLayer);
        tileLayer.setZIndex(zIndex);

        return () => {
            if (map) {
                map.removeLayer(tileLayer);
            }
        };
    },
        [map, source, zIndex, description, name])

    return null;
};
export default TileLayer;