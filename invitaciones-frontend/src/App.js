import React from 'react';
import Lniuat2024 from './components/invitations/lniuat2024';

function App() {
  // Aquí puedes reemplazar estos valores con datos dinámicos si es necesario
  const primerNombre = 'Juan';
  const primerApellido = 'Perez';
  const index = 2;

  return (
    <div className="App">
      <h1>Vista de Graduado</h1>
      <Lniuat2024 primerNombre={primerNombre} primerApellido={primerApellido} index={index} />
    </div>
  );
}

export default App;
