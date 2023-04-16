# useGeolocation

The `useGeolocation` hook is a React hook that retrieves the user's current geolocation from their browser. It simplifies the process of accessing the user's location by providing a consistent API that you can use to retrieve the latitude, longitude, and error status.

## Usage

To use the `useGeolocation` hook, simply import it and call it from within a functional component:

```tsx
import useGeolocation from '@reactutilities/hooks';

function MyComponent() {
  const { latitude, longitude, error } = useGeolocation();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
    </div>
  );
}
```

In this example, `useGeolocation` is called and returns an object containing the user's latitude, longitude, and error status. If an error occurs, an error message is displayed. Otherwise, the latitude and longitude are displayed.

## API

The `useGeolocation` hook returns an object with the following properties:

|Name|Type|Description|
|---|---|---|
|latitude|`number \| null`|The user's latitude. If the location has not yet been determined, this will be null.|
|longitude|`number \| null`|The user's longitude. If the location has not yet been determined, this will be null.|
|error|`string \| null`|The error message, if an error occurred. If no error occurred, this will be null.|

Note that if the user denies permission to access their location or if the geolocation service is not available, the error property will contain an error message.