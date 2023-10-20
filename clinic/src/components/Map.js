import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const Map = () => {
    return (
        <section>
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="Map data © OpenStreetMap contributors"
                />
                <Marker position={[51.505, -0.09]} />
            </MapContainer>
        </section>
    )
}

export default Map