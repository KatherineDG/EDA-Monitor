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
      <button onClick={toggleDropdown} style={{ backgroundColor: '#6665DD', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', marginLeft: '10px' }}>
        Seleccionar Evento ▼
      </button>
      {isOpen && (
        <ul style={{ position: 'absolute', backgroundColor: 'white', color: 'black', border: '1px solid #ddd', marginLeft: '10px', padding: '5px', listStyle: 'none', zIndex: 1 }}>
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
