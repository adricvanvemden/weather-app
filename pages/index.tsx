import Head from "next/head";
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getCoords, getWeather } from "../src/api/Endpoints";
import { Mock } from "../src/Mock";
import { format } from "date-fns";

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Current {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
}

export interface Minutely {
  dt: number;
  precipitation: number;
}

export interface Weather2 {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Rain {
  "1h": number;
}

export interface Hourly {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather2[];
  pop: number;
  rain: Rain;
}

export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface Weather3 {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Daily {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather3[];
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
}

export interface Data {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: Current;
  minutely: Minutely[];
  hourly: Hourly[];
  daily: Daily[];
}

const formatHour = (unix: number) => {
  return format(new Date(unix * 1000), "HH:mm");
};

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<Data>(Mock);

  const handleChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSearch = (query: string) => {
    getCoords(query).then((response) => {
      getWeather(response[0].lat, response[0].lon).then((response) => {
        setData(response);
      });
    });
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="bg-main bg-cover bg-center bg-no-repeat font-main h-screen w-screen">
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Get the latest weather information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <h1 className="md:text-6xl text-5xl text-center pt-16 md:pt-32 w-full h-full  text-gray-100">
          Weather App
        </h1>

        <div className="flex justify-center mt-8">
          <button
            className="bg-white rounded-l-lg pl-2 outline-none"
            onClick={() => handleSearch(searchQuery)}
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-black " />
          </button>

          <input
            type="text"
            className="h-12 border focus:outline-none border-gray-200 border-l-transparent w-5/12 rounded-r-lg pl-4"
            placeholder="Search by location"
            onKeyUp={handleKeyUp}
            value={searchQuery}
            onChange={handleChange}
          />
        </div>
        <div className="h-screen w-screen backdrop-blur mt-6 shadow-[0px_-10px_50px_-1px] shadow-green-300/20">
          {data && (
            <div className="text-white">
              <div>{formatHour(data.current.dt)}</div>
              <div>{formatHour(data.current.sunrise)} sunrise</div>
              <div>{formatHour(data.current.sunset)} sunset</div>
              <div>{data.current.temp} Kelvin</div>
              <div>{data.current.feels_like} Kelvin</div>
              <div>{data.current.pressure}hPa</div>
              <div>{data.current.humidity} %</div>
              <div>{data.current.clouds} Cloudiness %</div>
              <div>{data.current.uvi} Uv index</div>
              <div>{data.current.visibility} metres max is 10km</div>
              <div>{data.current.wind_speed} meter/sec</div>
              <div>{data.current.wind_deg} wind direction, degrees </div>
              <div>{data.current.weather[0].description} </div>
              {/* Make own graph, time on x, rain onm y, */}
              <div className="flex gap-2 flex-wrap mt-4">
                {data.minutely.map((minute) => (
                  <div key={minute.dt}>
                    <div>{formatHour(minute.dt)}</div>
                    <div>{minute.precipitation} mm</div>
                  </div>
                ))}
              </div>
              {/* Cards scroll on x as */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
