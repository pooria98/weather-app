import { motion } from "motion/react";
import type { WeatherResponse } from "../types/types";

const ForecastDays = ({ data }: { data: WeatherResponse }) => {
  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex justify-center gap-2 w-full text-center"
    >
      {data?.forecast?.forecastday.map((item) => (
        <motion.div
          variants={itemVariants}
          className="flex-1 flex flex-col justify-center items-center max-w-40 backdrop-blur-xs shadow-xl bg-white/5 rounded-lg *:flex-1"
        >
          <p>{new Date(item?.date).toLocaleDateString("en-US", { weekday: "long" })}</p>
          <img src={item?.day?.condition?.icon.slice(0)} alt="icon" className="mx-auto" />
          <p className="mb-4 text-sm">{item?.day?.condition?.text}</p>
          <div className="relative w-fit mx-auto mb-8">
            <p className="text-2xl font-semibold">{item?.day?.avgtemp_c.toFixed()}</p>
            <span className="absolute top-0 -right-4 text-xs">°C</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ForecastDays;
