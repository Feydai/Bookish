import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const nav = useNavigate()
  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xs sm:max-w-md lg:max-w-lg text-center relative">
        <div className="bg-gray-200 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <span className="text-gray-600">LOGO</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-900 mb-2">
          Welcome to Bookish
        </h1>
        <p className="text-gray-600 mb-4 text-sm sm:text-base lg:text-lg">
          Discover and discuss your favorite books with fellow readers.
        </p>
        <button onClick={() => nav('/signIn')} className="bg-purple-600 text-white py-2 px-4 rounded-lg w-full mt-4 hover:bg-purple-700 transition duration-300">
          Get Started !
        </button>
      </div>
    </div>
  );
};

export default HomePage;
