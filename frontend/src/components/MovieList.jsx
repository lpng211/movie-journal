import MovieItem from './MovieItem';

function MovieList({ movies, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No entries yet. Add one above to get started!</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((movie) => (
        <MovieItem key={movie._id} movie={movie} onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default MovieList;