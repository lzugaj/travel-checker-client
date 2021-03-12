import React, { useState, useRef, useCallback } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import axios from 'axios';

import CustomMarker from '../../components/CustomMarker/CustomMarker';

import * as Constant from '../../constants/Constant';
import markerIcon from '../../images/marker-icon.png';

import classes from './MapManager.css';

const MapManager = () => {
    const [viewport, setViewport] = useState({
        latitude: 45.7986618,
        longitude: 15.8901454,
        zoom: 15
    });

    const mapRef = useRef();

    const [marker, setMarker] = useState([])
    
    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );

    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            const geocoderDefaultOverrides = { transitionDuration: 1000 };
            return handleViewportChange({
            ...newViewport,
            ...geocoderDefaultOverrides
            });
        },
        []
    );

    const handleClick = (map, event) => {
        console.log('Map latitude and longitude: ', map.lngLat);
        let newMarker = {
            longitude: map.lngLat[0],
            latitude: map.lngLat[1]
        }

        setMarker([
            ...marker,
            newMarker
        ])
    }

    const handleFetchData = () => {
        axios.get("http://localhost:8080/api/v1/travel-checker/markers")
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    return (
        <div style={{ height: "100vh" }}>
          <MapGL
            ref={mapRef}
            {...viewport}
            width="100%"
            height="100%"
            onViewportChange={handleViewportChange}
            mapboxApiAccessToken={Constant.MAP_BOX_TOKEN}
            onClick={handleClick}
          >
            <Geocoder
              mapRef={mapRef}
              onViewportChange={handleGeocoderViewportChange}
              mapboxApiAccessToken={Constant.MAP_BOX_TOKEN}
              position="top-left"
            />

            {
                marker.map((element, index) => {
                    console.log(element);
                    return(
                        <Marker 
                            longitude={element.longitude}
                            latitude={element.latitude}
                        >
                            <div>
                                <span>
                                    <img src={markerIcon} width="30" height="25" styles={classes.Marker} />
                                </span>
                            </div>
                        </Marker>
                    );
                })
            }

            {handleFetchData()}
          </MapGL>
        </div>
    );
}

export default MapManager;