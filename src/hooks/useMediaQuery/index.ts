import { useState, useEffect } from 'react';

type MediaQueryValue = string | number;

type MediaQueryObject = {
  minWidth?: MediaQueryValue;
  maxWidth?: MediaQueryValue;
  minHeight?: MediaQueryValue;
  maxHeight?: MediaQueryValue;
};

/**
 * Returns a boolean value indicating whether the current viewport matches the given media query.
 * 
 * @param query The media query to match. Can be a string or an object containing `minWidth`, `maxWidth`, `minHeight`, and/or `maxHeight` properties.
 * @returns `true` if the viewport matches the media query, `false` otherwise.
 * 
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
const useMediaQuery = (query: string | MediaQueryObject): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(getQuery(query));
    const handleChange = () => setMatches(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};

const getQuery = (query: string | MediaQueryObject): string => {
  if (typeof query === 'string') return query;

  const { minWidth, maxWidth, minHeight, maxHeight } = query;
  const queries = [];

  if (minWidth) queries.push(`(min-width: ${convertValue(minWidth)})`);
  if (maxWidth) queries.push(`(max-width: ${convertValue(maxWidth)})`);
  if (minHeight) queries.push(`(min-height: ${convertValue(minHeight)})`);
  if (maxHeight) queries.push(`(max-height: ${convertValue(maxHeight)})`);

  return queries.join(' and ');
};

const convertValue = (value: MediaQueryValue): string => {
  if (typeof value === 'number') return `${value}px`;
  if (!isNaN(parseFloat(value)) && isFinite(parseFloat(value)))
    return `${value}px`;
  return value;
};

export default useMediaQuery;
