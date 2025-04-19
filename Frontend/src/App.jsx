import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Itinerary from './pages/Itinerary';
import Hotels from './pages/Hotels';
import Flights from './pages/Flights';
import Expenses from './pages/Expenses';
import Login from './pages/Login';
import Register from './pages/Register';
import Destination from './pages/Destination';
import ItineraryBuilderPage from './pages/ItineraryBuilder';
import AIItineraryPage from './pages/AIItinerary';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/destination" element={<Destination/>} />
        <Route path="/itinerary/builder" element={<ItineraryBuilderPage />} />
        <Route path="/itinerary/ai" element={<AIItineraryPage />} />
      </Routes>
    </>
  );
};

export default App;
