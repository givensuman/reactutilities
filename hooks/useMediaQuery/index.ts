import { useState, useEffect } from 'react';

/**
 * A custom React hook that returns a boolean indicating whether the current window size matches a given media query.
 *
 * @param query - The media query to match.
 * @returns A boolean indicating whether the current window size matches the given media query.
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Update the state if the match status of the media query changes.
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Create a listener that updates the state when the match status of the media query changes.
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add the listener to the media query.
    media.addEventListener('change', listener);

    // Remove the listener when the component unmounts.
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [matches, query]);

  return matches;
}

export default useMediaQuery;
