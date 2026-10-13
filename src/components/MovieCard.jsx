import "../css/MovieCard.css"
import { Link } from "react-router-dom"
import { useMovieContext } from "../contexts/MovieContext"

function MovieCard({ movie }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        e.stopPropagation()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <Link to={`/movie/${movie.id}`} className="movie-link">
                    {movie.poster_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                    ) : (
                        <div className="no-poster">No image</div>
                    )}
                </Link>
                <div className="movie-overlay">
                    <button
                        className={`favorite-btn ${favorite ? "active" : ""}`}
                        onClick={onFavoriteClick}
                    >
                        ♥
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>
                    <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                </h3>
                <div className="movie-meta">
                    <span className="movie-year">
                        {movie.release_date?.split("-")[0]}
                    </span>
                    {movie.vote_average > 0 && (
                        <span className="movie-rating">
                            ⭐ {movie.vote_average.toFixed(1)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MovieCard