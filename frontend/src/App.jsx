import { useEffect, useState } from "react";
import "./App.css";
import {
  getMovies,
  createMovie,
  deleteMovie,
} from "./api/movies";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import OmdbSearch from "./components/OmdbSearch";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //Passed into MovieForm when "Use this title" is clicked
  const [selectedTitleFromSearch, setSelectedTitleFromSearch] = useState("");

  //Loads saved entries on load
  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMovies();
      setMovies(data);
    } catch (err) {
      console.error("Error loading movies:", err);
      setError("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMovie = async (movieData) => {
    try {
      const movie = await createMovie(movieData);
      setMovies((prev) => [movie, ...prev]);
     } catch (err) {
      console.error("Error creating movie:", err);
      setError(err.message || "Could not add movie");
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      await deleteMovie(id);
      setMovies(movies.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Error deleting movie:", err);
      setError("Could not delete movie");
    }
  };

  if (loading) {
    return (
      <div className="app loading">
        <div className="spinner"></div>
        <p>Loading movies...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <h1>🎬 Movie & Show Journal</h1>
        <p>Journal to record your opinion about films as you watch them, or just to keep track of films you've seen in the past</p>
      </header>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      <main className="main-content">
        <section className="journal-section">
          <h2>Add a movie or show</h2>
          <MovieForm onAdd={handleAddMovie} autofillTitle={selectedTitleFromSearch} />
          <hr style={{ margin: "1.5rem 0" }} />

          <OmdbSearch onPickTitle={(title) => setSelectedTitleFromSearch(title)} />

          <hr style={{ margin: "1.5rem 0" }} />
          <MovieList movies={movies} onDelete={handleDeleteMovie} />
        </section>

        <section className="sidebar-section">
          <h2>About app</h2>
          <p>
            Movie and TV show journal. Log what you’ve watched, write a review, and give it a rating.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;