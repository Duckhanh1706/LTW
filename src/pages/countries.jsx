import { useEffect, useState } from "react";
import axios from "axios";

export default function CountriesPage() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,region,capital,flags,cca3",
        );

        setCountries(res.data);
        setFiltered(res.data);
        setLoading(false);
      } catch (err) {
        console.error("API ERROR:", err);
        setError("Không gọi được API");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = countries;

    if (search) {
      result = result.filter((c) =>
        c.name.common.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (region !== "All") {
      result = result.filter((c) => c.region === region);
    }

    setFiltered(result);
  }, [search, region, countries]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Countries Page</h2>

      <div className="card">
        <input
          placeholder="Search country..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setRegion(e.target.value)}>
          <option value="All">All</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Africa">Africa</option>
        </select>
      </div>

      <div className="grid">
        {filtered.map((c) => (
          <div key={c.cca3} className="card country-card">
            <h4>Quốc Gia :{c.name.common}</h4>
            <p>Khu vực: {c.region}</p>
            <p>Thủ đô: {c.capital?.[0]}</p>
            <img src={c.flags.png} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
