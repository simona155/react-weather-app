const getWeatherDescription = (code) => {
    if (code === 0) {
        return 'Clear sky';
    }

    if ([1, 2, 3].includes(code)) {
        return 'Cloudy';
    }

    if ([45, 48].includes(code)) {
        return 'Fog';
    }

    if ([51, 53, 55, 56, 57].includes(code)) {
        return 'Drizzle';
    }

    if ([61, 63, 65, 66, 67].includes(code)) {
        return 'Rain';
    }

    if ([71, 73, 75, 77].includes(code)) {
        return 'Snow';
    }

    if ([80, 81, 82].includes(code)) {
        return 'Rain showers';
    }

    if ([95, 96, 99].includes(code)) {
        return 'Thunderstorm';
    }

    return 'Unknown';
};

export default getWeatherDescription;