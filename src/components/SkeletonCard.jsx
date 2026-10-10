import "../css/Skeleton.css"

function SkeletonCard() {
    return (
        <div className="skeleton-card" aria-hidden="true">
            <div className="skeleton-poster skeleton" />
            <div className="skeleton-info">
                <div className="skeleton skeleton-line" />
                <div className="skeleton skeleton-line short" />
            </div>
        </div>
    )
}

export default SkeletonCard