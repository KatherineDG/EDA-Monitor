import React from 'react';

const LogCounters = ({ logs }) => {
  // Calcular los contadores
  const totalLogs = logs.length;
  const errorLogs = logs.filter(log => log.level === 'error').length;
  const successLogs = logs.filter(log => log.level === 'info').length;

  // Estilos
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    marginBottom: '20px',
  };

  const counterStyle = {
    textAlign: 'center',
    padding: '10px',
    borderRadius: '4px',
    minWidth: '120px',
  };

  const labelStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const valueStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <div style={{...counterStyle, backgroundColor: '#e0e0e0'}}>
        <div style={labelStyle}>Total Logs</div>
        <div style={valueStyle}>{totalLogs}</div>
      </div>
      <div style={{...counterStyle, backgroundColor: '#ffcccb'}}>
        <div style={labelStyle}>Logs de Error</div>
        <div style={valueStyle}>{errorLogs}</div>
      </div>
      <div style={{...counterStyle, backgroundColor: '#90ee90'}}>
        <div style={labelStyle}>Logs de Éxito</div>
        <div style={valueStyle}>{successLogs}</div>
      </div>
    </div>
  );
};

export default LogCounters;
