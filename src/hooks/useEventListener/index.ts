import { useEffect } from 'react';

type EventType = keyof WindowEventMap;

/**
 * Attaches an event listener to the target element.
 *
 * @param {keyof WindowEventMap} eventType The event type to listen for.
 * @param {EventListenerOrEventListenerObject} handler The event handler function.
 * @param {EventTarget} target The target element to attach the listener to. Defaults to `window`.
 * 
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
export function useEventListener(
  eventType: EventType | EventType[],
  handler: EventListenerOrEventListenerObject,
  target: EventTarget = window,
): void {
  const eventTypes = Array.isArray(eventType) ? eventType : [eventType];

  useEffect(() => {
    const eventHandlers = eventTypes.map(type => ({ type, handler }));

    eventHandlers.forEach(({ type, handler }) => {
      target.addEventListener(type, handler);
    });

    return () => {
      eventHandlers.forEach(({ type, handler }) => {
        target.removeEventListener(type, handler);
      });
    };
  }, [eventTypes, handler, target]);
}

export default useEventListener;
