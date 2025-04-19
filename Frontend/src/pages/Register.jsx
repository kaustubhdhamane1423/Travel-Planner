import React from "react";
const Register = () => {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="bg-white p-8 rounded-lg shadow-md w-80 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
          <form>
            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
                placeholder="Create a password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition duration-200"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Register;
  