"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowDownUp } from "lucide-react";
import { toast } from "sonner";

import { useFetch } from "@/hooks/use-fetch";
import { fetchCities } from "@/actions/cities-fetch";
import { useCityData } from "@/hooks/useCityData";

export const CityTable = () => {
  const [cities, setCities] = useState([]);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [startIndex, setStartIndex] = useState(0);
  const weather = useCityData((state) => state.weather); // Access weather data using zustand

  //custom hook to fetch cities
  const { execute, isLoading, error } = useFetch(fetchCities, {
    onSuccess: function (data) {
      setCities((prevCities) => {
        const newCities = data.results.filter(
          (newCity) =>
            !prevCities.some((prevCity) => prevCity.name === newCity.name)
        );
        return [...prevCities, ...newCities];
      });
      setStartIndex((prev) => prev + data?.results.length);
    },
    onError: function (error) {
      toast.error("Something went wrong");
    },
  });

  // executing the fetch function
  useEffect(() => {
    execute(startIndex);
  }, []);

  // handle sort
  const handleSort = (column) => {
    if (sortedColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(column);
      setSortOrder("asc");
    }
  };

  // handle infinite scrolling
  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight) {
      execute(startIndex);
    }
  };

  //sort cities based on the column
  const sortedCities = [...cities].sort((a, b) => {
    const valueA = a[sortedColumn];
    const valueB = b[sortedColumn];
    if (valueA < valueB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  //return if something went wrong
  if (error) {
    return;
  }

  return (
    <div className="overflow-auto w-full max-h-[80vh]" onScroll={handleScroll}>
      <table className="table-auto 2xl:table-fixed w-full text-white">
        <thead>
          <tr className="border-b font-semibold border-slate-500 bg-white text-black shadow-md">
            <th
              onClick={() => handleSort("name")}
              className=" lg:text-lg text-left px-4 lg:py-3 flex items-center gap-1 cursor-pointer"
            >
              Name
              <span>
                <ArrowDownUp size={18} />
              </span>
            </th>
            <th className=" lg:text-lg text-left px-4 lg:py-3 ">Country</th>

            <th className=" lg:text-lg text-left px-4 lg:py-3 ">TimeZone</th>
            <th className=" lg:text-lg text-left px-4 lg:py-3 ">Temperature</th>
            <th className=" lg:text-lg text-left px-4 lg:py-3 ">Day high</th>
            <th className=" lg:text-lg text-left px-4 lg:py-3 ">Day low</th>
          </tr>
        </thead>
        <tbody className="text-xs lg:text-sm">
          {sortedCities?.map((city, index) => (
            <tr
              key={index}
              className="cursor-pointer border-b border-slate-500 hover:bg-slate-500"
            >
              <td className="px-4 py-2">
                <Link href={`/${city.name}`}>{city.name}</Link>
              </td>
              <td className="px-4 py-2">{city.cou_name_en}</td>

              <td className="px-4 py-2">{city.timezone}</td>
              <td className="px-4 py-2">
                {weather[city.name]?.tempDetails.temp}
                {weather[city.name] && <>&#xb0;C</>}
                {!weather[city.name] && "Click on name"}
              </td>
              <td className="px-4 py-2">
                {weather[city.name]?.tempDetails.temp_max}
                {weather[city.name] && <>&#xb0;C</>}
                {!weather[city.name] && "Click on name"}
              </td>
              <td className="px-4 py-2">
                {weather[city.name]?.tempDetails.temp_min}
                {weather[city.name] && <>&#xb0;C</>}
                {!weather[city.name] && "Click on name"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
