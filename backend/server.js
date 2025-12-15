require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const moviesRouter = require("./routes/movies");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());          
app.use(express.json());  

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB error:", err));

app.get("/", (req, res) => {
  res.json({
    message: "Movie Journal API",
    status: "Running",
  });
});

app.use("/api/movies", moviesRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
