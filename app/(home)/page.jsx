import { Search } from "@/components/search";
import { CityTable } from "./_components/city-table";
import { CurrentLocationWeather } from "./_components/current-location-weather";

export default function Home() {
  return (
    <div className="w-full h-[100vh]  bg-[#213555] p-5 xl:px-40 xl:py-8 space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2 xl:gap-0">
        <Search />
        <CurrentLocationWeather />
      </div>
      <CityTable />
    </div>
  );
}
