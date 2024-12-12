export const getEvents = () => {
    const events = localStorage.getItem('events');
    return events ? JSON.parse(events) : {};
  };
  
  // Function to save events to localStorage.
  export const saveEvents = (updatedEvents) => {
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };
  
  // Function to add a new event to a specific date.
  export const addEvent = (date, newEvent) => {
    const events = getEvents();
    const dateKey = date.toISOString().split('T')[0];
  
    // Initialize events for the date if not present
    if (!events[dateKey]) {
      events[dateKey] = [];
    }
  
    // Prevent overlapping events by checking start and end times
    const isOverlapping = events[dateKey].some((event) => {
      return (
        (newEvent.start >= event.start && newEvent.start < event.end) ||
        (newEvent.end > event.start && newEvent.end <= event.end)
      );
    });
  
    if (isOverlapping) {
      throw new Error('Event times overlap with an existing event.');
    }

    events[dateKey].push(newEvent);
  saveEvents(events);
  return events;
};

// Function to edit an existing event.
export const editEvent = (date, index, updatedEvent) => {
  const events = getEvents();
  const dateKey = date.toISOString().split('T')[0];

  if (events[dateKey]) {
    events[dateKey][index] = updatedEvent;
    saveEvents(events);
  }
  return events;
};

// Function to delete an event from a specific date.
export const deleteEvent = (date, index) => {
  const events = getEvents();
  const dateKey = date.toISOString().split('T')[0];

  if (events[dateKey]) {
    events[dateKey].splice(index, 1);

    // Remove the date key if no events remain
    if (events[dateKey].length === 0) {
      delete events[dateKey];
    }

    saveEvents(events);
}
return events;
};
