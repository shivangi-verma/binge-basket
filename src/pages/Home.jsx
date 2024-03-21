import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import backgroundImage from "../assets/movies-bg.jpg"; // Importing the background image

const Home = () => {
  return (
    <div className="relative">
      <div
        className="bg-cover bg-center absolute inset-0"
        style={{ backgroundImage: `url(${backgroundImage})`, zIndex: -1 }}
      ></div>{" "}
      {/* Background image */}
      <div className="absolute inset-0 bg-black bg-opacity-75"></div>{" "}
      {/* Dark overlay */}
      <div className="flex flex-col items-center justify-center h-screen relative z-10">
        <h1 className="text-4xl font-bold mb-4 text-white ">
          Welcome to Binge Basket
        </h1>
        <p className="text-lg text-gray-100 mb-8">
          Your Ultimate Destination for Movie and TV Show Entertainment!
        </p>
        <div className="max-w-lg rounded-lg overflow-hidden shadow-lg bg-black">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Discover Endless Entertainment Options
            </h2>
            <p className="text-white">
              Explore our extensive catalog featuring thousands of movies and TV
              shows across a wide range of genres.
            </p>
          </div>
        </div>
        <p className="text-gray-100 mt-8">
          Ready to start your cinematic journey? Dive into the world of Binge
          Basket now!
        </p>
        {/* Wrap the button in a Link component */}
        <Link to="/movies">
          <button className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Start Browsing
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
