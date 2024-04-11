import { ForecastCard } from "./forecast-card";

export const ForecastDetails = ({ cityDataList }) => {
  return (
    <div className="mt-10">
      <h2 className="text-4xl">Next 5 Days</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 mt-10">
        {cityDataList.map((data, index) => (
          <ForecastCard
            key={index}
            frDate={data.date}
            temp={data?.main?.temp}
            icon={data?.weather?.icon}
            label={data?.weather?.main}
          />
        ))}
      </div>
    </div>
  );
};
