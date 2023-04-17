# useMediaQuery

The `useMediaQuery` hook is a React hook that allows you to check whether a specified media query matches the current viewport. It provides a simple way to apply styles conditionally based on the size of the viewport.

## Usage

To use the `useMediaQuery` hook, simply import it and call it from within a functional component:

```tsx
import { useMediaQuery } from '@reactutilities/hooks';

function MyComponent() {
  const isMobile = useMediaQuery('(max-width: 1200px)');

  return (
    <div>
      {isMobile ? <div>Mobile layout</div> : <div>Desktop layout</div>}
    </div>
  );
}
```

In this example, `useMediaQuery` is called with the string '(max-width: 1200px)'. If the viewport width is 1200 pixels or less, isMobile will be set to true, indicating that the user is on a mobile device. Otherwise, isMobile will be set to false, indicating that the user is on a desktop device. The component then conditionally renders different content based on the value of isMobile.

Alternatively, you can construct a media query by passing an object into the hook:

```tsx
import useMediaQuery from '@reactutilities/hooks/useMediaQuery';

function MyComponent() {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // true if viewport is less than or equal to 767px

  return (
    <div>
      {isMobile ? <div>Mobile view</div> : <div>Desktop view</div>}
    </div>
  );
}
```

In this example, `useMediaQuery` is called with an object containing a maxWidth property of 767. If the viewport is less than or equal to 767 pixels wide, isMobile will be set to true.

## API

The `useMediaQuery` hook takes one parameter:

|Name|Type|Description|
|---|---|---|
query|`string \| MediaQueryObject`|The media query to match.|

The `useMediaQuery` hook returns a boolean value indicating whether the media query matches the current viewport. If the media query matches, the value will be true. Otherwise, it will be false.

### MediaQueryObject

If an object is passed as the query parameter, it can include the following properties:

|Name|Type|Description|
|---|---|---|
|minWidth|`MediaQueryValue`|The minimum width (in pixels) of the viewport.|
|maxWidth|`MediaQueryValue`|The maximum width (in pixels) of the viewport.|
|minHeight|`MediaQueryValue	`|The minimum height (in pixels) of the viewport.|
|maxHeight|`MediaQueryValue`|The maximum height (in pixels) of the viewport.|