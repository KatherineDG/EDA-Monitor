import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Asegúrate de incluir el CSS

const WebSocketComponent = () => {
    const [message, setMessage] = useState('');
    let socket;

    useEffect(() => {
        // Crear una nueva conexión WebSocket
        socket = new WebSocket('wss://eda-daii-production-9f47.up.railway.app');

        // Manejar el evento de conexión abierta
        socket.onopen = () => {
            console.log('Conexión WebSocket abierta');
            //socket.send(JSON.stringify({ message: 'Conexión establecida con el monitoreo en tiempo real' }));
        };

        // Manejar el evento de mensaje recibido
        socket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            console.log('Mensaje recibido:', data);
          
            if (data.message === 'actualizacion') {
              // Aquí manejas el evento 'actualizacion' y actualizas el estado, UI, etc.
              console.log('Recibida actualización:', data.data);
              toast.info('Nueva actualización disponible toque para refrescar', {
                autoClose: 5000,
                onClick: () => {
                    window.location.reload(); // Recargar la página al hacer clic en el toast
                },
            });
            // Llamada al callback para notificar de la actualización
            }
        };

        // Manejar el evento de cierre de conexión
        socket.onclose = () => {
            console.log('Conexión WebSocket cerrada');
        };

        // Manejar errores
        socket.onerror = (error) => {
            console.error('Error en WebSocket', error);
        };

        // Limpiar al desmontar el componente
        return () => {
            socket.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(message);
            setMessage('');
        } else {
            console.error('WebSocket no está abierto');
        }
    };

    return null;
};

export default WebSocketComponent;
