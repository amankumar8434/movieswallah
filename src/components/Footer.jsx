import "../css/Footer.css"

function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="footer">
            <p>
                Movies Wallah © {year} —{" "}
                <a
                    href="https://github.com/amankumar8434"
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub
                </a>
            </p>
            <p className="tmdb-credit">
                This product uses the TMDB API but is not endorsed or certified by{" "}
                <a
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noreferrer"
                >
                    TMDB
                </a>
                .
            </p>
        </footer>
    )
}

export default Footer
