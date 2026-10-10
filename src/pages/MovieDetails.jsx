import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import DetailsSkeleton from "../components/DetailsSkeleton";
import "../css/MovieDetails.css";

const IMG_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_URL = "https://image.tmdb.org/t/p/w1280";

function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getMovieDetails(id);
                setMovie(data);
            } catch (err) {
                console.log(err);
                setError("Failed to load movie details...");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    useEffect(() => {
        if (movie) document.title = `${movie.title} | Movie Wallah`
        return () => { document.title = "Movie Wallah" }
    }, [movie])

    if (loading) return <DetailsSkeleton />;
    if (error) return <div className="error-massage">{error}</div>;
    if (!movie) return null;

    const favorite = isFavorite(movie.id);
    const toggleFavorite = () =>
        favorite ? removeFromFavorites(movie.id) : addToFavorites(movie);

    const trailer = movie.videos?.results.find(
        (v) => v.site === "YouTube" && v.type === "Trailer"
    );
    const cast = movie.credits?.cast.slice(0, 10) || [];
    const director = movie.credits?.crew.find((c) => c.job === "Director");

    return (
        <div className="movie-details">
            {movie.backdrop_path && (
                <div
                    className="details-backdrop"
                    style={{ backgroundImage: `url(${BACKDROP_URL}${movie.backdrop_path})` }}
                />
            )}

            <button className="back-button" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div className="details-main">
                {movie.poster_path && (
                    <img
                        className="details-poster"
                        src={`${IMG_URL}${movie.poster_path}`}
                        alt={movie.title}
                    />
                )}

                <div className="details-info">
                    <h1>
                        {movie.title}{" "}
                        <span className="details-year">
                            {movie.release_date?.split("-")[0]}
                        </span>
                    </h1>

                    {movie.tagline && <p className="details-tagline">{movie.tagline}</p>}

                    <div className="details-meta">
                        <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                        {movie.runtime > 0 && (
                            <span>
                                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                            </span>
                        )}
                        <span>{movie.release_date}</span>
                    </div>

                    <div className="details-genres">
                        {movie.genres.map((g) => (
                            <span key={g.id} className="genre-chip">{g.name}</span>
                        ))}
                    </div>

                    <h3>Overview</h3>
                    <p>{movie.overview || "No overview available."}</p>

                    {director && (
                        <p><strong>Director:</strong> {director.name}</p>
                    )}

                    <button
                        className={`details-fav-btn ${favorite ? "active" : ""}`}
                        onClick={toggleFavorite}
                    >
                        {favorite ? "♥ Remove from favorites" : "♡ Add to favorites"}
                    </button>
                </div>
            </div>

            {cast.length > 0 && (
                <section className="details-section">
                    <h2>Top Cast</h2>
                    <div className="cast-list">
                        {cast.map((person) => (
                            <div key={person.id} className="cast-card">
                                {person.profile_path ? (
                                    <img src={`${IMG_URL}${person.profile_path}`} alt={person.name} />
                                ) : (
                                    <div className="cast-placeholder">?</div>
                                )}
                                <p className="cast-name">{person.name}</p>
                                <p className="cast-character">{person.character}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {trailer && (
                <section className="details-section">
                    <h2>Trailer</h2>
                    <div className="trailer-wrapper">
                        <iframe
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title="Trailer"
                            allowFullScreen
                        />
                    </div>
                </section>
            )}
        </div>
    );
}

export default MovieDetails;