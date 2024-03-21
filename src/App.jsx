import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Movie from "./components/Movie";
import TvShow from "./components/TvShow";
import MyBasket from "./components/MyBasket";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

import { BasketProvider } from "./BasketContext";

function App() {
  return (
    <Router>
      <BasketProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movie />} />
            <Route path="/tvshows" element={<TvShow />} />
            <Route path="/mybasket" element={<MyBasket />} />
          </Routes>
          {/* <Footer /> */}
        </div>
      </BasketProvider>
    </Router>
  );
}

export default App;
