import MovieItem from './MovieItem';

function MovieList({ movies, onDelete }) {
  //Empty state when database returns no items
  if (!movies || movies.length === 0) {
    return (
      <div className="empty-state">
        <p>No entries yet. Add one above to get started!</p>
      </div>
    );
  }

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <MovieItem key={movie._id} movie={movie} onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default MovieList;