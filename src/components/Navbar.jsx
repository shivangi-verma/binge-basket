import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-center">
        <li className="mr-6">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
        </li>
        <li className="mr-6">
          <Link to="/movies" className="text-white hover:text-gray-300">
            Movies
          </Link>
        </li>
        <li className="mr-6">
          <Link to="/tvshows" className="text-white hover:text-gray-300">
            TV Shows
          </Link>
        </li>
        <li className="mr-6">
          <Link to="/mybasket" className="text-white hover:text-gray-300">
            My Basket
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
