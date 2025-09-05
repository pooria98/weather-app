import { useState } from "react";
import { Icon } from "@iconify/react";
import axios from "../axiosConfig";
import { useClickAway, useDebounce } from "@uidotdev/usehooks";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";

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

  return (
    <div ref={ref} className="mb-12 relative">
      {/* search bar */}
      <div className="flex items-center gap-2 mb-2 p-2 bg-white/20 backdrop-blur-sm shadow rounded-full">
        <Icon icon="material-symbols:search-rounded" width="24" height="24" />
        <input
          className="w-full text-lg border-none outline-none bg-transparent"
          type="search"
          placeholder="Search for a location..."
          onChange={(e) => setSearch(e.currentTarget.value)}
          onFocus={() => setFocused(true)}
        />
      </div>
      {/* search results */}
      {focused && debounced.length > 0 && (data || error) && (
        <div className="p-2 shadow-lg rounded-lg absolute w-full z-10 backdrop-blur-sm bg-white/20">
          {data ? (
            data.length > 0 ? (
              <ul>
                {data.map((location) => (
                  <li key={location.id} className={data.length > 1 ? "mb-4" : ""}>
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
    </div>
  );
};

export default Search;
