import useStats from "../utils/useStats";
import { useState } from "react";
import Stats from "./Stats";
export default function CountrySelector() {
  const { stats: countries, loading, error } = useStats(
    "https://covid19.mathdro.id/api/countries"
  );
  const [selectedCountry, setSelectedCountry] = useState("USA");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  return (
    <div>
      <h2>Currently Showing {selectedCountry}</h2>
      <select onChange={(e) => setSelectedCountry(e.target.value)}>
        {Object.entries(countries.countries).map(([code, details]) => (
          <option key={code} value={details.iso3}>
            {details.name}
          </option>
        ))}
      </select>
      <Stats
        url={`https://covid19.mathdro.id/api/countries/${selectedCountry}`}
      ></Stats>
    </div>
  );
}
