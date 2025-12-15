function MovieItem({ movie, onDelete }) {
  return (
    <li className= "movie-item" >
      <div className="movie-content" >
        <div className="movie-title">{movie.title}</div>
        {movie.review && (
          <div className="movie-meta">
            <span>{movie.review}</span>
          </div>
        )}
        {typeof movie.rating === "number" && (
          <div className="movie-meta">
            <span>⭐ {movie.rating}/10</span>
          </div>
        )}
      </div>

      <button
        type="button"
        className="delete-button"
        onClick={() => onDelete(movie._id)}
        aria-label="Delete movie"
      >
        ✕
      </button>
    </li>
  );
}   

export default MovieItem;