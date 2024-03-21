import React, { useEffect, useState } from "react";
import { fetchMovies, getGenres } from "../utils/api";
import { Link } from "react-router-dom";
import { useBasket } from "../BasketContext";
import searchIcon from "../assets/search-icon.png";

function MoviePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genresLoaded, setGenresLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState(null); // State for displaying the message
  const { basket, setBasket } = useBasket();

  useEffect(() => {
    console.log("Fetching genres...");
    fetchGenres();
  }, []);

  useEffect(() => {
    console.log("Updating basket from local storage...");
    const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    setBasket(storedBasket);
  }, []);

  useEffect(() => {
    console.log("Updating local storage with basket changes...");
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

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
      // Set the message to display movie added to basket
      setMessage(`${movie.title} was added to the basket.`);
    } else {
      // If the movie is already in the basket, show a different message
      setMessage(`${movie.title} is already in the basket.`);
    }
    // Clear the message after 3 seconds
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Choose a Genre</h2>
        <div className="flex justify-between">
          <select
            value={selectedGenre}
            onChange={handleGenreChange}
            className="p-2 border rounded-md mr-4"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <div className="relative flex justify-between">
            <img
              src={searchIcon}
              alt="Search Icon"
              className="absolute top-2 left-3 h-6 w-6 opacity-50 "
            />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 p-2 border rounded-md "
            />
          </div>
        </div>

        {message && (
          <div className="fixed bottom-4 right-4 z-50">
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{message}</span>
              <button
                onClick={() => setMessage(null)}
                className="absolute top-1 right-1 px-2 py-1"
              >
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9zm5.293 5.293a1 1 0 1 0-1.414-1.414L10 8.586 6.121 4.707a1 1 0 1 0-1.414 1.414L8.586 10l-3.879 3.879a1 1 0 1 0 1.414 1.414L10 11.414l3.879 3.879a1 1 0 1 0 1.414-1.414L11.414 10l3.879-3.879z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {filteredMovies.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {filteredMovies.map((movie) => (
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
