import getWeatherDescription from '../utils/weatherConditions';

function WeatherDisplay({ weather, location }) {
    const currentWeather = weather.current;
    const dailyWeather = weather.daily;

    const weatherDescription = getWeatherDescription(
        currentWeather.weather_code
    );

    const getDayName = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'short'
        });
    };

    const temperatures = dailyWeather.temperature_2m_min.flatMap(
        (min, index) => [
            min,
            dailyWeather.temperature_2m_max[index]
        ]
    );

    const lowestTemperature = Math.min(...temperatures);
    const highestTemperature = Math.max(...temperatures);
    const temperatureRange = highestTemperature - lowestTemperature;

    return (
        <div className="weather-dashboard">
            <div className="current-weather-card">
                <h2 className="weather-location">{location.name}</h2>

                <p className="weather-description">
                    {weatherDescription}
                </p>

                <p className="current-temperature">
                    {Math.round(currentWeather.temperature_2m)}°C
                </p>

                <p className="feels-like">
                    Feels like {Math.round(currentWeather.apparent_temperature)}°C
                </p>

                <div className="weather-details">
                    <div className="weather-detail">
                        <svg
                            className="detail-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <path d="M12 3.5C12 3.5 6 10.2 6 14.5a6 6 0 0 0 12 0C18 10.2 12 3.5 12 3.5Z" />
                        </svg>

                        <span className="detail-value">
                            {currentWeather.relative_humidity_2m}%
                        </span>

                        <span className="detail-label">
                            Humidity
                        </span>
                    </div>

                    <div className="weather-detail">
                        <svg
                            className="detail-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <path d="M3 8h12a3 3 0 1 0-3-3" />
                            <path d="M3 12h16a3 3 0 1 1-3 3" />
                            <path d="M3 16h10" />
                        </svg>

                        <span className="detail-value">
                            {Math.round(currentWeather.wind_speed_10m)} km/h
                        </span>

                        <span className="detail-label">
                            Wind
                        </span>
                    </div>
                </div>
            </div>

            <h3 className="forecast-title">7-Day Forecast</h3>

            <div className="forecast-list">
                {dailyWeather.time.map((date, index) => {
                    const minTemperature =
                        dailyWeather.temperature_2m_min[index];

                    const maxTemperature =
                        dailyWeather.temperature_2m_max[index];

                    const topPosition =
                        ((highestTemperature - maxTemperature) /
                            temperatureRange) *
                        100;

                    const bottomPosition =
                        ((highestTemperature - minTemperature) /
                            temperatureRange) *
                        100;

                    return (
                        <div className="forecast-day" key={date}>
                            <span className="forecast-day-name">
                                {index === 0 ? 'Today' : getDayName(date)}
                            </span>

                            <span className="forecast-condition">
                                {getWeatherDescription(
                                    dailyWeather.weather_code[index]
                                )}
                            </span>

                            <span className="forecast-temperature">
                                {Math.round(minTemperature)}°
                            </span>

                            <div className="temperature-bar">
                                <div
                                    className="temperature-range"
                                    style={{
                                        top: `${topPosition}%`,
                                        height: `${bottomPosition - topPosition}%`
                                    }}
                                />
                            </div>

                            <span className="forecast-temperature">
                                {Math.round(maxTemperature)}°
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default WeatherDisplay;