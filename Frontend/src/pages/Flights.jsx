import React, { useState } from "react";
import axios from "axios";

function Flights() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [bookedFlights, setBookedFlights] = useState([]);

  const searchFlights = async () => {
    try {
      const response = await axios.get("/api/flights/search", {
        params: { from, to, departureDate },
      });

      console.log("Flight response:", response.data);

      const result = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      setFlights(result);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  const bookFlight = async (flightId) => {
    try {
      await axios.post("/api/flights/book", { flightId });
      setBookedFlights([...bookedFlights, flightId]);
      alert("Flight booked successfully!");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">✈️ Explore Flights</h2>

      {/* Search Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 bg-white p-6 rounded-xl shadow-md border">
        <input
          type="text"
          placeholder="From (e.g. DEL)"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
        />
        <input
          type="text"
          placeholder="To (e.g. BOM)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
        />
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
        />
        <button
          onClick={searchFlights}
          className="bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition rounded-lg px-4 py-2 mt-1 md:mt-0"
        >
          🔍 Search Flights
        </button>
      </div>

      {/* Flight Results */}
      <div>
        {flights.length === 0 ? (
          <p className="text-center text-gray-400 text-lg mt-10">No flights found. Try searching!</p>
        ) : (
          <div className="grid gap-6">
            {flights.map((flight) => (
              <div
                key={flight.id}
                className="bg-white border shadow-lg rounded-xl p-6 flex flex-col md:flex-row justify-between items-center hover:shadow-xl transition duration-300 ease-in-out"
              >
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-indigo-700">
                    {flight.airline} <span className="text-sm text-gray-500">({flight.flightNumber})</span>
                  </h3>
                  <p className="text-lg text-gray-700 mt-2">
                    {flight.from} ➡️ {flight.to}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Departure: {flight.departureTime} | Arrival: {flight.arrivalTime}
                  </p>
                  <p className="text-lg font-medium text-green-600 mt-2">₹{flight.price}</p>
                </div>
                <button
                  onClick={() => bookFlight(flight.id)}
                  disabled={bookedFlights.includes(flight.id)}
                  className={`${
                    bookedFlights.includes(flight.id)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white px-6 py-2 rounded-lg font-semibold transition`}
                >
                  {bookedFlights.includes(flight.id) ? "Booked ✔" : "Book Now"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Flights;
