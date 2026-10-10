import "./css/App.css"
import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Favorites from "./pages/Favorites"
import MovieDetails from "./pages/MovieDetails"
import ScrollToTop from "./components/ScrollToTop"
import { Route, Routes } from "react-router-dom"
import { MovieProvider } from "./contexts/MovieContext"

function App() {
  return (
    <MovieProvider>
      <ScrollToTop />
      <div className="app-layout">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </MovieProvider>
  )
}

export default App