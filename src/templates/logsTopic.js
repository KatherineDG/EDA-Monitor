import React, { useState, useEffect } from 'react';
import Navbar from '../components/nav';
import LogCounters from '../components/logContadores';
import EventDropdown from '../components/EventDropdown';
import {eventsReserva} from '../data/eventsReserva';
import {eventsBackoffice} from '../data/eventsBackoffice';
import {eventsGateway} from '../data/eventsGateway';
import getLogsToEventToTopic from '../api/getLogsToEventToTopic';
import { ToastContainer, toast } from 'react-toastify';
import WebSocketComponent from '../components/WebSocketComponent ';
import 'react-toastify/dist/ReactToastify.css'; // Asegúrate de incluir el CSS

const LogsTopicPage = ({ fetchLogs, title, topico }) => {
  const [logs, setLogs] = useState([]);
  const [noLogsFound, setNoLogsFound] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [selectedEventType, setSelectedEventType] = useState(null);
  const [eventTypes, setEventTypes] = useState([]);


  // Llamada a la API cuando se monta el componente
  useEffect(() => {
    const fetchData = async () => {
      const logsData = await fetchLogs(); // Llama a la función que obtendrá los logs desde la API
      console.log('Logs obtenidos:', logsData);
      setLogs(logsData); // Actualiza el estado con los logs obtenidos
    };

    fetchData(); // Ejecuta la función de fetch
  }, [fetchLogs]); // Asegúrate de incluir fetchLogs en las dependencias

  useEffect(() => {
    // Comprobar si el título es "Reserva" y establecer los tipos de eventos
    if (title === 'Reserva') {
      setEventTypes(eventsReserva);
    }
    else if (title === 'Back Office') {
      setEventTypes(eventsBackoffice);
    }
    else if (title === 'Gateway de Pagos') {
      setEventTypes(eventsGateway);
    }
    else {
      setEventTypes([]); // Puedes establecer otro tipo de eventos o dejarlo vacío
    }
  }, [title]); // Dependencia para que se ejecute cuando cambie el título


  const handleLogClick = (log) => {
    setSelectedLog(log);
    console.log('Log seleccionado:', log);
  };

  const handleEventSelect = async (eventType) => {
    setSelectedEventType(eventType);
    // Aquí puedes agregar la lógica para filtrar los logs según el tipo de evento
    console.log(`Evento seleccionado: ${eventType}`);

    if (eventType !== 'Todos') {
      try {
        const filteredLogs = await getLogsToEventToTopic(eventType, topico); // Llama a tu API
        setLogs(filteredLogs); // Actualiza el estado de logs con los resultados filtrados
        
        console.log(logs);
        // Verifica si no se encontraron logs
        if (filteredLogs.length === 0) {
          setNoLogsFound(true); // Establece el estado de no encontrado
        } else {
          setNoLogsFound(false); // Reinicia el estado si se encontraron logs
        }
      } catch (error) {
        console.error('Error al obtener los logs filtrados:', error);
      }
    } else {
      // Si seleccionas 'Todos', puedes volver a cargar todos los logs
      const allLogs = await fetchLogs();
      setLogs(allLogs);
      setNoLogsFound(false); // Reinicia el estado si se selecciona 'Todos'
    }
  };

  return (
    <div>
      <WebSocketComponent/>
      <Navbar />
      <ToastContainer />
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Logs - Tópico {title}</h1>
        <LogCounters logs={logs} />
        {noLogsFound && (
          <div style={{ marginBottom: '20px', color: 'red' }}>
            No se encontraron logs para el evento seleccionado.
          </div>
        )}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Timestamp</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Tópico</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Evento {selectedEventType}
                <EventDropdown eventTypes={eventTypes} onSelectEvent={handleEventSelect} />
              </th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr
                key={log._id}
                onClick={() => handleLogClick(log)}
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
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{new Date(log.timestamp).toLocaleString()}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{log.topico}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{log.event_name}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedLog && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f2f2f2', borderRadius: '4px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Detalles del Log</h2>
            <p><strong>ID:</strong> {selectedLog._id}</p>
            <p><strong>Tópico:</strong> {selectedLog.topico}</p>
            <p><strong>Evento:</strong> {selectedLog.event_name}</p>
            <p><strong>Estado:</strong> {selectedLog.status}</p>
            <p><strong>Conexión ID:</strong> {selectedLog.connection_id}</p>
            <p><strong>Timestamp:</strong> {new Date(selectedLog.timestamp).toLocaleString()}</p>
            <p><strong>Versión:</strong> {selectedLog.__v}</p>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Cuerpo de mensaje:</h3>
              <pre style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', overflowX: 'auto' }}>
                {JSON.stringify(selectedLog.body, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default LogsTopicPage;
