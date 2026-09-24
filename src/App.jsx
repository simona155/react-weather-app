import { useState } from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import { getCoordinates, getWeather } from './services/weatherApi';
import WeatherDisplay from './components/WeatherDisplay';
import Cities from './components/Cities';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  const navigate = useNavigate();

  const handleSearch = async (searchCity = city) => {
    setWeather(null);
    setLocation(null);
    setError('');

    if (!searchCity.trim()) {
      setError('Please enter a city.');
      return;
    }

    setLoading(true);

    try {
      const cityData = await getCoordinates(searchCity);

      if (!cityData) {
        setError('City not found.');
        return;
      }

      setCity(cityData.name);
      setLocation(cityData);

      const weatherData = await getWeather(
        cityData.latitude,
        cityData.longitude
      );

      setWeather(weatherData);
      navigate('/');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelect = async (cityName) => {
    setLoading(true);
    setError('');

    try {
      const cityData = await getCoordinates(cityName);

      if (!cityData) {
        setError('City not found.');
        return;
      }

      const weatherData = await getWeather(
        cityData.latitude,
        cityData.longitude
      );

      setCity(cityData.name);
      setLocation(cityData);
      setWeather(weatherData);

      navigate('/');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const searchBox = (
    <div className="search-box d-flex w-100">
      <input
        className="form-control"
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

      <button
        className="btn btn-primary"
        onClick={() => handleSearch()}
      >
        Search
      </button>
    </div>
  );

  return (
    <div
      className={`weather-app ${darkMode ? 'dark-mode' : 'light-mode'
        }`}
    >
      <aside className="sidebar d-flex flex-column justify-content-between p-4 rounded-4 shadow">
        <div>
          <div className="brand d-flex align-items-center gap-3 mb-5 px-2">
            <div className="brand-icon d-flex align-items-center justify-content-center rounded-3">
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

          <nav className="sidebar-nav d-flex flex-column gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `sidebar-link d-flex align-items-center gap-3 w-100 ${isActive ? 'active' : ''
                }`
              }
            >
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
            </NavLink>

            <NavLink
              to="/cities"
              className={({ isActive }) =>
                `sidebar-link d-flex align-items-center gap-3 w-100 ${isActive ? 'active' : ''
                }`
              }
            >
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
            </NavLink>
          </nav>
        </div>

        <button
          className="mode-button d-flex align-items-center gap-3 w-100"
          onClick={() => setDarkMode(!darkMode)}
          aria-label={
            darkMode
              ? 'Switch to light mode'
              : 'Switch to dark mode'
          }
        >
          {darkMode ? (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z" />
              </svg>

              <span>Light mode</span>
            </>
          ) : (
            <>
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

              <span>Dark mode</span>
            </>
          )}
        </button>
      </aside>

      <main
        className={`main-content ${weather ? 'has-weather' : 'empty-state'
          }`}
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
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
                    darkMode={darkMode}
                  />
                )}
              </>
            }
          />

          <Route
            path="/cities"
            element={
              <Cities
                onCitySelect={handleCitySelect}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;