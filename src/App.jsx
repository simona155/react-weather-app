import { useState } from 'react';
import { getCoordinates, getWeather } from './services/weatherApi';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  const handleSearch = async () => {
    setWeather(null);
    setLocation(null);
    setError('');

    if (!city.trim()) {
      setError('Please enter a city.');
      return;
    }

    setLoading(true);

    try {
      const cityData = await getCoordinates(city);

      if (!cityData) {
        setError('City not found.');
        return;
      }

      setLocation(cityData);

      const weatherData = await getWeather(
        cityData.latitude,
        cityData.longitude
      );

      setWeather(weatherData);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`weather-app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="weather-content py-5">
        <header className="text-center mb-5">
          <button
            className="mode-button"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          <h1 className="app-title">Weather</h1>

          <p className="app-subtitle">
            Check the weather anywhere in the world
          </p>
        </header>

        <div className="row justify-content-center mb-5">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="search-box input-group">
              <input
                type="text"
                className="form-control"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder="Search for a city..."
              />

              <button
                className="btn search-button"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="alert alert-danger text-center">
                {error}
              </div>
            </div>
          </div>
        )}

        {loading && (
          <p className="loading-text text-center">
            Loading...
          </p>
        )}

        {weather && !loading && (
          <WeatherDisplay
            weather={weather}
            location={location}
          />
        )}
      </div>
    </div>
  );
}

export default App;