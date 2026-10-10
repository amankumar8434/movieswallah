import "../css/Footer.css"

function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="footer">
            <p>
                Movies Wallet © {year} —{" "}
                <a
                    href="https://github.com/amankumar8434"
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub
                </a>
            </p>
        </footer>
    )
}

export default Footer