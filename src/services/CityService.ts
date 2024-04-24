export default {
    async fetchCities(searchText: string): Promise<any> {
      const apiKey = 'pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q';
      const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=${apiKey}&types=place`;
      try {
        const response = await fetch(apiUrl);
         if (!response.ok) {
          throw new Error('Failed to fetch cities data');
        }
        return await response.json();
      } catch (error) {
        throw error;
      }
    },
  };