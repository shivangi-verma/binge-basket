import React, { useEffect, useState } from "react";
import { fetchMovies, getGenres } from "../utils/api";
import { Link } from "react-router-dom";
import { useBasket } from "../BasketContext";

function MoviePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genresLoaded, setGenresLoaded] = useState(false);
  const { basket, setBasket } = useBasket(); // Use the useBasket hook

  useEffect(() => {
    console.log("Fetching genres...");
    fetchGenres();
  }, []);

  useEffect(() => {
    console.log("Updating basket from local storage...");
    const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    setBasket(storedBasket);
  }, []); // Load basket from local storage on mount

  useEffect(() => {
    console.log("Updating local storage with basket changes...");
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]); // Update local storage whenever basket changes

  useEffect(() => {
    if (genresLoaded) {
      console.log("Fetching movies by genre...");
      fetchMoviesByGenre(selectedGenre);
    }
  }, [genresLoaded, selectedGenre]);

  const fetchGenres = async () => {
    try {
      const genres = await getGenres();
      console.log("Genres fetched:", genres);
      setGenres(genres);
      setGenresLoaded(true);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchMoviesByGenre = async (genre) => {
    try {
      const movies = await fetchMovies({ genre, type: "movie" });
      console.log("Movies fetched:", movies);
      setMovies(movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    console.log("Selected genre:", selectedGenre);
    setSelectedGenre(selectedGenre);
  };

  const handleAddToBasket = (movie) => {
    console.log("Adding movie to basket:", movie);
    // Check if the movie with the same ID already exists in the basket
    const existingItemIndex = basket.findIndex((item) => item.id === movie.id);
    if (existingItemIndex === -1) {
      // If the movie is not already in the basket, add it
      setBasket([...basket, movie]);
    } else {
      // If the movie is already in the basket, update its quantity or any other relevant property
      // For example, you could increase the quantity
      const updatedBasket = [...basket];
      updatedBasket[existingItemIndex].quantity++; // Assuming each item has a 'quantity' property
      setBasket(updatedBasket);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Choose a Genre</h2>
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          className="p-2 border rounded-md"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        {movies.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {movies.map((movie) => (
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
                  onClick={() => handleAddToBasket(movie)}
                  className="absolute top-2 right-2 bg-white text-black hover:bg-blue-300  px-2 py-1 rounded-md transition-colors duration-300"
                >
                  +
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4">No movies available</p>
        )}
        <Link to="/mybasket" className="mt-4 block text-blue-500 underline">
          Go to My Basket
        </Link>
      </div>
    </div>
  );
}

export default MoviePage;
