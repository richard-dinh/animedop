import { useState, useEffect } from 'react'

// Maybe used later for formatting
export const useMediaQuery = (query) => {
  const mediaMatch = window.matchMedia(query)
  const [matches, setMatches] = useState(mediaMatch.matches)

  useEffect(() => {
    const handler = (e) => setMatches(e.matches)
    mediaMatch.addListener(handler)
    return () => mediaMatch.removeListener(handler)
  })

  return matches
}
