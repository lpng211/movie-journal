function MovieItem({ movie, onDelete }) {
  return (
    <li className= "task-item" >
      <div className="task-content" >
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
        onClick={() => onDelete(movie._id)}
        aria-label="Delete movie"
      >
        ✕
      </button>
    </li>
  );
}   

export default MovieItem;