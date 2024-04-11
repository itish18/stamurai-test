import { Icon } from "@/utils/icons";
import { format } from "date-fns";

export const ForecastCard = ({ frDate, temp, label, icon }) => {
  return (
    <div className="flex items-center justify-between rounded-lg p-5 bg-slate-600">
      <div className="">
        <p className="">{format(frDate, "dd-MM eee")}</p>
        <p>{format(frDate, "hh:mm a")}</p>
      </div>
      {Icon(icon, 30)}
      <div className="">
        <p>{temp.toFixed(1)}&#176;C</p>
        <p>{label}</p>
      </div>
    </div>
  );
};
