import React from "react";
import { Route, Routes } from "react-router-dom";
import LogsPage from "../templates/panel";
import LogsTopicPage from "../templates/logsTopic";
import getLogsToTopic from "../api/getLogsToTopic";

function AppRoutes() {
  return (
    <Routes>
        <Route path="/logs" element={<LogsPage />} />
        <Route path="/logs/reservas" element={<LogsTopicPage fetchLogs={() => getLogsToTopic("reserva")} title="Reserva" topico="reserva"/>} />
        <Route path="/logs/backoffice" element={<LogsTopicPage fetchLogs={() => getLogsToTopic("backoffice")} title="Back Office" topico="backoffice"/>} />
        <Route path="/logs/gateway" element={<LogsTopicPage fetchLogs={() => getLogsToTopic("gatewaydepagos")} title="Gateway de Pagos" topico="gatewaydepagos" />} />
    </Routes>
  );
}

export default AppRoutes;