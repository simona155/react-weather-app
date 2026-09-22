import getWeatherDescription from '../utils/weatherConditions';

function WeatherDisplay({ weather, location }) {
    const weatherDescription = getWeatherDescription(weather.weather_code);

    return (
        <>
            <h2>{location.name}</h2>

            <p>
                {weatherDescription}
            </p>

            <p>
                Temperature: {weather.temperature_2m}°C
            </p>

            <p>
                Feels like: {weather.apparent_temperature}°C
            </p>

            <p>
                Humidity: {weather.relative_humidity_2m}%
            </p>

            <p>
                Wind: {weather.wind_speed_10m} km/h
            </p>
        </>
    );
}

export default WeatherDisplay;
