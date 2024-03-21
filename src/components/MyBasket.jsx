import React, { useEffect, useState } from "react";
import { useBasket } from "../BasketContext";

function MyBasketPage() {
  const { basket, setBasket } = useBasket();
  const [basketMovies, setBasketMovies] = useState([]);
  const [removedMessage, setRemovedMessage] = useState("");

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    setBasket(storedBasket);
  }, []);

  useEffect(() => {
    setBasketMovies(basket);
  }, [basket]);

  const removeFromBasket = (mediaId) => {
    const removedItem = basket.find((item) => item.id === mediaId);
    const updatedBasket = basket.filter((item) => item.id !== mediaId);
    setBasket(updatedBasket);
    localStorage.setItem("basket", JSON.stringify(updatedBasket));

    let message = "";
    if (removedItem) {
      message = `${
        removedItem.title || removedItem.name
      } was removed from the basket.`;
    } else {
      message = "Item was removed from the basket.";
    }
    setRemovedMessage(message);

    setTimeout(() => {
      setRemovedMessage("");
    }, 3000);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My Basket</h2>
      {basketMovies.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          {basketMovies.map((item) => (
            <div key={item.id} className="relative">
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name || "Unknown Title"}
              />
              <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2 truncate">
                {item.title || item.name || "Unknown Title"}
              </p>
              <button
                onClick={() => removeFromBasket(item.id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4">No items in the basket</p>
      )}
      {removedMessage && (
        <div className="fixed bottom-4 right-4 z-50">
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{removedMessage}</span>
            <button
              onClick={() => setRemovedMessage(null)}
              className="absolute top-0 right-0 px-2 py-1"
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
    </div>
  );
}

export default MyBasketPage;
