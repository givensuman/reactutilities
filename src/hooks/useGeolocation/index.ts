import { useState, useEffect } from 'react';

/**
 * Retrieves the user's current geolocation from their browser.
 *
 * @returns {{
 *  latitude: number | null;
 *  longitude: number | null;
 *  error: string | null;
 * }} An object containing the user's latitude, longitude, and error status.
 * 
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function useGeolocation() {
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
    error: string | null;
  }>({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    const onSuccess = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    };

    const onError = (error: GeolocationPositionError) => {
      setLocation({
        latitude: null,
        longitude: null,
        error: error.message,
      });
    };

    if (!navigator.geolocation) {
      setLocation({
        latitude: null,
        longitude: null,
        error: 'Geolocation is not supported',
      });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, []);

  return location;
}

export default useGeolocation;
