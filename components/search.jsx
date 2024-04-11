"use client";

import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import Link from "next/link";

import { useFetch } from "@/hooks/use-fetch";

import { citySuggestion } from "@/actions/city-suggestion";

export const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debouncedSearchTerm = useDebounce(inputValue, 1000);
  const { execute, isLoading } = useFetch(citySuggestion, {
    onSuccess: (res) => {
      setSuggestions(
        res.data?.map((city) => {
          return {
            name: city.city,
            country: city.country,
          };
        })
      );
    },
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    if (debouncedSearchTerm) {
      execute(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="relative max-w-fit">
      <input
        type="text"
        className="bg-transparent border-b border-slate-500 outline-none p-2 text-white"
        value={inputValue}
        placeholder="Search for cities..."
        onChange={handleChange}
      />
      {debouncedSearchTerm && (
        <div className="absolute h-40 w-full mt-1 p-2 rounded text-sm  bg-white overflow-y-scroll">
          {isLoading && (
            <div className="flex items-center justify-center">searching...</div>
          )}

          {!isLoading && (
            <div className="flex flex-col gap-2 text-sm">
              {suggestions.length === 0 && <span>No result found</span>}
              {suggestions.map((sug, index) => (
                <Link href={`/${sug.name}`} key={index}>
                  {sug.name},{sug.country}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
