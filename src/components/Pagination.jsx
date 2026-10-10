import "../css/Pagination.css"

function getPageNumbers(current, total) {
    const pages = [1]
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)

    if (start > 2) pages.push("...")
    for (let i = start; i <= end; i++) pages.push(i)
    if (end < total - 1) pages.push("...")
    if (total > 1) pages.push(total)

    return pages
}

function Pagination({ page, totalPages, onPageChange }) {
    if (totalPages <= 1) return null

    return (
        <nav className="pagination" aria-label="Pagination">
            <button
                className="page-btn"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
            >
                ‹ Prev
            </button>

            {getPageNumbers(page, totalPages).map((p, i) =>
                p === "..." ? (
                    <span key={`dots-${i}`} className="page-dots">…</span>
                ) : (
                    <button
                        key={p}
                        className={`page-btn page-number ${p === page ? "active" : ""}`}
                        onClick={() => onPageChange(p)}
                        aria-current={p === page ? "page" : undefined}
                    >
                        {p}
                    </button>
                )
            )}

            <button
                className="page-btn"
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
            >
                Next ›
            </button>
        </nav>
    )
}

export default Pagination