import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Asegúrate de incluir el CSS
import postConnectionId from '../api/postConnectionId';

const WebSocketComponent = () => {
    const [message, setMessage] = useState('');
    let socket;


    useEffect(() => {
        // Crear una nueva conexión WebSocket
        socket = new WebSocket('wss://25zb4cxwg1.execute-api.us-east-1.amazonaws.com/dev/');

        // Manejar el evento de conexión abierta
        socket.onopen = () => {
            console.log('Conexión WebSocket abierta');
            socket.send(JSON.stringify({ message: 'Conexión establecida con el monitoreo en tiempo real' }));
        };

        // Manejar el evento de mensaje recibido
        socket.onmessage = async (message) => {
            const data = JSON.parse(message.data);
            console.log('Mensaje recibido:', data);
          
            if (data.message === 'Forbidden') {
                console.log('Evento omitido:', data);

                const connectionId = data.connectionId; // Asegúrate de que esta propiedad exista

                if (connectionId) {
                    console.log('Connection ID encontrado:', connectionId)
                    try {
                        const response = await postConnectionId(connectionId);
                        console.log('Connection ID guardado:', response);
                    } catch (error) {
                        console.error('Error al guardar el Connection ID:', error);
                    }
                } else {
                    console.warn('No se encontró el connectionId en el mensaje.');
                }

              }
            if (data.message === 'actualizacion') {
              // Aquí manejas el evento 'actualizacion' y actualizas el estado, UI, etc.
              console.log('Recibida actualización:', data);
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
