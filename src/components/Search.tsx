import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import axios from "../axiosConfig";
import { useClickAway, useDebounce } from "@uidotdev/usehooks";
import { Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";

interface LocationsProps {
  country: string;
  id: string;
  lat: string;
  lon: string;
  name: string;
  region: string;
  url: string;
}

const Search = () => {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 1000);
  const [focused, setFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();

  const ref = useClickAway<HTMLDivElement>(() => {
    setFocused(false);
  });

  const fetchLocations = async (query: string) => {
    const res = await axios.get("/search.json", {
      params: { q: query },
    });
    return res.data as LocationsProps[] | [] | null;
  };

  const { data, error } = useQuery({
    queryKey: ["search", debounced],
    queryFn: () => fetchLocations(debounced),
    enabled: !!debounced,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    setSelectedIndex(-1);
  }, [data, focused]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!data || data.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < data.length - 1 ? prev + 1 : prev));
        break;

      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;

      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < data.length) {
          const selectedLocation = data[selectedIndex];
          navigate(`/location/${selectedLocation.id}`);
          setFocused(false);
        }
        break;

      case "Escape":
        setFocused(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <motion.div initial={{ y: -100 }} animate={{ y: 0 }} ref={ref} className="mb-12 relative z-20">
      {/* search bar */}
      <div className="flex items-center gap-2 mb-2 p-2 bg-white/20 backdrop-blur-sm shadow rounded-full">
        <Icon icon="material-symbols:search-rounded" width="24" height="24" />
        <input
          className="w-full text-lg border-none outline-none bg-transparent"
          type="search"
          placeholder="Search for a location..."
          onChange={(e) => setSearch(e.currentTarget.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {/* search results */}
      {focused && debounced.length > 0 && (data || error) && (
        <div className="p-2 shadow-lg rounded-lg absolute w-full z-10 backdrop-blur-sm bg-white/20">
          {data ? (
            data.length > 0 ? (
              <ul>
                {data.map((location, index) => (
                  <li
                    key={location.id}
                    className={`p-2 ${selectedIndex === index ? "bg-white/30 rounded-sm" : ""}`}
                  >
                    <Link to={`/location/${location.id}`} className="w-full inline-block">
                      <span className="font-semibold mr-2">{location.name}</span>
                      <span className="text-neutral-200">
                        {location.region || "-"} / {location.country || "-"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-light text-neutral-200 text-center">Nothing found...</p>
            )
          ) : null}
          {error && <p className="font-light text-neutral-200 text-center">{error.message}</p>}
        </div>
      )}
    </motion.div>
  );
};

export default Search;
