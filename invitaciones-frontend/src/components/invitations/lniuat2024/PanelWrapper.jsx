import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Panel from './Panel'; // Componente del panel de invitaciones

function PanelWrapper() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Cambiar a true para la carga inicial
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Verificar si hay un token en localStorage al cargar el componente
    const token = localStorage.getItem('token');

    if (token) {
      const verificarToken = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/invitations/lniuat2024/panel/validate-token`, {
            params: { token }
          });
          if (response.status === 200) {
            setIsAuthorized(true);
            setError('');
          } else {
            localStorage.removeItem('token'); // Remover token inválido
            setError('Acceso denegado.');
          }
        } catch (error) {
          console.error('Error al verificar el token:', error);
          setError('Error al verificar el token.');
        } finally {
          setLoading(false);
        }
      };

      verificarToken();
    } else {
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/invitations/lniuat2024/panel/validate-token`, {
        params: { token: password }
      });
      if (response.status === 200) {
        // Guarda el token en localStorage
        localStorage.setItem('token', password);
        setIsAuthorized(true);
        setError('');
      } else {
        setError('Acceso denegado. Verifique su contraseña.');
      }
    } catch (error) {
      console.error('Error al verificar el token:', error);
      setError('Error al verificar la contraseña.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-lg">Verificando acceso...</div>;
  }

  if (isAuthorized) {
    return <Panel />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Acceso al Panel de Invitaciones</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingrese su contraseña"
          className="border p-2 mb-4 w-full rounded"
          required
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default PanelWrapper;