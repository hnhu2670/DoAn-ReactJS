import React from 'react'
import GoogleMapReact from 'google-map-react';

export default function Map() {
    const defaultProps = {
        center: {
            lat: 60,
            lng: 77.01502627
        },
        zoom: 11
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '50vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyB-M500zF9hEI3OoOPyK_dVHfWDyZcx5fI" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >

            </GoogleMapReact>
        </div>
    );
}