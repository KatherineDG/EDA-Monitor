import React, { useEffect, useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import postConnectionId from '../api/postConnectionId';

const WebSocketComponent = () => {
    const [message, setMessage] = useState('');
    const socketRef = useRef(null); // Ref para mantener la referencia del socket
    const heartbeatIntervalRef = useRef(null); // Ref para almacenar el intervalo del heartbeat
    const reconnectTimeoutRef = useRef(null); // Ref para almacenar el timeout de reconexión

    // Función para establecer la conexión WebSocket
    const connectWebSocket = () => {
        socketRef.current = new WebSocket('wss://25zb4cxwg1.execute-api.us-east-1.amazonaws.com/dev/');

        // Manejar el evento de conexión abierta
        socketRef.current.onopen = () => {
            console.log('Conexión WebSocket abierta');
            socketRef.current.send(JSON.stringify({ message: 'Conexión establecida con el monitoreo en tiempo real' }));
            iniciarHeartbeat();
        };

        // Manejar el evento de mensaje recibido
        socketRef.current.onmessage = async (message) => {
            const data = JSON.parse(message.data);
            console.log('Mensaje recibido:', data);

            if (data.message === 'Forbidden') {
                const connectionId = data.connectionId;

                if (connectionId) {
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
                toast.info('Nueva actualización disponible toque para refrescar', {
                    autoClose: 5000,
                    onClick: () => window.location.reload()
                });
            }
        };

        // Manejar el evento de cierre de conexión
        socketRef.current.onclose = () => {
            console.log('Conexión WebSocket cerrada');
            detenerHeartbeat();
            reconectarWebSocket();
        };

        // Manejar errores
        socketRef.current.onerror = (error) => {
            console.error('Error en WebSocket', error);
        };
    };

    // Función para iniciar el envío de heartbeat
    const iniciarHeartbeat = () => {
        detenerHeartbeat(); // Detener el intervalo anterior, si existe
        heartbeatIntervalRef.current = setInterval(() => {
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.send(JSON.stringify({ action: 'heartbeat' }));
                console.log('Heartbeat enviado');
            }
        }, 300000); // Intervalo de 5 minutos
    };

    // Función para detener el envío de heartbeat
    const detenerHeartbeat = () => {
        if (heartbeatIntervalRef.current) {
            clearInterval(heartbeatIntervalRef.current);
            heartbeatIntervalRef.current = null;
        }
    };

    // Función para reconectar el WebSocket si se cierra
    const reconectarWebSocket = () => {
        if (!reconnectTimeoutRef.current) {
            reconnectTimeoutRef.current = setTimeout(() => {
                console.log('Intentando reconectar...');
                connectWebSocket();
                reconnectTimeoutRef.current = null;
            }, 5000); // Intentar reconectar después de 5 segundos
        }
    };

    // Establecer conexión WebSocket al montar el componente
    useEffect(() => {
        connectWebSocket();

        // Limpiar al desmontar el componente
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
            detenerHeartbeat();
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
        };
    }, []);

    const sendMessage = () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(message);
            setMessage('');
        } else {
            console.error('WebSocket no está abierto');
        }
    };

    return (
        <div>
            <ToastContainer />
            {/* Tu código adicional aquí */}
        </div>
    );
};

export default WebSocketComponent;
