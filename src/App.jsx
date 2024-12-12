import React, { useState } from 'react';
import Calendar from './components/Calender'; 

function App() {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="app">
      <h1>Event Calendar</h1>
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} events={events} setEvents={setEvents} />
    </div>
  );
}

export default App;
