import { useEffect, useState } from 'react';
import { getCoordinates, getWeather } from '../services/weatherApi';
import getWeatherDescription from '../utils/weatherConditions';

function Cities({ onCitySelect }) {
    const [search, setSearch] = useState('');
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);
    const [error, setError] = useState('');

    const defaultCities = [
        'Skopje',
        'London',
        'Paris',
        'Tokyo',
        'New York'
    ];

    const loadCity = async (cityName) => {
        const location = await getCoordinates(cityName);

        if (!location) {
            return null;
        }

        const weather = await getWeather(
            location.latitude,
            location.longitude
        );

        return {
            name: location.name,
            temperature: Math.round(
                weather.current.temperature_2m
            ),
            condition: getWeatherDescription(
                weather.current.weather_code
            )
        };
    };

    const loadDefaultCities = async () => {
        setLoading(true);
        setError('');

        try {
            const results = await Promise.all(
                defaultCities.map((city) => loadCity(city))
            );

            setCities(results.filter(Boolean));
        } catch {
            setError('Could not load cities.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDefaultCities();
    }, []);

    const handleSearch = async () => {
        if (!search.trim()) {
            return;
        }

        setSearchLoading(true);
        setError('');

        try {
            const city = await loadCity(search);

            if (!city) {
                setCities([]);
                setError('City not found.');
                return;
            }

            setCities([city]);
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setSearchLoading(false);
        }
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;

        setSearch(value);

        if (!value.trim()) {
            loadDefaultCities();
        }
    };

    return (
        <div className="cities-page container-fluid px-0">
            <div className="mb-4">
                <div className="search-box d-flex w-100">
                    <input
                        className="form-control"
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                        placeholder="Search for a city..."
                    />

                    <button
                        className="btn btn-primary"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
            </div>

            {(loading || searchLoading) && (
                <p className="text-secondary">
                    Loading...
                </p>
            )}

            {!loading && !searchLoading && (
                <div className="d-flex flex-column gap-3">
                    {cities.map((city) => (
                        <button
                            key={city.name}
                            className="city-card d-flex align-items-center justify-content-between w-100 text-start border-0"
                            onClick={() => onCitySelect(city.name)}
                        >
                            <div className="d-flex align-items-center gap-3">
                                <div className="city-icon d-flex align-items-center justify-content-center rounded-3">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <path d="M12 21s7-6.2 7-12A7 7 0 0 0 5 9c0 5.8 7 12 7 12Z" />
                                        <circle cx="12" cy="9" r="2.5" />
                                    </svg>
                                </div>

                                <div>
                                    <h5 className="city-name mb-1">
                                        {city.name}
                                    </h5>

                                    <span className="city-condition">
                                        {city.condition}
                                    </span>
                                </div>
                            </div>

                            <div className="city-temperature">
                                {city.temperature}°C
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Cities;