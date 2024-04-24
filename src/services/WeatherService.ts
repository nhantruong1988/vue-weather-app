export default {
    async fetchWeather(city: string): Promise<any> {
      const apiKey = '4355021b474ff1c4bc49591934bb39af'; // Replace with your OpenWeatherMap API key
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          return {error: 'Failed to fetch weather data'};
        }
        return { data: await response.json()};
      } catch (error) {
        return {error};
      }
    },
  };