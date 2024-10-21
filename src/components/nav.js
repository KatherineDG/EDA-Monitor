import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#2c3e50',
    color: 'white',
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'white',
  };

  const navButtonsStyle = {
    display: 'flex',
    gap: '1rem',
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#3498db',
    color: 'white',
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#e74c3c',
    color: 'white',
  };

  const handleNavigation = (path) => {
    window.location.href = path; // Cambia la URL y recarga la página
  };

  return (
    <nav style={navStyle}>
      <Link to="/logs" style={logoStyle}>BeluAr Logs</Link>
      <div style={navButtonsStyle}>
        <button style={primaryButtonStyle} onClick={() => handleNavigation('/logs/reservas')}>Reserva</button>
        <button style={primaryButtonStyle} onClick={() => handleNavigation('/logs/backoffice')}>Backoffice</button>
        <button style={primaryButtonStyle} onClick={() => handleNavigation('/logs/gateway')}>Gateway de Pagos</button>
        <button style={logoutButtonStyle}>Cerrar Sesión</button>
      </div>
    </nav>
  );
};

export default Navbar;
