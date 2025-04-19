import React, { useEffect, useState } from 'react';
import axios from 'axios';

const phases = ['Morning', 'Noon', 'Evening', 'Night'];

function ActivityPanel({ selectedCityName }) {
  const [activities, setActivities] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState('Morning');

  useEffect(() => {
    if (selectedCityName) {
      axios.get(`/api/activities/city/${selectedCityName}`)
        .then((res) => setActivities(res.data))
        .catch((err) => console.error('Failed to load activities:', err));
    }
  }, [selectedCityName]);

  const filteredActivities = activities.filter(
    (activity) => activity.timePhase === selectedPhase
  );

  return (
    <div className="bg-gradient-to-b from-[#f5fafc] to-white p-4 rounded-lg shadow-inner border border-teal-100">

      {/* Time Phase Selector */}
      <div className="mb-4">
        <h4 className="text-md font-medium text-gray-700 mb-2">🕰️ Time of Day</h4>
        <div className="flex flex-wrap gap-2">
          {phases.map((phase) => (
            <button
              key={phase}
              onClick={() => setSelectedPhase(phase)}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-200 ${
                selectedPhase === phase
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {phase}
            </button>
          ))}
        </div>
      </div>

      {/* Activities List */}
      <div className="space-y-3">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="p-3 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition cursor-grab active:cursor-grabbing"
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData('text/plain', JSON.stringify(activity))
              }
            >
              <p className="font-semibold text-gray-800">{activity.title || 'Activity'}</p>
              <p className="text-sm text-gray-500">{activity.description}</p>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-400 italic">
            No activities found for <span className="capitalize">{selectedPhase}</span>.
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivityPanel;
