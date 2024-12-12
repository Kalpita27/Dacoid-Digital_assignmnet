import React from "react";

function EventModal({
  newEvent,
  setNewEvent,
  handleSaveEvent,
  handleClose,
  handleDeleteEvent,
  event,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  return (
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
          style={{ resize: "none", padding: "10px" }}
        />
        <select
          name="type"
          value={newEvent.type}
          onChange={handleChange}
        >
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="others">Others</option>
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
  );
}
export default EventModal;
