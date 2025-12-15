import { useState, useEffect } from 'react';

function MovieForm({ onAdd, prefillTitle }) {

  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

    useEffect(() => {
    if (prefillTitle) {
      setTitle(prefillTitle);
    }
  }, [prefillTitle]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({ title, review, rating: rating ? Number(rating) : undefined });

    setTitle("");
    setReview("");
    setRating("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        placeholder="Movie Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="task-input"
        type="text"
        placeholder="Review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <input
        className="task-input"
        type="number"
        min="0"
        max="10"
        placeholder="Rating /10"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <button type="submit" className="add-button">
        Add
      </button>
    </form>
  );
}

export default MovieForm;