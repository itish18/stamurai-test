import {
  MapPin,
  Calendar,
  Wind,
  Droplets,
  CircleGauge,
  Telescope,
  Sunrise,
  Sunset,
} from "lucide-react";
import { format } from "date-fns";

import { ExtraDetails } from "./extra-details";

import { Icon, iconMap } from "@/utils/icons";

import Image from "next/image";
import { useState } from "react";
import { LocationMap, Map } from "./map";

export const WeatherDetails = ({ cityData }) => {
  const [activeTemp, setActiveTemp] = useState(true);
  const [temp, setTemp] = useState(cityData.tempDetails.temp);

  const changeTempUnit = () => {
    if (activeTemp) {
      setTemp(((temp * 9) / 5 + 32).toFixed(2));
    } else {
      setTemp(((temp - 32) * (5 / 9)).toFixed(2));
    }
  };

  const handleUnitChange = () => {
    setActiveTemp((prev) => !prev);

    changeTempUnit();
  };

  return (
    <>
      <h2 className="text-4xl">Today Overview</h2>

      <div className="border mt-10 rounded-lg p-5 relative">
        <Image
          src={iconMap[cityData.currentWeather.icon].imageLink}
          alt="image"
          fill
          className="object-cover rounded-lg"
        />
        <div className="relative w-full  h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 ">
          <div className="p-10 flex flex-col rounded-lg  border bg-black/50 backdrop-blur-lg">
            {Icon(cityData.currentWeather.icon)}
            <div className="flex justify-between items-center">
              <div className="mt-10 mb-6 space-y-4">
                <p className="text-5xl">{temp}</p>
                <p>{cityData.currentWeather.description}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleUnitChange}
                  className={`text-3xl ${
                    activeTemp
                      ? "opacity-100 scale-[1.2] font-bold"
                      : "opacity-50"
                  }`}
                >
                  &#176;C
                </button>
                <button
                  onClick={handleUnitChange}
                  className={`text-3xl ${
                    !activeTemp
                      ? "opacity-100 scale-[1.2] font-bold"
                      : "opacity-50"
                  }`}
                >
                  &#176;F
                </button>
              </div>
            </div>
            <div className="w-full h-[1px] bg-white rounded" />
            <div className="mt-8 space-y-4">
              <p className="flex gap-3">
                <MapPin />
                {cityData.name}
              </p>
              <p className="flex gap-3">
                <Calendar />
                {format(new Date(), "dd-MM eeee")}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <ExtraDetails
              icon={<Wind size={50} />}
              label="Wind Speed"
              value={`${(cityData.wind.speed * 3.6).toFixed(2)} km/h`}
            />
            <ExtraDetails
              icon={<CircleGauge size={50} />}
              label="Pressure"
              value={`${cityData.tempDetails.pressure} hPa`}
            />
            <ExtraDetails
              icon={<Sunrise size={50} />}
              label="Sunrise"
              value={format(new Date(cityData.sunrise * 1000), "h:mm a")}
            />
          </div>
          <div className="space-y-3">
            <ExtraDetails
              icon={<Droplets size={50} />}
              label="Humidity"
              value={`${cityData.tempDetails.humidity}%`}
            />
            <ExtraDetails
              icon={<Telescope size={50} />}
              label="Visibility"
              value={`${cityData.visibility / 1000} km/h`}
            />
            <ExtraDetails
              icon={<Sunset size={50} />}
              label="Sunset"
              value={format(new Date(cityData.sunset * 1000), "h:mm a")}
            />
          </div>
          <div className="w-full h-full border border-white rounded">
            <LocationMap lat={cityData.cord.lat} long={cityData.cord.lon} />
          </div>
        </div>
      </div>
    </>
  );
};
