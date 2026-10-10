import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'
import SkeletonCard from '../components/SkeletonCard'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMovies, getPopularMovies } from "../services/api";
import { useScrollRestoration } from '../hooks/useScrollRestoration'
import "../css/Home.css"

function Home() {
    const [searchParams, setSearchParams] = useSearchParams()

    // page and search now live in the URL
    const page = Math.max(1, parseInt(searchParams.get("page")) || 1)
    const activeQuery = searchParams.get("q") || ""

    const [searchQuery, setSearchQuery] = useState(activeQuery) // what's typed in the box
    const [movies, setMovies] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    useScrollRestoration(!loading)

    useEffect(() => {
        let cancelled = false

        const loadMovies = async () => {
            setLoading(true)
            try {
                const data = activeQuery
                    ? await searchMovies(activeQuery, page)
                    : await getPopularMovies(page)

                if (cancelled) return
                setMovies(data.results)
                setTotalPages(data.totalPages)
                setError(null)
            } catch (err) {
                if (cancelled) return
                console.log(err)
                setError(activeQuery ? "Failed to search movies..." : "Failed to load movies...")
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        loadMovies()

        return () => { cancelled = true }
    }, [page, activeQuery])

    const handleSearch = (e) => {
        e.preventDefault()
        const q = searchQuery.trim()
        if (!q) return
        setSearchParams({ q, page: 1 })
    }

    const handleClear = () => {
        setSearchQuery("")
        setSearchParams({})
    }

    const handlePageChange = (newPage) => {
        const params = {}
        if (activeQuery) params.q = activeQuery
        params.page = newPage
        setSearchParams(params)
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className='search-form'>
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        placeholder='Search for movies...'
                        className='search-input'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Escape" && handleClear()}
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            className="clear-button"
                            onClick={handleClear}
                            aria-label="Clear search"
                        >
                            &times;
                        </button>
                    )}
                </div>
                <button type='submit' className='search-button'>Search</button>
            </form>

            {error && <div className='error-massage'>{error}</div>}

            {loading ? (
                <div className="movies-grid">
                    {Array.from({ length: 20 }, (_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : (
                <>
                    <div className="movies-grid">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))}
                    </div>

                    {movies.length === 0 && !error && (
                        <p className="no-results">No movies found.</p>
                    )}

                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
}

export default Home