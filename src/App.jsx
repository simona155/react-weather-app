import { useState } from 'react';
import { getCoordinates, getWeather } from './services/weatherApi';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);

    const cityData = await getCoordinates(city);
    setLocation(cityData);

    const weatherData = await getWeather(
      cityData.latitude,
      cityData.longitude
    );

    setWeather(weatherData);
    setLoading(false);
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