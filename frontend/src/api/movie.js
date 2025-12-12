const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export async function getMovies() {
  const res = await fetch(`${API_BASE_URL}/api/movies`);
  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }
  return res.json();
}

export async function createMovie(movieData) {
  const res = await fetch(`${API_BASE_URL}/api/movies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movieData),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Could not create movie");
  }

  return res.json();
}

export async function updateMovie(id, updates) {
  const res = await fetch(`${API_BASE_URL}/api/movies/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    throw new Error("Could not update movie");
  }

  return res.json();
}

export async function deleteMovie(id) {
  const res = await fetch(`${API_BASE_URL}/api/movies/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Could not delete movie");
  }

  return res.json();
}