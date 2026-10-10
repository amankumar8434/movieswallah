import "../css/Favorites.css";
import { Link } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { useScrollRestoration } from "../hooks/useScrollRestoration";

function Favorites() {
  const { favorites, clearFavorites } = useMovieContext();
  useScrollRestoration();

  const handleClearAll = () => {
    if (window.confirm("Remove all movies from your favorites?")) {
      clearFavorites();
    }
  };
  

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>No Favorite Movies Yet</h2>
        <p>Start adding movies to your favorites and they will appear here!</p>
        <Link to="/" className="browse-link">Browse movies</Link>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h2>Your Favorites</h2>

      <div className="favorites-toolbar">
        <span className="favorites-count">
          {favorites.length} {favorites.length === 1 ? "movie" : "movies"}
        </span>
        <button className="clear-all-btn" onClick={handleClearAll}>
          Clear all
        </button>
      </div>

      <div className="movies-grid">
        {favorites.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;