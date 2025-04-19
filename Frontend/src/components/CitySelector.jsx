import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapPin } from 'lucide-react'; // Optional: Add location icon

function CitySelector({ onCitySelect }) {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get('/api/cities')
      .then((res) => setCities(res.data))
      .catch((err) => console.error('Error loading cities:', err));
  }, []);

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-lg p-5">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
        <MapPin className="w-4 h-4 text-teal-500" />
        Select a City
      </label>
      <select
        onChange={(e) => onCitySelect(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all"
      >
        <option value="">-- Choose a destination --</option>
        {cities.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CitySelector;
