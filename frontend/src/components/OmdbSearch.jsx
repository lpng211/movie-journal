import { useState } from "react";
import { searchByTitle } from "../api/movies";

function OmdbSearch({ onPickTitle }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //Searches OMDb through backend route
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setResult(null);
      const data = await searchByTitle(query);
      setResult(data);
    } catch (err) {
      setError(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  //Sends title to App so MovieForm prefills
  const handleUseTitle = () => {
    if (result && result.title) {
      onPickTitle(result.title);
    }
  };

  return (
    <div className="omdb-search">
      <h3>Search with OMDb</h3>
      <form onSubmit={handleSearch} className="movie-form">
        <input
          className="movie-input"
          type="text"
          placeholder="Search by title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="add-button">
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>
      )}

      {result && (
        <div className="search-result-card">
          {result.poster && result.poster !== "N/A" && (
            <img
              src={result.poster}
              alt={result.title}
              style={{ maxWidth: "120px", borderRadius: "8px" }}
            />
          )}

          <div style={{ marginLeft: "1rem" }}>
            <h4>
              {result.title} ({result.year})
            </h4>
            {result.plot && <p>{result.plot}</p>}
            {result.imdbRating && <p>IMDb: ⭐ {result.imdbRating}</p>}

            <button
              type="button"
              className="add-button"
              onClick={handleUseTitle}
              style={{ marginTop: "0.5rem" }}
            >
              Use this title
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OmdbSearch;