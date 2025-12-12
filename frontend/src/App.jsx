import { useEffect, useState } from "react";
import "./App.css";
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from "./api/movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleAddMovie = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const movie = await createMovie({
        title: newTitle,
        review: newReview,
        rating: newRating ? Number(newRating) : undefined,
      });

      setMovies([movie, ...movies]);
      setNewTitle("");
      setNewReview("");
      setNewRating("");
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
        <section className="task-section">
          <h2>Add a movie or show</h2>

          <form onSubmit={handleAddMovie} className="add-task-form">
            <input
              className="task-input"
              type="text"
              placeholder="Title (required)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <input
              className="task-input"
              type="text"
              placeholder="Short review"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
            <input
              className="task-input"
              type="number"
              min="0"
              max="10"
              placeholder="Rating /10"
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
            />
            <button type="submit" className="add-button">
              Add
            </button>
          </form>

          {movies.length === 0 ? (
            <div className="empty-state">
              <p>No entries yet. Add your first movie above</p>
            </div>
          ) : (
            <ul className="task-list">
              {movies.map((movie) => (
                <li key={movie._id} className="task-item">
                  <div className="task-content">
                    <div className="task-title">{movie.title}</div>
                    {movie.review && (
                      <div className="task-meta">
                        <span>{movie.review}</span>
                      </div>
                    )}
                    {typeof movie.rating === "number" && (
                      <div className="task-meta">
                        <span>⭐ {movie.rating}/10</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleDeleteMovie(movie._id)}
                    aria-label="Delete movie"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="timer-section">
          <h2>About app</h2>
          <p>
            Mvie and TV show journal. You can log what
            you’ve watched, write a review, and give it a rating
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;