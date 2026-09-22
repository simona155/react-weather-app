import { useState } from 'react';
import { getCoordinates, getWeather } from './services/weatherApi';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!city.trim()) {
      setError('Please enter a city.');
      return;
    }

    setError('');
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
    <>
      <input
        value={city}
        onChange={(event) => setCity(event.target.value)}
        placeholder="Enter a city"
      />

      <button onClick={handleSearch}>
        Search
      </button>

      {error && <p>{error}</p>}

      {loading && <p>Loading...</p>}

      {weather && !loading && (
        <WeatherDisplay
          weather={weather}
          location={location}
        />
      )}
    </>
  );
}

export default App;