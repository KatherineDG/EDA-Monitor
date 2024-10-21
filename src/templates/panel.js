import React, { useState, useEffect } from 'react';
import Navbar from '../components/nav';
import getLogs from '../api/getLogs';  // Importa la función desde tu archivo API
import { ToastContainer, toast } from 'react-toastify';
import WebSocketComponent from '../components/WebSocketComponent ';

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);

  // Llamada a la API cuando se monta el componente
  useEffect(() => {
    const fetchLogs = async () => {
      const logsData = await getLogs(); // Llama a la función que obtendrá los logs desde la API
      console.log('Logs obtenidos:', logsData);
      setLogs(logsData); // Actualiza el estado con los logs obtenidos
    };

    fetchLogs(); // Ejecuta la función de fetch
  }, []); // El array vacío asegura que esto se ejecute solo una vez al cargar el componente

  const handleLogClick = (log) => {
    setSelectedLog(log);
    console.log('Log seleccionado:', log);
  };

  return (
    <div>
      <WebSocketComponent />
      <Navbar />
      <ToastContainer />
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Logs</h1>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Timestamp</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Tópico</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Evento</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr
                key={log._id}
                onClick={() => handleLogClick(log)}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
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

export default LogsPage;
