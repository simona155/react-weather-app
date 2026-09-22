import { useState } from 'react';
import { getCoordinates, getWeather } from './services/weatherApi';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  const handleSearch = async () => {
    const cityData = await getCoordinates(city);
    setLocation(cityData);

    const weatherData = await getWeather(
      cityData.latitude,
      cityData.longitude
    );

    setWeather(weatherData);
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

      {weather && (
        <WeatherDisplay
          weather={weather}
          location={location}
        />
      )}
    </>
  );
}

export default App;
