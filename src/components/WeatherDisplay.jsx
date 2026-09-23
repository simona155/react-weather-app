import getWeatherDescription from '../utils/weatherConditions';

function WeatherDisplay({ weather, location }) {
    const currentWeather = weather.current;
    const dailyWeather = weather.daily;

    const weatherDescription = getWeatherDescription(
        currentWeather.weather_code
    );

    return (
        <>
            <h2 className="weather-location">{location.name}</h2>

            <p>
                {weatherDescription}
            </p>

            <p>
                Temperature: {currentWeather.temperature_2m}°C
            </p>

            <p>
                Feels like: {currentWeather.apparent_temperature}°C
            </p>

            <p>
                Humidity: {currentWeather.relative_humidity_2m}%
            </p>

            <p>
                Wind: {currentWeather.wind_speed_10m} km/h
            </p>

            <h3>7-Day Forecast</h3>

            {dailyWeather.time.slice(0, 7).map((date, index) => (
                <div key={date}>
                    <h4>{date}</h4>

                    <p>
                        {getWeatherDescription(dailyWeather.weather_code[index])}
                    </p>

                    <p>
                        High: {dailyWeather.temperature_2m_max[index]}°C
                    </p>

                    <p>
                        Low: {dailyWeather.temperature_2m_min[index]}°C
                    </p>
                </div>
            ))}
        </>
    );
}

export default WeatherDisplay;