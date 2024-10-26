import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Invitaciones = () => {
  const [invitaciones, setInvitaciones] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/invitations/listar')
      .then(response => {
        setInvitaciones(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las invitaciones:', error);
      });
  }, []);

  const confirmarAsistencia = (id) => {
    axios.post(`http://localhost:5000/invitations/confirmar/${id}`)
      .then(response => {
        console.log('Asistencia confirmada:', response.data);
        // Actualizar la lista de invitaciones
        setInvitaciones(prevInvitaciones => 
          prevInvitaciones.map(inv => 
            inv._id === id ? { ...inv, estado: 'confirmada', confirmados: inv.confirmados + 1 } : inv
          )
        );
      })
      .catch(error => {
        console.error('Error al confirmar asistencia:', error);
      });
  };

  return (
    <div>
      <h1>Lista de Invitaciones</h1>
      <ul>
        {invitaciones.map(invitacion => (
          <li key={invitacion._id}>
            {invitacion.nombre} - {invitacion.estado} - Confirmados: {invitacion.confirmados}/{invitacion.cantidadInvitados}
            <button onClick={() => confirmarAsistencia(invitacion._id)}>
              Confirmar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Invitaciones;
