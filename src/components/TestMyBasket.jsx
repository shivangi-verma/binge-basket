// import React, { useEffect, useState } from "react";
// import { useBasket } from "../BasketContext";

// function MyBasketPage() {
//   const { basket, setBasket } = useBasket();
//   const [basketMovies, setBasketMovies] = useState([]);

//   useEffect(() => {
//     // Load basket from local storage on mount
//     const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
//     setBasket(storedBasket);
//   }, []);

//   useEffect(() => {
//     setBasketMovies(basket); // Update basketMovies when basket changes
//   }, [basket]);

//   const removeFromBasket = (movieId) => {
//     const updatedBasket = basket.filter((movie) => movie.id !== movieId);
//     setBasket(updatedBasket); // Update basket after removing the movie
//     localStorage.setItem("basket", JSON.stringify(updatedBasket)); // Update local storage
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-4">My Basket</h2>
//       {basketMovies.length ? (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
//           {basketMovies.map((movie) => (
//             <div key={movie.id} className="relative">
//               <img
//                 src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                 alt={movie.title}
//                 className="w-full rounded-lg"
//               />
//               <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2 truncate">
//                 {movie.title}
//               </p>
//               <button
//                 onClick={() => removeFromBasket(movie.id)}
//                 className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="mt-4">No movies in the basket</p>
//       )}
//     </div>
//   );
// }

// export default MyBasketPage;

// ---------------------------------------------------------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import { useBasket } from "../BasketContext";
// import { fetchMovies } from "../utils/api";

// function MyBasketPage() {
//   const { basket } = useBasket();
//   const [basketMovies, setBasketMovies] = useState([]);
//   const [shareableLink, setShareableLink] = useState(""); // State to hold the shareable link

//   useEffect(() => {
//     // Load basket from local storage on mount
//     const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
//     setBasketMovies(storedBasket);
//   }, []);

//   useEffect(() => {
//     setBasketMovies(basket); // Update basketMovies when basket changes
//   }, [basket]);

//   const removeFromBasket = (movieId) => {
//     const updatedBasket = basket.filter((movie) => movie.id !== movieId);
//     localStorage.setItem("basket", JSON.stringify(updatedBasket)); // Update local storage
//   };

//   const generateShareableLink = async () => {
//     try {
//       const movieTitles = await Promise.all(
//         basketMovies.map(async (movie) => {
//           const movieData = await fetchMovieData(movie.id);
//           return movieData.title;
//         })
//       );

//       const baseUrl = window.location.origin;
//       const link = `${baseUrl}/shared-basket?movies=${movieTitles.join(",")}`;
//       setShareableLink(link); // Set the shareable link
//     } catch (error) {
//       console.error("Error generating shareable link:", error);
//     }
//   };

//   const fetchMovieData = async (movieId) => {
//     try {
//       const response = await fetch(
//         `https://api.themoviedb.org/3/movie/${movieId}?api_key=7c14b56db12384801fae8fe49218706e`
//       ); // Replace YOUR_API_KEY with your actual API key
//       if (!response.ok) {
//         throw new Error("Failed to fetch movie data");
//       }
//       const movieData = await response.json();
//       return movieData;
//     } catch (error) {
//       console.error("Error fetching movie data:", error);
//       throw error;
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-4">My Basket</h2>
//       {basketMovies.length ? (
//         <div>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
//             {basketMovies.map((movie) => (
//               <div key={movie.id} className="relative">
//                 <img
//                   src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                   alt={movie.title}
//                   className="w-full rounded-lg"
//                 />
//                 <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2 truncate">
//                   {movie.title}
//                 </p>
//                 <button
//                   onClick={() => removeFromBasket(movie.id)}
//                   className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//           <p className="mt-4">
//             Share your basket with others:{" "}
//             <input
//               type="text"
//               readOnly
//               value={shareableLink} // Use the shareable link state here
//               className="border p-2 w-full"
//             />
//           </p>
//           <button onClick={generateShareableLink}>
//             Generate Shareable Link
//           </button>
//         </div>
//       ) : (
//         <p className="mt-4">No movies in the basket</p>
//       )}
//     </div>
//   );
// }

// export default MyBasketPage;
// ---------------------------------------------------------------------------------------------------------------------------------------

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

  // Function to fetch data and generate dynamic link
  const generateShareableLink = async (basket) => {
    // Example API call to fetch data
    // Replace 'API_ENDPOINT' with your actual API endpoint
    try {
      const response = await fetch(API_ENDPOINT);
      if (response.ok) {
        const data = await response.json();
        const basketIds = basket.map((movie) => movie.id);
        // Generate link based on fetched data and basket ids
        const link = `https://example.com/share?movies=${basketIds.join(
          ","
        )}&data=${JSON.stringify(data)}`;
        setShareableLink(link);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
// import React, { useEffect, useState } from "react";
// import { useBasket } from "../BasketContext";

// function MyBasketPage() {
//   const { basket, setBasket } = useBasket();
//   const [basketMovies, setBasketMovies] = useState([]);
//   const [shareableLink, setShareableLink] = useState(""); // State to hold the shareable link

//   useEffect(() => {
//     // Load basket from local storage on mount
//     const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
//     setBasket(storedBasket);
//   }, []);

//   useEffect(() => {
//     setBasketMovies(basket); // Update basketMovies when basket changes
//     // Generate dynamic shareable link based on basket data
//     generateShareableLink(basket);
//   }, [basket]);

//   // Function to fetch data and generate dynamic link
//   const generateShareableLink = async (basket) => {
//     try {
//       const promises = basket.map(async (movie) => {
//         const response = await fetch(
//           `https://api.themoviedb.org/3/movie/${movie.id}?api_key=7c14b56db12384801fae8fe49218706e`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         return response.json();
//       });

//       const movieDataArray = await Promise.all(promises);
//       const basketIds = basket.map((movie) => movie.id);

//       // Generate link based on fetched data and basket ids
//       const link = `https://example.com/share?movies=${basketIds.join(
//         ","
//       )}&data=${JSON.stringify(movieDataArray)}`;
//       setShareableLink(link);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const removeFromBasket = (movieId) => {
//     const updatedBasket = basket.filter((movie) => movie.id !== movieId);
//     setBasket(updatedBasket); // Update basket after removing the movie
//     localStorage.setItem("basket", JSON.stringify(updatedBasket)); // Update local storage
//   };

//   const handleGenerateLink = () => {
//     generateShareableLink(basket);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-4">My Basket</h2>
//       {basketMovies.length ? (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
//           {basketMovies.map((movie) => (
//             <div key={movie.id} className="relative">
//               <img
//                 src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                 alt={movie.title}
//                 className="w-full rounded-lg"
//               />
//               <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2 truncate">
//                 {movie.title}
//               </p>
//               <button
//                 onClick={() => removeFromBasket(movie.id)}
//                 className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="mt-4">No movies in the basket</p>
//       )}
//       <div className="mt-4">
//         <button
//           onClick={handleGenerateLink}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
//         >
//           Generate Shareable Link
//         </button>
//       </div>
//       {shareableLink && (
//         <div className="mt-4">
//           <p>Share this link with your peers:</p>
//           <a href={shareableLink} target="_blank" rel="noopener noreferrer">
//             {shareableLink}
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MyBasketPage;

// import React, { useEffect, useState } from "react";
// import { useBasket } from "../BasketContext";

// function MyBasketPage() {
//   const { basket, setBasket } = useBasket();
//   const [basketMovies, setBasketMovies] = useState([]);
//   const [shareableLink, setShareableLink] = useState(""); // State to hold the shareable link

//   useEffect(() => {
//     // Load basket from local storage on mount
//     const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
//     setBasket(storedBasket);
//   }, []);

//   useEffect(() => {
//     setBasketMovies(basket); // Update basketMovies when basket changes
//     // Generate dynamic shareable link based on basket data
//     generateShareableLink(basket);
//   }, [basket]);

//   // Function to fetch data and generate dynamic link
//   const generateShareableLink = async (basket) => {
//     // Example API call to fetch data
//     // Replace 'API_ENDPOINT' with your actual API endpoint
//     try {
//       const response = await fetch(API_ENDPOINT);
//       if (response.ok) {
//         const data = await response.json();
//         const basketIds = basket.map((movie) => movie.id);
//         // Generate link based on fetched data and basket ids
//         const link = `https://example.com/share?movies=${basketIds.join(
//           ","
//         )}&data=${JSON.stringify(data)}`;
//         setShareableLink(link);
//       } else {
//         throw new Error("Failed to fetch data");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const removeFromBasket = (movieId) => {
//     const updatedBasket = basket.filter((movie) => movie.id !== movieId);
//     setBasket(updatedBasket); // Update basket after removing the movie
//     localStorage.setItem("basket", JSON.stringify(updatedBasket)); // Update local storage
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-4">My Basket</h2>
//       {basketMovies.length ? (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
//           {basketMovies.map((movie) => (
//             <div key={movie.id} className="relative">
//               <img
//                 src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                 alt={movie.title}
//                 className="w-full rounded-lg"
//               />
//               <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2 truncate">
//                 {movie.title}
//               </p>
//               <button
//                 onClick={() => removeFromBasket(movie.id)}
//                 className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="mt-4">No movies in the basket</p>
//       )}
//       {shareableLink && (
//         <div className="mt-4">
//           <p>Share this link with your peers:</p>
//           <a href={shareableLink} target="_blank" rel="noopener noreferrer">
//             {shareableLink}
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MyBasketPage
// #####################################################################################
// import React, { useEffect, useState } from "react";
// import { fetchMovies, getGenres } from "../utils/api";
// import { Link } from "react-router-dom";
// import { useBasket } from "../BasketContext";

// function MoviePage() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [movies, setMovies] = useState([]);
//   const [genres, setGenres] = useState([]);
//   const [selectedGenre, setSelectedGenre] = useState("");
//   const [genresLoaded, setGenresLoaded] = useState(false);
//   const { basket, setBasket } = useBasket(); // Use the useBasket hook

//   useEffect(() => {
//     fetchGenres();
//   }, []);

//   useEffect(() => {
//     const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
//     setBasket(storedBasket);
//   }, []); // Load basket from local storage on mount

//   useEffect(() => {
//     localStorage.setItem("basket", JSON.stringify(basket));
//   }, [basket]); // Update local storage whenever basket changes

//   useEffect(() => {
//     if (genresLoaded) {
//       fetchMoviesByGenre(selectedGenre);
//     }
//   }, [genresLoaded, selectedGenre]);

//   const fetchGenres = async () => {
//     try {
//       const genres = await getGenres();
//       setGenres(genres);
//       setGenresLoaded(true);
//     } catch (error) {
//       console.error("Error fetching genres:", error);
//     }
//   };

//   const fetchMoviesByGenre = async (genre) => {
//     try {
//       const movies = await fetchMovies({ genre, type: "movie" });
//       setMovies(movies);
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     }
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.pageYOffset === 0 ? false : true);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleGenreChange = (event) => {
//     const selectedGenre = event.target.value;
//     setSelectedGenre(selectedGenre);
//   };

//   const handleAddToBasket = (movie) => {
//     // Check if the movie with the same ID already exists in the basket
//     const existingItemIndex = basket.findIndex((item) => item.id === movie.id);
//     if (existingItemIndex === -1) {
//       // If the movie is not already in the basket, add it
//       setBasket([...basket, movie]);
//     } else {
//       // If the movie is already in the basket, update its quantity or any other relevant property
//       // For example, you could increase the quantity
//       const updatedBasket = [...basket];
//       updatedBasket[existingItemIndex].quantity++; // Assuming each item has a 'quantity' property
//       setBasket(updatedBasket);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <div className="container mx-auto p-4">
//         <h2 className="text-2xl font-semibold mb-4">Choose a Genre</h2>
//         <select
//           value={selectedGenre}
//           onChange={handleGenreChange}
//           className="p-2 border rounded-md"
//         >
//           <option value="">All Genres</option>
//           {genres.map((genre) => (
//             <option key={genre.id} value={genre.id}>
//               {genre.name}
//             </option>
//           ))}
//         </select>
//         {movies.length ? (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
//             {movies.map((movie) => (
//               <div key={movie.id} className="relative">
//                 <img
//                   src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                   alt={movie.title}
//                   className="w-full rounded-lg"
//                 />
//                 <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2 truncate">
//                   {movie.title}
//                 </p>
//                 <button
//                   onClick={() => handleAddToBasket(movie)}
//                   className="absolute top-2 right-2 bg-white text-black hover:bg-blue-300  px-2 py-1 rounded-md transition-colors duration-300"
//                 >
//                   +
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="mt-4">No movies available</p>
//         )}
//         <Link to="/mybasket" className="mt-4 block text-blue-500 underline">
//           Go to My Basket
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default MoviePage;
// ####################################################################################################

// import React, { useEffect, useState } from "react";
// import { useBasket } from "../BasketContext";

// function MyBasketPage() {
//   const { basket, setBasket } = useBasket();
//   const [basketMovies, setBasketMovies] = useState([]);
//   const [shareableLink, setShareableLink] = useState(""); // State to hold the shareable link

//   useEffect(() => {
//     // Load basket from local storage on mount
//     const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
//     setBasket(storedBasket);
//   }, []);

//   useEffect(() => {
//     setBasketMovies(basket); // Update basketMovies when basket changes
//     // Generate dynamic shareable link based on basket data
//     generateShareableLink(basket);
//   }, [basket]);

//   // Function to generate shareable link
//   const generateShareableLink = (basket) => {
//     try {
//       const basketIds = basket.map((movie) => movie.id);
//       const baseUrl = window.location.origin; // Get the current base URL
//       const path = "/mybasket"; // Path to the MyBasket page
//       const queryString = `?movies=${basketIds.join(",")}`; // Query string with movie IDs

//       // Generate the complete shareable link
//       const link = baseUrl + path + queryString;
//       setShareableLink(link);
//     } catch (error) {
//       console.error("Error generating shareable link:", error);
//     }
//   };

//   const removeFromBasket = (movieId) => {
//     const updatedBasket = basket.filter((movie) => movie.id !== movieId);
//     setBasket(updatedBasket); // Update basket after removing the movie
//     localStorage.setItem("basket", JSON.stringify(updatedBasket)); // Update local storage
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-4">My Basket</h2>
//       {basketMovies.length ? (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
//           {basketMovies.map((movie) => (
//             <div key={movie.id} className="relative">
//               <img
//                 src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                 alt={movie.title}
//                 className="w-full rounded-lg"
//               />
//               <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2 truncate">
//                 {movie.title}
//               </p>
//               <button
//                 onClick={() => removeFromBasket(movie.id)}
//                 className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="mt-4">No movies in the basket</p>
//       )}
//       {shareableLink && (
//         <div className="mt-4">
//           <p>Share this link with your peers:</p>
//           <a href={shareableLink} target="_blank" rel="noopener noreferrer">
//             {shareableLink}
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MyBasketPage;
