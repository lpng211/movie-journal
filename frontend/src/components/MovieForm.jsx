import { useState, useEffect } from 'react';

function MovieForm({ onAdd, autofillTitle }) {

  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

    //Picks a title from OMDb fills it into the form
    useEffect(() => {
    if (autofillTitle) {
      setTitle(autofillTitle);
    }
  }, [autofillTitle]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    //Lets parent handle API call and state update
    onAdd({ title, review, rating: rating ? Number(rating) : undefined });

    //Resets form after submit
    setTitle("");
    setReview("");
    setRating("");
  };

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <input
        type="text"
        placeholder="Movie Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="movie-input"
        type="text"
        placeholder="Review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <input
        className="movie-input"
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