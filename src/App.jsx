import React, { useState } from 'react';
import Calendar from './components/Calender'; // Assuming Calendar component is imported

function App() {
  const [events, setEvents] = useState({}); // Store events for each date
  const [selectedDate, setSelectedDate] = useState(new Date()); // Currently selected date

  return (
    <div className="app">
      <h1>Event Calendar</h1>
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} events={events} setEvents={setEvents} />
    </div>
  );
}

export default App;
