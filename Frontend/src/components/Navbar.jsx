import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-orange-500 text-white px-8 py-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold">TravelWORLD</div>
      <div className="space-x-6 text-lg font-medium">
        <Link to="/" className="hover:text-orange-200">Home</Link>
        <Link to="/itinerary" className="hover:text-orange-200">Itinerary</Link>
        <Link to="/hotels" className="hover:text-orange-200">Hotels</Link>
        <Link to="/flights" className="hover:text-orange-200">Flights</Link>
        <Link to="/expenses" className="hover:text-orange-200">Expenses</Link>
        <Link to="/login" className="hover:text-orange-200">Login</Link>
        <Link to="/register" className="hover:text-orange-200">Register</Link>
        <Link to="/destination" className="hover:text-orange-200">Destination</Link>
      </div>
    </nav>
  );
};

export default Navbar;
