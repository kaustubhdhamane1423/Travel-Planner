import React, { useState } from 'react';
import CitySelector from '../components/CitySelector';
import ActivityPanel from '../components/ActivityPanel';
import jsPDF from 'jspdf';

function ItineraryBuilderPage() {
  const [selectedCityName, setSelectedCityName] = useState('');
  const [days, setDays] = useState([]);

  const handleDrop = (e, dayIndex) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    try {
      const item = JSON.parse(data);
      const updatedDays = [...days];
      updatedDays[dayIndex].items.push(item);
      setDays(updatedDays);
    } catch (err) {
      console.error('Invalid drop data:', err);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleAddDay = () => {
    const today = new Date();
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + days.length);
    const formattedDate = nextDate.toISOString().split('T')[0];

    const newDay = {
      label: `Day ${days.length + 1} - ${formattedDate}`,
      items: []
    };

    setDays((prev) => [...prev, newDay]);
  };

  const handleLabelChange = (e, index) => {
    const updatedDays = [...days];
    updatedDays[index].label = e.target.value;
    setDays(updatedDays);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(30, 100, 180);
    doc.text('Travel Itinerary', 105, 15, null, null, 'center');

    days.forEach((day) => {
      doc.setFontSize(14);
      doc.setTextColor(40, 40, 40);
      doc.text(day.label, 10, y);
      y += 8;

      if (day.items.length === 0) {
        doc.setFontSize(11);
        doc.setTextColor(120, 120, 120);
        doc.text('- No activities added -', 12, y);
        y += 10;
      } else {
        day.items.forEach((item) => {
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 128);
          doc.text(`• ${item.title || ''}`, 12, y);
          y += 6;
          doc.setFontSize(10);
          doc.setTextColor(90, 90, 90);
          doc.text(item.description || '', 16, y);
          y += 8;
        });
      }

      y += 10;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('Generated with ❤️ by Travv Planner', 105, 290, null, null, 'center');

    doc.save('My_Itinerary.pdf');
  };

  const handleClearDays = () => {
    if (window.confirm('Are you sure you want to clear all days?')) {
      setDays([]);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800">
      {/* LEFT PANEL */}
      <div className="w-1/4 border-r bg-white p-5 overflow-y-auto shadow-md">
        <h2 className="text-2xl font-extrabold mb-5 text-blue-700 tracking-wide">
          🧭 Plan Your Trip
        </h2>
        <CitySelector onCitySelect={setSelectedCityName} />
        <hr className="my-6 border-gray-300" />
        {selectedCityName && (
          <ActivityPanel selectedCityName={selectedCityName} />
        )}
      </div>

      {/* RIGHT PANEL */}
      <div className="w-3/4 p-10 overflow-y-auto">
        {/* Top Button Bar */}
        <div className="flex justify-between items-center mb-10">
          <div className="space-x-4">
            <button
              onClick={handleAddDay}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition font-medium"
            >
              ➕ Add Day
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow transition font-medium"
            >
              📥 Download PDF
            </button>
            <button
              onClick={handleClearDays}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow transition font-medium"
            >
              🗑️ Clear All
            </button>
          </div>
        </div>

        {/* Day Sections */}
        {days.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-32 text-center text-gray-500">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7474/7474572.png"
              alt="Empty Plan"
              className="w-28 h-28 mb-5 opacity-70"
            />
            <h3 className="text-2xl font-semibold mb-2">No Days Added Yet!</h3>
            <p className="text-sm mb-4">Start building your dream itinerary ✈️</p>
            <button
              onClick={handleAddDay}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow transition"
            >
              ➕ Add Your First Day
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {days.map((day, index) => (
              <div key={index} className="bg-white p-5 rounded-xl border border-blue-100 shadow">
                <input
                  className="text-xl font-semibold mb-4 w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent"
                  value={day.label}
                  onChange={(e) => handleLabelChange(e, index)}
                />
                <div
                  className="min-h-[70px] p-4 border-dashed border-2 border-blue-300 bg-blue-50 rounded-lg"
                  onDrop={(e) => handleDrop(e, index)}
                  onDragOver={handleDragOver}
                >
                  {day.items.length === 0 ? (
                    <p className="text-sm text-blue-400 italic">
                      Drag activities here for this day.
                    </p>
                  ) : (
                    day.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white border-l-4 border-blue-400 p-4 mb-3 rounded shadow-sm"
                      >
                        <p className="font-medium text-blue-800 text-base">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ItineraryBuilderPage;
