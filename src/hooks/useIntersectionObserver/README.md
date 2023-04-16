# useIntersectionObserver

The `useIntersectionObserver` hook is a React hook that utilizes the Intersection Observer API to detect when an element is intersecting with the viewport. It returns an object with information about the intersection, including whether the element is currently intersecting with the viewport, the ratio of the element's intersection with the viewport, the element's intersection rectangle, and the element's bounding client rectangle.

This hook can be useful for implementing lazy loading of images or other components, as it allows you to only load the content when it becomes visible on the screen.

## Usage

To use the `useIntersectionObserver` hook, simply import it and call it from within a functional component:

```tsx
import { useIntersectionObserver } from '@reactutilities/hooks';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting, intersectionRatio, intersectionRect, boundingClientRect } = useIntersectionObserver(ref);

  return (
    <div ref={ref}>
      {isIntersecting ? <img src="..." alt="..." /> : <div>Loading...</div>}
    </div>
  );
}
```

In this example, the `useIntersectionObserver` hook is called with a ref to an element that contains an image to be lazy loaded. The isIntersecting property is used to conditionally render either the image or a loading message.

You can also pass optional configuration options for the Intersection Observer:

```tsx
const { isIntersecting } = useIntersectionObserver(ref, {
  root: document.querySelector('#root'),
  rootMargin: '0px',
  threshold: 0.5,
});
```

In this example, the Intersection Observer is configured to observe the #root element with a root margin of 0px and a threshold of 0.5.
API

The `useIntersectionObserver` hook takes two arguments:

|Name|Type|Description|
|---|---|---|
|ref|`RefObject<Element>`|A ref to the element to monitor for intersection events.|
|options|`IntersectionObserverOptions`|	Optional configuration options for the Intersection Observer, including the root element to observe, the root margin, and the threshold.|

The `useIntersectionObserver` hook returns an object with the following properties:

|Name|Type|Description|
|---|---|---|
|isIntersecting|`boolean`|A boolean indicating whether the observed element is currently intersecting with the viewport.|
|intersectionRatio|`number`|The ratio of the observed element's intersection with the viewport.|
|intersectionRect|`DOMRectReadOnly`|The rectangle representing the intersection between the observed element and the viewport.|
|boundingClientRect|`DOMRectReadOnly`|	The bounding client rectangle of the observed element.|

## Browser Compatibility

This hook uses the Intersection Observer API, which may not be supported by all browsers. Please refer to the Intersection Observer API documentation for details on browser compatibility.