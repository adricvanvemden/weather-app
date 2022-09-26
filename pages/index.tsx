import Head from "next/head";
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getCoords, getWeather } from "../src/api/Endpoints";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSearch = (query: string) => {
    getCoords(query).then((response) => {
      getWeather(response[0].lat, response[0].lon).then((response) => {
        console.log(response);
      });
    });
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="bg-main bg-cover bg-center bg-no-repeat font-main">
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Get the latest weather information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center h-screen w-screen">
        <h1 className="md:text-6xl text-4xl text-center absolute mx-auto w-full -mt-40 text-gray-100">
          Weather App
        </h1>

        <div className="flex justify-center">
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
      </main>
    </div>
  );
};

export default Home;
