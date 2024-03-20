import React, { useEffect, useState } from "react";
import { fetchMovies, getGenres } from "../utils/api";
import { Link } from "react-router-dom";
import { useBasket } from "../BasketContext";

const TvShow = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [tvShows, setTvShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genresLoaded, setGenresLoaded] = useState(false);
  const { basket, setBasket } = useBasket(); // Use the useBasket hook

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    setBasket(storedBasket);
  }, []); // Load basket from local storage on mount

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]); // Update local storage whenever basket changes

  useEffect(() => {
    if (genresLoaded) {
      fetchTvShowsByGenre(selectedGenre);
    }
  }, [genresLoaded, selectedGenre]);

  const fetchGenres = async () => {
    try {
      const genres = await getGenres();
      setGenres(genres);
      setGenresLoaded(true);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchTvShowsByGenre = async (genre) => {
    try {
      // Replace fetchMovies with fetchTvShows or an appropriate API call
      const tvShows = await fetchMovies({ genre, type: "tv" });
      setTvShows(tvShows);
    } catch (error) {
      console.error("Error fetching tv shows:", error);
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
    setSelectedGenre(selectedGenre);
  };

  const handleAddToBasket = (tvShow) => {
    // Similar logic to handleAddToBasket for movies, adapt it for tv shows
    const existingItemIndex = basket.findIndex((item) => item.id === tvShow.id);
    if (existingItemIndex === -1) {
      setBasket([...basket, tvShow]);
    } else {
      const updatedBasket = [...basket];
      updatedBasket[existingItemIndex].quantity++;
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
        {tvShows.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {tvShows.map((tvShow) => (
              <div key={tvShow.id} className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                  alt={tvShow.name}
                  className="w-full rounded-lg"
                />
                <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2 truncate">
                  {tvShow.name}
                </p>
                <button
                  onClick={() => handleAddToBasket(tvShow)}
                  className="absolute top-2 right-2 bg-white text-black hover:bg-blue-300 px-2 py-1 rounded-md transition-colors duration-300"
                >
                  +
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4">No TV shows available</p>
        )}
        <Link to="/mybasket" className="mt-4 block text-blue-500 underline">
          Go to My Basket
        </Link>
      </div>
    </div>
  );
};

export default TvShow;
