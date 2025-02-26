import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./index.css";
import App from "./App.jsx";
import Navigation from "./pages/Navigation.jsx";

const Movie = lazy(() => import("./pages/Movie.jsx"));
const Movies = lazy(() => import("./pages/Movies.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const MovieCast = lazy(() => import("./pages/MovieCast.jsx"));
const MovieReviews = lazy(() => import("./pages/MovieReviews.jsx"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<Movie />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
