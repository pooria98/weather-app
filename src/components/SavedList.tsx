import { useAtom } from "jotai";
import { locations } from "../state";
import { Link } from "react-router";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQueries } from "@tanstack/react-query";
import axios from "../axiosConfig";
import { motion } from "motion/react";

const SavedList = () => {
  const [saved, setSaved] = useAtom(locations);

  const fetchCityWeather = async (id: string | undefined) => {
    const res = await axios.get("/current.json", {
      params: { q: `id:${id}` },
    });
    return res;
  };

  const results = useQueries({
    queries: saved.map((cityId) => ({
      queryKey: ["city", cityId],
      queryFn: () => fetchCityWeather(cityId),
      staleTime: 1000 * 60 * 10,
    })),
  });

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
      x: -30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (saved.length === 0)
    return (
      <div className="flex flex-col justify-center items-center py-20 text-center">
        <Icon icon="material-symbols:bookmark-outline-rounded" width="32" height="32" />
        <p className="text-xl mb-2">No saved locations</p>
        <p className="text-neutral-300 w-3/4">
          Save a location by clicking on the top left button in the details page
        </p>
      </div>
    );

  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-8 overflow-y-scroll px-4"
    >
      {results?.map((item) => (
        <motion.li
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          key={item?.data?.config?.params?.q.slice(3)}
          className="w-full relative"
        >
          <Icon
            icon="material-symbols:close-rounded"
            width="24"
            height="24"
            className="absolute z-10 top-2 right-2 cursor-pointer hover:text-red-500 hover:scale-[1.2] transition-all"
            onClick={() =>
              setSaved((prev) =>
                prev.filter((loc) => loc !== item?.data?.config?.params?.q.slice(3))
              )
            }
          />
          {item.isLoading ? (
            <h1 className="font-semibold text-2xl">LOADING...</h1>
          ) : (
            <Link
              to={`/location/${item?.data?.config?.params?.q.slice(3)}`}
              className="flex justify-between items-center w-full py-4 px-8 rounded-xl shadow-lg backdrop-blur-sm bg-gradient-to-tr from-gray-950/70 to-slate-600/50"
            >
              <div>
                <div className="relative w-fit mx-auto mb-2">
                  <p className="text-4xl">{item?.data?.data?.current.temp_c.toFixed()}</p>
                  <span className="absolute top-0 -right-4 text-xs">°C</span>
                </div>
                <p className="text-xl font-semibold text-center">
                  {item?.data?.data?.location.name}
                </p>
              </div>
              <div>
                <img
                  src={item?.data?.data?.current.condition.icon.slice(0)}
                  alt="icon"
                  className="mx-auto"
                />
                <p className="text-xs text-center">{item?.data?.data?.current.condition.text}</p>
              </div>
            </Link>
          )}
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default SavedList;
