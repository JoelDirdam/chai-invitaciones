import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import Lniuat2024 from './components/invitations/lniuat2024';
import Home from './components/Home'; // Componente de pantalla predeterminada

function GraduadoWrapper() {
  console.log("Esto es una preuba");
  // Extrae los parámetros de la URL
  const { primerNombre, primerApellido, index } = useParams();

  console.log("Parámetros recibidos:", { primerNombre, primerApellido, index }); // Para depuración

  // Validaciones de los parámetros
  const nombreValido = /^[a-zA-Z]+$/.test(primerNombre);
  const apellidoValido = /^[a-zA-Z]+$/.test(primerApellido);
  const indexValido = !isNaN(index) && parseInt(index) >= 0; // Asegúrate de que el índice sea 0 o positivo

  if (!nombreValido || !apellidoValido || !indexValido) {
    console.warn("Redirigiendo a error por parámetros inválidos."); // Mensaje de depuración
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
  console.log("Esto es una prueba2");
  return (
    <Router>
      <Routes>
        <Route
          path="/invitations/grad/lniuat2024/:primerNombre/:primerApellido/:index"
          element={<GraduadoWrapper />}
        />
        {/* Ruta para redirigir a la pantalla predeterminada si no se accede a la ruta específica */}
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;