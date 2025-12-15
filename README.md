## Project description:

Movie and TV show journal to record your opinions as you watch them. Log what you’ve watched, write a review, and give it a rating.

## Tech stack:
- React 
- Netlify
- Node
- Express
- MongoDB
- OMDb API
- Render

## Features:
- Add a movie or show
- Write a review
- Add a rating
- View entries
- Delete entries
- Search movies
- Autofill
- Data stored

## Setup instructions:
1. Clone repository
2. cd backend, npm install, npm start
3. cd frontend, npm install, npm run dev

## Environment variables needed:
MONGODB_URI=your connection string here

OMDB_API_KEY=your api key

## Screenshots or demo link
https://drive.google.com/file/d/1_DWsncuAC0JZ3jzDeSZa-xIhdpkZ9sz_/view?usp=sharing

## AI Usage
- Used ChatGPT to give me a "dark mode" color pallete
- Used ChatGPT to debug MongoDB connection and deployment issues
- Used ChatGPT to fix a bug where MovieList referenced task instead of movies (lines 1-20 in MovieList.jsx)
- Used ChatGPT to fix an error caused by importing movie with the wrong file name (line 2 in movies.js)
- Used ChatGPT for suggestions on organizing the movie API helper functions
- Used ChatGPT for sanity checking

## AI Reflection
ChatGPT was helpful for organizing my API helper functions and debugging. It saved me time when debugging fetch errors. What didn’t work as well was it sometimes misdiagnosing what caused the error wasting some time.
