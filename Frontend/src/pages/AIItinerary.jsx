import React, { useState } from 'react';
import axios from 'axios';
import { Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const questions = [
  { id: 'destination', label: 'Where do you want to go?' },
  { id: 'duration', label: 'How many days will you stay?' },
  { id: 'travelStyle', label: 'What kind of trip? (Adventure, Relaxing, Culture, etc.)' },
  { id: 'interests', label: 'Any specific interests or activities?' },
  { id: 'budget', label: 'What is your budget range?' }
];

const AiItineraryPage = () => {
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState('');

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const generatePrompt = () => {
    return `
Create a detailed travel itinerary based on the following:
- Destination: ${answers.destination}
- Duration: ${answers.duration} days
- Travel Style: ${answers.travelStyle}
- Interests: ${answers.interests}
- Budget: ${answers.budget}

The itinerary should include suggested activities per day, meal recommendations, and local travel tips.
    `.trim();
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions.");
      return;
    }

    setLoading(true);
    setItinerary('');

    try {
      const response = await axios.post('http://localhost:8080/api/ai/generate-itinerary', {
        prompt: generatePrompt(),
      });

      setItinerary(response.data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while generating itinerary.");
    }

    setLoading(false);
  };

  const handleDownload = () => {
    const element = document.getElementById('itinerary-output');
    const opt = {
      margin:       0.5,
      filename:     'AI_Itinerary.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">AI Itinerary Generator 🤖✈️</h1>

        {questions.map((q) => (
          <div key={q.id} className="mb-4">
            <label className="block font-semibold text-gray-700 mb-1">{q.label}</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={answers[q.id] || ''}
              onChange={(e) => handleChange(q.id, e.target.value)}
              placeholder="Type your answer..."
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          {loading ? 'Generating Itinerary...' : 'Generate Itinerary'}
        </button>

        {itinerary && (
          <div className="mt-10">
            <div id="itinerary-output" className="p-6 border-l-4 border-green-500 bg-green-50 rounded-xl shadow-md space-y-4">
              <h2 className="text-2xl font-semibold text-green-700 mb-2">🗺️ Your AI-Powered Itinerary</h2>
              {itinerary
                .split('\n')
                .filter((line) => line.trim() !== '')
                .map((line, idx) => {
                  const isDayHeader = /^Day \d+/i.test(line.trim());
                  const isSectionHeader = /^(Activities|Meals|Tips)/i.test(line.trim());
                  return (
                    <p
                      key={idx}
                      className={`text-sm leading-relaxed ${
                        isDayHeader
                          ? 'text-lg font-bold text-indigo-600 mt-4'
                          : isSectionHeader
                          ? 'font-semibold text-gray-700 underline'
                          : 'text-gray-800'
                      }`}
                    >
                      {line}
                    </p>
                  );
                })}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
              >
                <Download className="w-4 h-4" />
                Download as PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiItineraryPage;
