const express = require("express");
const Movie = require("../models/Movie");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.status(200).json(movies);
  } catch (err) {
    console.error("Error fetching movies:", err);
    res.status(500).json({ error: "Server error" });
  }
});

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