import { useEffect, useState, RefObject } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

interface IntersectionObserverResult {
  isIntersecting: boolean;
  intersectionRatio: number;
  intersectionRect: DOMRectReadOnly;
  boundingClientRect: DOMRectReadOnly;
}

/**
 * Uses the Intersection Observer API to detect when an element is intersecting with the viewport.
 *
 * @param {React.RefObject<Element>} ref A ref to the element to monitor for intersection events.
 * @param {IntersectionObserverOptions} options Optional configuration options for the Intersection Observer.
 * 
 * @returns {{
 *    isIntersecting: entry.isIntersecting,
 *    intersectionRatio: entry.intersectionRatio,
 *    intersectionRect: entry.intersectionRect,
 *    boundingClientRect: entry.boundingClientRect,
 * }} An object with information about the intersection, including
 * `isIntersecting` (a boolean indicating whether the element is currently intersecting
 * with the viewport), `intersectionRatio` (the ratio of the element's intersection with
 * the viewport), `intersectionRect` (the element's intersection rectangle), and
 * `boundingClientRect` (the element's bounding client rectangle).
 *
 * @remarks This hook may not be supported by all browsers. See the Intersection
 * Observer API documentation for details.
 *
 * @see {@link https://github.com/givensuman/reactutilities}
 */
const useIntersectionObserver = (
  ref: RefObject<Element>,
  options: IntersectionObserverOptions = {},
): IntersectionObserverResult => {
  const [observer, setObserver] = useState<IntersectionObserver>();
  const [result, setResult] = useState<IntersectionObserverResult>({
    isIntersecting: false,
    intersectionRatio: 0,
    intersectionRect: new DOMRectReadOnly(),
    boundingClientRect: new DOMRectReadOnly(),
  });

  useEffect(() => {
    const currentObserver = new IntersectionObserver(([entry]) => {
      setResult({
        isIntersecting: entry.isIntersecting,
        intersectionRatio: entry.intersectionRatio,
        intersectionRect: entry.intersectionRect,
        boundingClientRect: entry.boundingClientRect,
      });
    }, options);
    setObserver(currentObserver);

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [observer, options]);

  useEffect(() => {
    const { current: element } = ref;
    const currentObserver = observer;

    if (currentObserver && element) {
      currentObserver.observe(element);
    }

    return () => {
      if (currentObserver && element) {
        currentObserver.unobserve(element);
      }
    };
  }, [observer, ref]);

  return result;
};

export default useIntersectionObserver;
