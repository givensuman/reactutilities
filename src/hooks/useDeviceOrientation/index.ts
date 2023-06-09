import { useState, useEffect } from 'react';

/**
 * Allows you to detect the device's orientation (portrait or landscape).
 *
 * @returns {'portrait' | 'landscape'} Device orientation as `"portrait"` or `"landscape"`.
 *
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function useDeviceOrientation(): 'portrait' | 'landscape' {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    window.matchMedia('(orientation: portrait)').matches
      ? 'portrait'
      : 'landscape',
  );

  useEffect(() => {
    const handler = (event: MediaQueryListEvent) => {
      setOrientation(event.matches ? 'portrait' : 'landscape');
    };
    const mediaQuery = window.matchMedia('(orientation: portrait)');
    mediaQuery.addEventListener('change', handler);

    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, []);

  return orientation;
}

export default useDeviceOrientation;
