import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import Lniuat2024 from './components/invitations/lniuat2024/lniuat2024';
import Home from './components/Home'; // Componente de pantalla predeterminada
import PanelWrapper from './components/invitations/lniuat2024/PanelWrapper'; // Importa el nuevo componente PanelWrapper

function GraduadoWrapper() {
  const { primerNombre, primerApellido, index } = useParams();
  
  // Validaciones de los parámetros
  const nombreValido = /^[a-zA-Z]+$/.test(primerNombre);
  const apellidoValido = /^[a-zA-Z]+$/.test(primerApellido);
  const indexValido = !isNaN(index) && parseInt(index) >= 0;

  if (!nombreValido || !apellidoValido || !indexValido) {
    return <Navigate to="/error" replace />;
  }

  return (
    <Lniuat2024
      primerNombre={primerNombre}
      primerApellido={primerApellido}
      index={parseInt(index)}
    />
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/invitations/grad/lniuat2024/:primerNombre/:primerApellido/:index"
          element={<GraduadoWrapper />}
        />
        <Route
          path="/invitations/grad/lniuat2024/panel"
          element={<PanelWrapper />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
