import { useParams } from "react-router";
import axios from "../axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import BackButton from "../components/BackButton";
import ForecastDays from "../components/ForecastDays";
import SaveButton from "../components/SaveButton";
import type { ErrorProps } from "../types/types";
import CurrentWeather from "../components/CurrentWeather";
import { Icon } from "@iconify/react/dist/iconify.js";

const WeatherPage = () => {
  const { id } = useParams();

  const fetchCurrentWeather = async (id: string | undefined) => {
    const res = await axios.get("/forecast.json", {
      params: { q: `id:${id}`, days: 3 },
    });
    console.log(res);
    return res.data;
  };

  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: ["weather", id],
    queryFn: () => fetchCurrentWeather(id),
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
  const err = error as ErrorProps;

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="h-full flex flex-col justify-center">
        <Icon icon="eos-icons:bubble-loading" width="16" height="16" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full flex flex-col justify-center">
        <div className="flex flex-col gap-4 justify-center items-center bg-neutral-200 rounded-lg py-8">
          <p>Error: {err?.response?.data?.error?.message || error.message}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full py-4 px-2 flex flex-col justify-between overflow-y-auto text-shadow-xs text-white bg-cover ${
        data?.current?.is_day ? "bg-[url(./images/day.jpg)]" : "bg-[url(./images/night.jpg)]"
      }`}
    >
      {/* top bar - back and save */}
      <div className="max-w-xl w-full mx-auto relative flex justify-between items-center mb-8">
        <BackButton />
        <h1 className="absolute top-1/2 left-1/2 -translate-1/2 text-2xl font-semibold">
          {data?.location?.name}
        </h1>
        <SaveButton />
      </div>

      {/* middle part - info */}
      {data && <CurrentWeather data={data} />}

      {/* bottom bar - forcast cards */}
      {data && <ForecastDays data={data} />}
    </div>
  );
};

export default WeatherPage;
