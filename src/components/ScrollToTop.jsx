import { useEffect } from "react"
import { useLocation, useNavigationType } from "react-router-dom"

function ScrollToTop() {
    const { key } = useLocation()
    const navType = useNavigationType()

    // we restore positions ourselves, so turn off the browser's own attempt
    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual"
        }
    }, [])

    useEffect(() => {
        if (navType !== "POP") window.scrollTo(0, 0)
    }, [key, navType])

    return null
}

export default ScrollToTop