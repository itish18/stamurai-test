"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { weatherDetails } from "@/actions/weather-details";

import { useFetch } from "@/hooks/use-fetch";
import { useCityData } from "@/hooks/useCityData";

import { Loading } from "@/components/loading";
import { WeatherDetails } from "./_components/weather-details";
import { ForecastDetails } from "./_components/forecast-details";

export default function CityPage() {
  const params = useParams();
  const { cityName } = params;
  const updateWeatherData = useCityData((state) => state.setWeather); // to update selected weather details globally using zustand
  const router = useRouter();

  const [cityData, setCityData] = useState(null);

  // fetch weather details using custom hook
  const { isLoading, execute } = useFetch(weatherDetails, {
    onSuccess: function (data) {
      setCityData(data);
      updateWeatherData(data);
    },
    onError: function (e) {
      toast.error("City details not found");
      router.push("/");
    },
  });

  //calling the function to fetch data
  useEffect(() => {
    execute(cityName);
  }, [cityName]);

  if (isLoading) {
    return <Loading />;
  }

  if (!cityData) {
    return;
  }

  return (
    <div className="w-full bg-[#213555]">
      <div className="text-white px-5 xl:px-10 2xl:px-0 2xl:max-w-[80%] w-full mx-auto py-20">
        <WeatherDetails cityData={cityData} />
        <ForecastDetails cityDataList={cityData.forecast} />
      </div>
    </div>
  );
}
