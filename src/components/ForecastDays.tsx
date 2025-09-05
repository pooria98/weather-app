import type { WeatherResponse } from "../types/types";

const ForecastDays = ({ data }: { data: WeatherResponse }) => {
  return (
    <div className="flex justify-center gap-2 w-full text-center">
      {data?.forecast?.forecastday.map((item) => (
        <div className="flex-1 flex flex-col justify-center items-center max-w-40 backdrop-blur-xs shadow-xl bg-white/5 rounded-lg *:flex-1">
          <p>{new Date(item?.date).toLocaleDateString("en-US", { weekday: "long" })}</p>
          <img src={item?.day?.condition?.icon.slice(0)} alt="icon" className="mx-auto" />
          <p className="mb-4 text-sm">{item?.day?.condition?.text}</p>
          <div className="relative w-fit mx-auto mb-8">
            <p className="text-2xl font-semibold">{item?.day?.avgtemp_c.toFixed()}</p>
            <span className="absolute top-0 -right-4 text-xs">°C</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForecastDays;
