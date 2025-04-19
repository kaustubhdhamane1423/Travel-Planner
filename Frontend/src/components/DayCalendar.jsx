import React,{ useState } from "react";

const DayCalendar = () => {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">Select Date:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="p-2 border rounded w-full"
      />
      {selectedDate && (
        <p className="mt-2 text-sm text-gray-600">Itinerary for: {selectedDate}</p>
      )}
    </div>
  );
};

export default DayCalendar;
