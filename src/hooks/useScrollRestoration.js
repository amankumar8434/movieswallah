import { useEffect, useRef } from "react"
import { useLocation, useNavigationType } from "react-router-dom"

const STORAGE_KEY = "scroll-positions"

const readPositions = () => {
    try {
        return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || {}
    } catch {
        return {}
    }
}

const writePosition = (key, y) => {
    try {
        const positions = readPositions()
        positions[key] = y
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions))
    } catch {
        // storage unavailable, ignore
    }
}

// `ready` should be true once the page content has rendered (e.g. !loading)
export function useScrollRestoration(ready = true) {
    const { key } = useLocation()
    const navType = useNavigationType()
    const handledKey = useRef(null)

    // restore the saved position when coming back (Back/Forward/refresh)
    useEffect(() => {
        if (!ready || handledKey.current === key) return
        handledKey.current = key

        if (navType === "POP") {
            const saved = readPositions()[key]
            if (saved) window.scrollTo(0, saved)
        }
    }, [ready, key, navType])

    // keep saving the position while the user scrolls
    useEffect(() => {
        const onScroll = () => {
            // don't save until restoring is done, or we'd overwrite it with 0
            if (handledKey.current !== key) return
            writePosition(key, window.scrollY)
        }
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [key])
}