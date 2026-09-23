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

  const searchBox = (
    <div className="search-box">
      <input
        type="text"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleSearch();
          }
        }}
        placeholder="Search for a city..."
      />

      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );

  return (
    <div className={`weather-app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <aside className="sidebar">
        <div>
          <div className="brand">
            <div className="brand-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="M4.93 4.93l1.42 1.42" />
                <path d="M17.65 17.65l1.42 1.42" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="M4.93 19.07l1.42-1.42" />
                <path d="M17.65 6.35l1.42-1.42" />
              </svg>
            </div>

            <span>Weather</span>
          </div>

          <nav className="sidebar-nav">
            <button className="sidebar-link active">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M3 12l9-8 9 8" />
                <path d="M5 10v10h14V10" />
              </svg>

              <span>Weather</span>
            </button>

            <button className="sidebar-link">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 21s7-6.2 7-12A7 7 0 0 0 5 9c0 5.8 7 12 7 12Z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>

              <span>Cities</span>
            </button>
          </nav>
        </div>

        <button
          className="mode-button"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="M4.93 4.93l1.42 1.42" />
              <path d="M17.65 17.65l1.42 1.42" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="M4.93 19.07l1.42-1.42" />
              <path d="M17.65 6.35l1.42-1.42" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z" />
            </svg>
          )}

          <span>{darkMode ? 'Light mode' : 'Dark mode'}</span>
        </button>
      </aside>

      <main
        className={`main-content ${weather ? 'has-weather' : 'empty-state'
          }`}
      >
        {!weather && !loading && (
          <div className="search-start">
            {searchBox}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
          </div>
        )}

        {loading && (
          <div className="search-start loading-state">
            {searchBox}

            <p className="loading-text">
              Loading...
            </p>
          </div>
        )}

        {weather && !loading && (
          <WeatherDisplay
            weather={weather}
            location={location}
            searchBox={searchBox}
          />
        )}

        {!weather && !loading && error && (
          <div className="error-message empty-error">
            {error}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;