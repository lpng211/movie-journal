const express = require("express");
const Movie = require("../models/movie");

const router = express.Router();

//Advanced feature: OMDb search
router.get("/search", async (req, res) => {
  const { title } = req.query;

  //No empty search
  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title query is required" });
  }

  try {
    const apiKey = process.env.OMDB_API_KEY;
    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "API key is not set on the server" });
    }

    const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
      title.trim()
    )}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "False") {
      return res.status(404).json({ error: data.Error || "Movie not found" });
    }

    res.json({
      title: data.Title,
      year: data.Year,
      poster: data.Poster,
      plot: data.Plot,
      runtime: data.Runtime,
      imdbRating: data.imdbRating,
    });
  } catch (err) {
    console.error("Error calling OMDb:", err);
    res.status(500).json({ error: "Failed to fetch movie from OMDb" });
  }
});

//Gets all saved movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.status(200).json(movies);
  } catch (err) {
    console.error("Error fetching movies:", err);
    res.status(500).json({ error: "Server error" });
  }
});

//Creates a new movie entry
router.post("/", async (req, res) => {
  try {
    const { title, review, rating, watchedAt } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Missing title" });
    }

    const movie = await Movie.create({
      title: title.trim(),
      review: review || "",
      rating,
      watchedAt,
    });

    res.status(201).json(movie);
  } catch (err) {
    console.error("Error creating movie:", err);
    res.status(400).json({ error: "Could not create movie" });
  }
});

//Updates existing entry
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating movie:", err);
    res.status(400).json({ error: "Could not update movie" });
  }
});

//Deletes a movie entry by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Movie.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({
      message: "Movie deleted",
      movie: deleted,
    });
  } catch (err) {
    console.error("Error deleting movie:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
