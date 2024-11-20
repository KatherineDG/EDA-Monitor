import React from 'react';

const LogCounters = ({ logs }) => {
  // Calcular los contadores
  const totalLogs = logs.length;
  const errorLogs = logs.filter(log => log.status === 'error').length;
  const successLogs = logs.filter(log => log.status === 'success').length;

  // Estilos
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px',
    backgroundColor: 'black',
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
      <div style={{...counterStyle, backgroundColor: '#6665DD'}}>
        <div style={labelStyle}>Total Logs</div>
        <div style={valueStyle}>{totalLogs}</div>
      </div>
      <div style={{...counterStyle, backgroundColor: '#DB5461'}}>
        <div style={labelStyle}>Logs de Error</div>
        <div style={valueStyle}>{errorLogs}</div>
      </div>
      <div style={{...counterStyle, backgroundColor: '#7AC74F'}}>
        <div style={labelStyle}>Logs de Éxito</div>
        <div style={valueStyle}>{successLogs}</div>
      </div>
    </div>
  );
};

export default LogCounters;
