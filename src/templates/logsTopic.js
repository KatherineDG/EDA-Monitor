import React, { useState, useEffect } from 'react';
import Navbar from '../components/nav';
import LogCounters from '../components/logContadores';
import EventDropdown from '../components/EventDropdown';
import { eventsReserva } from '../data/eventsReserva';
import { eventsBackoffice } from '../data/eventsBackoffice';
import { eventsGateway } from '../data/eventsGateway';
import getLogsToEventToTopic from '../api/getLogsToEventToTopic';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogsTopicPage = ({ fetchLogs, title, topico }) => {
  const [logs, setLogs] = useState([]);
  const [noLogsFound, setNoLogsFound] = useState(false);
  const [selectedLogIndex, setSelectedLogIndex] = useState(null); // Índice del log seleccionado
  const [selectedEventType, setSelectedEventType] = useState(null);
  const [eventTypes, setEventTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const logsData = await fetchLogs();
      setLogs(sortLogsByDate(logsData));
    };
    fetchData();
  }, [fetchLogs]);

  useEffect(() => {
    if (title === 'Reserva') setEventTypes(eventsReserva);
    else if (title === 'Back Office') setEventTypes(eventsBackoffice);
    else if (title === 'Gateway de Pagos') setEventTypes(eventsGateway);
    else setEventTypes([]);
  }, [title]);

  const handleLogClick = (logIndex) => {
    setSelectedLogIndex(logIndex === selectedLogIndex ? null : logIndex); // Alternar selección
  };

  const handleEventSelect = async (eventType) => {
    setSelectedEventType(eventType);
    if (eventType !== 'Todos') {
      try {
        const filteredLogs = await getLogsToEventToTopic(eventType, topico);
        setLogs(sortLogsByDate(filteredLogs));
        setNoLogsFound(filteredLogs.length === 0);
      } catch (error) {
        console.error('Error al obtener los logs filtrados:', error);
      }
    } else {
      const allLogs = await fetchLogs();
      setLogs(sortLogsByDate(allLogs));
      setNoLogsFound(false);
    }
  };

  const sortLogsByDate = (logsArray) => {
    return [...logsArray].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Navbar />
      <ToastContainer />
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Logs - Tópico {title}</h1>
        <LogCounters logs={logs} />
        {noLogsFound && (
          <div style={{ marginBottom: '20px', color: 'red' }}>No se encontraron logs para el evento seleccionado.</div>
        )}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'black', color: 'white' }}>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Timestamp</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Tópico</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Evento {selectedEventType}
                <EventDropdown eventTypes={eventTypes} onSelectEvent={handleEventSelect} />
              </th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <React.Fragment key={log._id}>
                <tr
                  onClick={() => handleLogClick(index)}
                  style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                    e.currentTarget.style.backgroundColor = '#f8f8f8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>{log.topico}</td>
                  <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>{log.event_name}</td>
                  <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>{log.status}</td>
                </tr>
                {selectedLogIndex === index && (
                  <tr style={{ backgroundColor: 'white', border: '2px solid #C4B7CB' }}>
                    <td colSpan={4} style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>
                      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Detalles del Log</h2>
                      <p><strong>ID:</strong> {log._id}</p>
                      <p><strong>Tópico:</strong> {log.topico}</p>
                      <p><strong>Evento:</strong> {log.event_name}</p>
                      <p><strong>Estado:</strong> {log.status}</p>
                      <p><strong>Conexión ID:</strong> {log.connection_id}</p>
                      <p><strong>Timestamp:</strong> {new Date(log.timestamp).toLocaleString()}</p>
                      <p><strong>Versión:</strong> {log.__v}</p>
                      <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Cuerpo de mensaje:</h3>
                      <pre style={{ backgroundColor: '#E7EBEE', padding: '10px', borderRadius: '4px', overflowX: 'auto' }}>
                        {JSON.stringify(log.body, null, 2)}
                      </pre>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogsTopicPage;
