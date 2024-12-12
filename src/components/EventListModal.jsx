import React from "react";

function EventListModal({ events, closeModal, setSelectedEvent }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Event List</h3>
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <span>{event.name}</span> - {event.start} to {event.end}
              <button onClick={() => setSelectedEvent(event)}>Edit</button>
            </li>
          ))}
        </ul>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}
export default EventListModal;
