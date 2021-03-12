import React from 'react';
import { Marker } from 'react-map-gl';

const customMarker = ({index, element}) => {
    console.log(element);
    console.log(index);
    return (
        <Marker
            longitude={element.longitude}
            latitude={element.latitude}>
            <div>
                <span><b>{index + 1}</b></span>
            </div>
        </Marker>
    );    
}

export default customMarker;