import React, { useState } from "react";
import axios from "axios";

function Hotels() {
  const [location, setLocation] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(1);
  const [hotels, setHotels] = useState([]);

  const fetchCityCode = async () => {
    try {
      const response = await axios.get(`/api/hotels/city-code?keyword=${location}`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      const data = response.data;
      const code = data.data?.[0]?.iataCode;
      setCityCode(code);
      return code;
    } catch (err) {
      console.error("Error fetching city code", err);
      return null;
    }
  };
  
  const searchHotels = async () => {
    const code = await fetchCityCode();
    if (!code) return;
  
    try {
      const response = await axios.post("/api/hotels/search", {
        location: code,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        adults: adults
      }, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      console.log("Hotel search response", response.data);
      setHotels(response.data.data);
    } catch (err) {
      console.error("Error searching hotels", err);
    }
  };  

  return (
    <div className="p-4 space-y-3 max-w-md mx-auto">
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location (e.g. Delhi)"
        className="w-full border p-2 rounded"
      />
      <input
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        type="date"
        className="w-full border p-2 rounded"
      />
      <input
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        type="date"
        className="w-full border p-2 rounded"
      />
      <input
        value={adults}
        onChange={(e) => setAdults(Number(e.target.value))}
        type="number"
        min="1"
        className="w-full border p-2 rounded"
      />
      <button
        onClick={searchHotels}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Search Hotels
      </button>

      {/* <ul className="pt-4 space-y-2">
        {hotels.map((hotel, i) => (
          <li key={i} className="border-b pb-2">
            {hotel.hotel.name}
          </li>
        ))}
      </ul> */}
      <ul>
  {hotels.map((hotel, i) => (
    <li key={i}>{JSON.stringify(hotel)}</li> // just show full JSON for now
  ))}
</ul>

    </div>
  );
}

export default Hotels;
