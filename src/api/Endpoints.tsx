import axios from "axios";

export const getWeather = (lat: number, lon: number) => {
  return axios
    .get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getCoords = (query: string) => {
  return axios
    .get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/geo/1.0/direct?q=${query}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
