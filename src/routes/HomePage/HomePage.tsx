import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const nav = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f4f5f7] px-4 sm:px-6 lg:px-8">
      <div className="p-8 max-w-xs sm:max-w-md lg:max-w-lg text-center relative">
        {/* 
        <div className="bg-gray-200 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <span className="text-gray-600">LOGO</span>
        </div> 
        */}

        <h1 className="text-2xl font-bold text-black-900 mb-2">
          Welcome to Bookish
        </h1>

        <p className="text-gray-600 my-5 text-sm font-medium">
          Connect, read, and discuss with book lovers around the world.
        </p>

        <button
          onClick={() => nav("/signUp")}
          className="bg-[#07090c] text-white py-2 px-4 rounded-lg w-5/6 mt-4 transition duration-300 hover:bg-[#1a1c1f]"
        >
          Create Account
        </button>
        <button
          onClick={() => nav("/signIn")}
          className="bg-[#ebebeb] text-black py-2 px-4 rounded-lg w-5/6 mt-4 transition duration-300 hover:bg-gray-300"
        >
          Login
        </button>

        <div className="py-10 text-sm text-gray-600">
          <p>By continuing, you agree to our</p>
          <a href="/privacy-policy" className="underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
