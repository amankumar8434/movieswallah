import "../css/Skeleton.css"
import "../css/MovieDetails.css"

function DetailsSkeleton() {
    return (
        <div className="movie-details" aria-hidden="true">
            <div className="skeleton skeleton-back" />

            <div className="details-main">
                <div className="skeleton details-poster-skeleton" />

                <div className="details-info">
                    <div className="skeleton skeleton-title" />
                    <div className="skeleton skeleton-line skeleton-tagline" />

                    <div className="skeleton-meta-row">
                        <div className="skeleton skeleton-chip" />
                        <div className="skeleton skeleton-chip" />
                        <div className="skeleton skeleton-chip" />
                    </div>

                    <div className="skeleton-meta-row">
                        <div className="skeleton skeleton-chip wide" />
                        <div className="skeleton skeleton-chip wide" />
                    </div>

                    <div className="skeleton skeleton-line skeleton-heading" />
                    <div className="skeleton skeleton-line" />
                    <div className="skeleton skeleton-line" />
                    <div className="skeleton skeleton-line" />
                    <div className="skeleton skeleton-line short" />

                    <div className="skeleton skeleton-button" />
                </div>
            </div>

            <section className="details-section">
                <div className="skeleton skeleton-line skeleton-heading" />
                <div className="cast-list">
                    {Array.from({ length: 6 }, (_, i) => (
                        <div key={i} className="cast-card">
                            <div className="skeleton cast-skeleton-img" />
                            <div className="skeleton skeleton-line cast-skeleton-text" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default DetailsSkeleton