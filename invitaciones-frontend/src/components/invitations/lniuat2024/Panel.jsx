import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Panel = () => {
  const [graduados, setGraduados] = useState([]);
  const [selectedGraduado, setSelectedGraduado] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtiene el token de localStorage

    if (!token) {
      alert('No estás autorizado para ver esta página');
      window.location.href = '/'; // Redirige a la página de inicio si no hay token
      return;
    }

    const fetchGraduados = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/invitations/lniuat2024/panel/graduados`, {
          params: { token } // Envía el token como un parámetro en la URL
        });
        setGraduados(response.data);
      } catch (error) {
        console.error('Error al obtener los graduados:', error);
        if (error.response && error.response.status === 403) {
          alert('Acceso denegado');
          window.location.href = '/';
        }
      }
    };

    fetchGraduados();
  }, []);

  const handleGraduadoClick = (graduado) => {
    setSelectedGraduado(graduado === selectedGraduado ? null : graduado);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Graduados</h1>
      {graduados.length > 0 ? (
        <ul className="space-y-4">
          {graduados.map((graduado) => (
            <li key={graduado._id} className="border p-4 rounded-lg shadow">
              <div
                className="cursor-pointer text-lg font-semibold"
                onClick={() => handleGraduadoClick(graduado)}
              >
                {graduado.nombreCompleto}
              </div>
              {selectedGraduado === graduado && (
                <ul className="mt-2 space-y-2">
                  {graduado.arrayInvitados.map((invitado, index) => (
                    <li key={index} className="border-b pb-2">
                      <p><strong>Nombre:</strong> {invitado.nombre}</p>
                      <p><strong>Status:</strong> {invitado.status}</p>
                      <a
                        href={`${window.location.origin}/invitations/grad/lniuat2024/${graduado.nombreCompleto.split(' ')[0]}/${graduado.nombreCompleto.split(' ')[1]}/${index + 1}`}
                        className="text-blue-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver invitación
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron graduados.</p>
      )}
    </div>
  );
};

export default Panel;