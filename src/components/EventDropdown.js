import React, { useState } from 'react';

const EventDropdown = ({ eventTypes, onSelectEvent }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleEventSelect = (eventType) => {
    onSelectEvent(eventType);
    setIsOpen(false); // Cierra el menú después de seleccionar
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={toggleDropdown} style={{ backgroundColor: '#3498db', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
        Seleccionar Evento ▼
      </button>
      {isOpen && (
        <ul style={{ position: 'absolute', backgroundColor: 'white', border: '1px solid #ddd', margin: 0, padding: '5px', listStyle: 'none', zIndex: 1 }}>
          {eventTypes.map((eventType) => (
            <li key={eventType} onClick={() => handleEventSelect(eventType)} style={{ padding: '5px 10px', cursor: 'pointer', borderBottom: '1px solid #ddd' }}>
              {eventType}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventDropdown;
