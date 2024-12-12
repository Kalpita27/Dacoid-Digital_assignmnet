import React, { useState, useEffect } from "react";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: "",
    start: "",
    end: "",
    description: "",
    type: "work",
  });
  const [showModal, setShowModal] = useState(false);
  const [showEventListModal, setShowEventListModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [search, setSearch] = useState("");

  const handleDateClick = (date) => {
    const formattedDate = `${currentYear}-${currentMonth + 1}-${date}`;
    setSelectedDate(formattedDate);
  
    const existingEvent = events.find((event) => event.date === formattedDate);
    if (existingEvent) {
      setNewEvent(existingEvent);
    } else {
      setNewEvent({ name: "", start: "", end: "", description: "", type: "work" }); 
    }
  
    setShowModal(true);
  };

  const handleSaveEvent = () => {
    if (!newEvent.name || !newEvent.start || !newEvent.end || !newEvent.description) {
      alert("Please fill all fields.");
      return;
    }

    // Check for overlapping event on the selected date
    const existingEvent = events.find((event) => event.date === selectedDate);
  if (existingEvent) {
    alert("Overlapping event! Event already scheduled.");
    return;
  }

  const eventWithColor = {
    ...newEvent,
    date: selectedDate,
    color: newEvent.type === "work" ? "#5900ff" : newEvent.type === "personal" ? "green" : newEvent.type === "other" ? "orange" : "yellow",
  };

  setEvents([...events, eventWithColor]);
  setShowModal(false);
  alert("Event added successfully!");
  };

  const handleDeleteEvent = (event) => {
    setEvents(events.filter((e) => e.date !== selectedDate));
    setShowModal(false);
    alert("Event deleted successfully!");
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleMonthChange = (direction) => {
    if (direction === "previous") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else if (direction === "next") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);

    if (keyword.trim() === "") {
      setFilteredEvents([]);
    } else {
      const matchingEvents = events.filter(
        (event) =>
          event.name.toLowerCase().includes(keyword) ||
          event.description.toLowerCase().includes(keyword)
      );
      setFilteredEvents(matchingEvents);
    }
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="calendar-btn" onClick={() => handleMonthChange("previous")}>Previous</button>
        <span className="calendar-month">
          {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}
        </span>
        <button className="calendar-btn" onClick={() => handleMonthChange("next")}>Next</button>
      </div>

      <div className="calendar-grid">
  {[...Array(getDaysInMonth(currentMonth, currentYear))].map((_, index) => {
    const date = index + 1;
    const formattedDate = `${currentYear}-${currentMonth + 1}-${date}`; 
    const dayEvent = events.find((event) => event.date === formattedDate);
    return (
      <div
        key={date}
        className={`calendar-day ${dayEvent ? "selected" : ""}`}
        onClick={() => handleDateClick(date)}
        style={{ backgroundColor: dayEvent ? dayEvent.color : "" }}
      >
        {date}
      </div>
    );
  })}
</div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="filtered-events">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <div key={index} className="event-item primary-background">
              <strong>{event.name}</strong>
              <p>{event.description}</p>
              <p><strong>Date: </strong>{event.date}</p>
            </div>
          ))
        ) : search.trim() ? (
          <p className="no-events">No event present.</p>
        ) : null}
      </div>
      
      <div className="scheduled-events-section">
        <h3>Scheduled Events</h3>
        {events.length > 0 ? (
          <table className="events-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index}>
                  <td>{event.date}</td>
                  <td>{event.name}</td>
                  <td>{event.start}</td>
                  <td>{event.end}</td>
                  <td>{event.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No events scheduled yet.</p>
        )}
      </div>

   
      {showModal && (
        <div className="event-modal">
          <div className="event-modal-content">
            <h2>{newEvent.date ? "Edit Event" : "Add Event"}</h2>
            <input 
              type="text"
              name="name"
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              placeholder="Event Name"
            />
            <input
              type="time"
              name="start"
              value={newEvent.start}
              onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
            />
            <input
              type="time"
              name="end"
              value={newEvent.end}
              onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
            />
            <textarea
              name="description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              placeholder="Description"
              style={{ padding: "20px", width: '93%' }}
            />
            {/* Dropdown for event role */}
            <label htmlFor="event-role" style={{ marginTop: "10px" }}>Select Role:</label>
            <select
              id="event-role"
              value={newEvent.type}
              onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
              style={{
                padding: "8px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "100%",
              }}
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="other">Other</option>
            </select>
            <div className="modal-buttons">
              <button onClick={handleSaveEvent}>Save Event</button>
              {events.some((event) => event.date === selectedDate) && (
                <button onClick={handleDeleteEvent}>Delete Event</button>
              )}
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
