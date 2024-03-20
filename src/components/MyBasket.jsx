import React, { useEffect, useState } from "react";
import { useBasket } from "../BasketContext";

function MyBasketPage() {
  const { basket, setBasket } = useBasket();
  const [basketMovies, setBasketMovies] = useState([]);
  const [shareableLink, setShareableLink] = useState(""); // State to hold the shareable link

  useEffect(() => {
    // Load basket from local storage on mount
    const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    setBasket(storedBasket);
  }, []);

  useEffect(() => {
    setBasketMovies(basket); // Update basketMovies when basket changes
    // Generate dynamic shareable link based on basket data
    generateShareableLink(basket);
  }, [basket]);

  // Function to generate shareable link
  const generateShareableLink = (basket) => {
    try {
      const basketIds = basket.map((movie) => movie.id);
      const baseUrl = window.location.origin; // Get the current base URL
      const path = "/mybasket"; // Path to the MyBasket page
      const queryString = `?movies=${basketIds.join(",")}`; // Query string with movie IDs

      // Generate the complete shareable link
      const link = baseUrl + path + queryString;
      setShareableLink(link);
    } catch (error) {
      console.error("Error generating shareable link:", error);
    }
  };

  const removeFromBasket = (movieId) => {
    const updatedBasket = basket.filter((movie) => movie.id !== movieId);
    setBasket(updatedBasket); // Update basket after removing the movie
    localStorage.setItem("basket", JSON.stringify(updatedBasket)); // Update local storage
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My Basket</h2>
      {basketMovies.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          {basketMovies.map((movie) => (
            <div key={movie.id} className="relative">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-lg"
              />
              <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2 truncate">
                {movie.title}
              </p>
              <button
                onClick={() => removeFromBasket(movie.id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4">No movies in the basket</p>
      )}
      {shareableLink && (
        <div className="mt-4">
          <p>Share this link with your peers:</p>
          <a href={shareableLink} target="_blank" rel="noopener noreferrer">
            {shareableLink}
          </a>
        </div>
      )}
    </div>
  );
}

export default MyBasketPage;
