"use client";

import { weatherDetails } from "@/actions/weather-details";
import { useFetch } from "@/hooks/use-fetch";
import { useEffect, useState } from "react";
import axios from "axios";
import { Icon } from "@/utils/icons";

export const CurrentLocationWeather = () => {
  const [currLoc, setCurrLoc] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  //fetch current location coordinates using browser geolocation api
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrLoc({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  }, []);

  //fetch weather data based on current location
  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
        );
        setWeather(response.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    //fetch data only if user allowed to access the current location
    if (currLoc) {
      fetchWeather(currLoc.lat, currLoc.lon);
    }
  }, [currLoc]);

  if (loading) {
    return;
  }

  return (
    <>
      {weather && (
        <div className="bg-slate-600 text-white font-bold p-2 rounded-lg flex items-center gap-8">
          <div className="">
            <p>{weather.main.temp}&#176;C</p>
            <p className="text-xs">{weather.weather[0].description}</p>
          </div>
          {Icon(weather.weather[0].icon, 30)}
          <div className="">
            <p className="">
              <span className="text-xs">MAX: </span>
              {weather.main.temp_max}&#176;C {"/"}{" "}
              <span className="text-xs">MIN: </span>
              {weather.main.temp_min}&#176;C
            </p>
            <p className="text-xs text-right">{weather.name}</p>
          </div>
        </div>
      )}
    </>
  );
};
