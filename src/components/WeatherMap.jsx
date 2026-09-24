import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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

            <Marker position={[latitude, longitude]} />
        </MapContainer>
    );
}

export default WeatherMap;