import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Lniuat2024 = ({ primerNombre, primerApellido, index }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/invitations/lniuat2024/${primerNombre},${primerApellido},${index}`);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al obtener la información del graduado.');
        setLoading(false);
      }
    };

    fetchData();
  }, [primerNombre, primerApellido, index]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {data ? (
        <div>
          <h1>Información del Graduado</h1>
          <p><strong>Email:</strong> {data.graduado.email}</p>
          <p><strong>Nombre Completo:</strong> {data.graduado.nombreCompleto}</p>
          <p><strong>Número de Invitados:</strong> {data.graduado.numeroInvitados}</p>
          <p><strong>Proyecto:</strong> {data.graduado.proyecto}</p>
          <p><strong>Creado el:</strong> {new Date(data.graduado.createdAt).toLocaleDateString()}</p>

          <h2>Información del Invitado</h2>
          <p><strong>Nombre:</strong> {data.invitado.nombre}</p>
          <p><strong>Cantidad de Pases:</strong> {data.invitado.cantidadPases}</p>
          <p><strong>Status:</strong> {data.invitado.status}</p>
        </div>
      ) : (
        <div>No se encontró información.</div>
      )}
    </div>
  );
};

export default Lniuat2024;
