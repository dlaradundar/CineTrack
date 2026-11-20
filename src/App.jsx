
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css";

function App() {
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("movies");

    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  function addMovie(newMovie) {
    setMovies([...movies, newMovie]);
  }


function deleteMovie(id) {
  setMovies(movies.filter((movie) => movie.id !== id));
}

function updateMovie(updatedMovie) {
  setMovies(
    movies.map((movie) =>
      movie.id === updatedMovie.id ? updatedMovie : movie
    )
  );
}


  return (
    <div className="app">
      <Navbar />
      <Home
          movies={movies}
          onAddMovie={addMovie}
          onDeleteMovie={deleteMovie}
          onUpdateMovie={updateMovie}
      />
    </div>
  );
}

export default App;
