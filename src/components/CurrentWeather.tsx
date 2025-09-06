import { Icon } from "@iconify/react/dist/iconify.js";
import type { WeatherResponse } from "../types/types";
import { motion } from "motion/react";

const CurrentWeather = ({ data }: { data: WeatherResponse }) => {
  return (
    <div className="text-center">
      <motion.img
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        src={data?.current?.condition?.icon.slice(0)}
        alt="icon"
        className="mx-auto w-28"
      />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl mb-16"
      >
        {data?.current?.condition?.text}
      </motion.p>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="relative w-fit mx-auto mb-16"
      >
        <p className="text-7xl">{data?.current?.temp_c.toFixed()}</p>
        <span className="absolute top-0 -right-7 text-xl">°C</span>
      </motion.div>
      <div className="flex justify-center gap-16 items-center mb-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-2 items-center"
        >
          <Icon icon="material-symbols:wind-power-rounded" width="24" height="24" />
          <p>
            {data?.current?.wind_kph} <span className="text-xs">km/h</span>
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-2 items-center"
        >
          <Icon icon="famicons:water" width="24" height="24" />
          <p>
            {data?.current?.humidity} <span className="text-xs">%</span>
          </p>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center items-center gap-2 mb-8"
      >
        <div className="flex justify-center items-center gap-2">
          <Icon icon="ph:plant-bold" width="24" height="24" />
          <p>AQI:</p>
        </div>

        {data?.current?.air_quality["us-epa-index"] === 1 && <p className="text-green-500">Good</p>}
        {data?.current?.air_quality["us-epa-index"] === 2 && (
          <p className="text-lime-500">Moderate</p>
        )}
        {data?.current?.air_quality["us-epa-index"] === 3 && (
          <p className="text-yellow-300">Unhealthy for sensitive group</p>
        )}
        {data?.current?.air_quality["us-epa-index"] === 4 && (
          <p className="text-orange-400">Unhealthy</p>
        )}
        {data?.current?.air_quality["us-epa-index"] === 5 && (
          <p className="text-red-500">Very Unhealthy</p>
        )}
        {data?.current?.air_quality["us-epa-index"] === 6 && (
          <p className="text-purple-500">Hazardous</p>
        )}
      </motion.div>
    </div>
  );
};

export default CurrentWeather;
