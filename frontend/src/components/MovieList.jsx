import MovieItem from './MovieItem';

function MovieList({ movies, onDelete }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="empty-state">
        <p>No entries yet. Add one above to get started!</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {movies.map((movie) => (
        <MovieItem key={movie._id} movie={movie} onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default MovieList;