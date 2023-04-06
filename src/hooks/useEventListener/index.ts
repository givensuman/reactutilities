import { useEffect } from 'react';

type EventType = keyof WindowEventMap;

/**
 * Attaches an event listener to the target element.
 *
 * @param eventType - The event type to listen for.
 * @param handler - The event handler function.
 * @param target - The target element to attach the listener to. Defaults to `window`.
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
