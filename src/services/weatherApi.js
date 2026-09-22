const getCoordinates = async (city) => {
    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
    );

    const data = await response.json();

    return data.results[0];
};

const getWeather = async (latitude, longitude) => {
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&timezone=auto`
    );

    const data = await response.json();

    return data.current;
};

export { getCoordinates, getWeather };