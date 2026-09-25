import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIconRetina,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

function RecenterMap({ latitude, longitude }) {
    const map = useMap();

    map.setView([latitude, longitude]);

    return null;
}

function WeatherMap({ latitude, longitude }) {
    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={10}
            scrollWheelZoom={false}
            className="weather-map"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <RecenterMap
                latitude={latitude}
                longitude={longitude}
            />

            <Marker position={[latitude, longitude]} />
        </MapContainer>
    );
}

export default WeatherMap;