import React, { useEffect, useState } from "react";
import axios from "axios";

function Destination() {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState("paris");

  const fetchDestinations = async () => {
    try {
      const response = await axios.get(`/api/destinations?keyword=${search}`);
      const parsed = JSON.parse(response.data);
      setDestinations(parsed.data || []);
    } catch (err) {
      console.error("Error fetching destinations:", err);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Explore Destinations</h2>
      <div className="flex gap-2 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search a city (e.g. Paris)"
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={fetchDestinations}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      <ul className="grid gap-4">
        {destinations.map((dest, i) => (
          <li key={i} className="border p-4 rounded shadow">
            <p><strong>{dest.address?.cityName}</strong> ({dest.iataCode})</p>
            <p>Country: {dest.address?.countryName}</p>
            <p>Type: {dest.subType}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Destination;
