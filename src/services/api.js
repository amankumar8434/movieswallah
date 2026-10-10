const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const MAX_PAGES = 500; // TMDB limit

export const getPopularMovies = async (page = 1) => {
    const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
    );
    if (!response.ok) throw new Error("Failed to fetch popular movies");
    const data = await response.json();
    return {
        results: data.results,
        totalPages: Math.min(data.total_pages, MAX_PAGES),
    };
};

export const searchMovies = async (query, page = 1) => {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query
        )}&page=${page}`
    );
    if (!response.ok) throw new Error("Failed to search movies");
    const data = await response.json();
    return {
        results: data.results,
        totalPages: Math.min(data.total_pages, MAX_PAGES),
    };
};

export const getMovieDetails = async (id) => {
    const response = await fetch(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`
    );
    if (!response.ok) throw new Error("Failed to fetch movie details");
    return await response.json();
};