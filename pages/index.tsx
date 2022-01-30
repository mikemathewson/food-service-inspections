import type { Facility } from "../types";
import type { NextPage } from "next";
import { useState, useEffect, ChangeEvent } from "react";
import LocationPermission from "../components/LocationPermission";
import Intro from "../components/Intro";
import FacilityList from "../components/FacilityList";
import { fetchLatestInspections } from "../api/LastInspections";
import { debounce } from "lodash";

const Home: NextPage = () => {
  const [results, setResults] = useState<Facility[] | null>(null);
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const perPage = 10;

  // Reload results if properties change
  useEffect(() => {
    if (position || query) {
      fetchResults();
    }
  }, [position, page, query]);

  // Build select parameter for API query
  const getSelectParam = () => {
    let select = [
      ":id AS id",
      "nys_health_operation_id AS operation_id",
      "facility AS name",
      "facility_address AS address",
      "city",
      "zip_code",
      "total_critical_violations AS violations",
      "total_noncritical_violations AS warnings",
    ];

    if (position) {
      select.push(
        `distance_in_meters(location1, 'POINT (${position.coords.longitude} ${position.coords.latitude})') AS distance`
      );
    }

    return select.join(",");
  };

  // Fetch API results
  const fetchResults = async () => {
    setLoading(true);

    const resultsTmp = await fetchLatestInspections({
      $select: getSelectParam(),
      $q: query ? query : undefined,
      $order: position ? "distance" : "name",
      $limit: perPage + 1,
      $offset: (page - 1) * perPage,
    });

    setResults(resultsTmp);
    setLoading(false);
  };

  // Update search results as user types
  const handleSearch = debounce((event: ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setQuery(event.target.value);
  }, 500);

  return (
    <>
      <Intro />
      <LocationPermission setPosition={setPosition} />
      <input
        type="text"
        defaultValue={query}
        className="w-full text-xl py-4 px-6 mb-6 bg-slate-200 border border-slate-400 sm:rounded"
        placeholder="Search..."
        onChange={handleSearch}
      />
      {results !== null && (
        <FacilityList
          results={results}
          page={page}
          perPage={perPage}
          loading={loading}
          setPage={setPage}
        />
      )}
    </>
  );
};

export default Home;
