// hooks/useEventTracker.ts
import { useState } from 'react';

type Event = {
  id: string;
  type: string;
  payload: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
};

const useEventTracker = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const trackEvent = async (type: string, payload: Record<string, any>) => {
    try {
      const response = await fetch('/api/tracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, payload }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const event: Event = await response.json();
      setEvents((prevEvents) => [...prevEvents, event]);
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  };

  return { events, trackEvent };
};

export default useEventTracker;
