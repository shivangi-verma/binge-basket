import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <Link
        to="/"
        className="text-blue-400 hover:text-blue-300 font-bold text-3xl mr-auto"
      >
        Binge Basket
      </Link>
      <ul className="flex">
        <li className="mr-6">
          <Link to="/movies" className="text-white hover:text-blue-300">
            Movies
          </Link>
        </li>
        <li className="mr-6">
          <Link to="/tvshows" className="text-white hover:text-blue-300">
            TV Shows
          </Link>
        </li>
        <li className="mr-6">
          <Link to="/mybasket" className="text-white hover:text-blue-300">
            My Basket
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
