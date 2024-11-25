import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

const Panel = () => {
  const [graduados, setGraduados] = useState([]);
  const [selectedGraduado, setSelectedGraduado] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Obtiene el token de localStorage

    if (!token) {
      alert("No estás autorizado para ver esta página");
      window.location.href = "/"; // Redirige a la página de inicio si no hay token
      return;
    }

    const fetchGraduados = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/invitations/lniuat2024/panel/graduados`,
          {
            params: { token }, // Envía el token como un parámetro en la URL
          }
        );
        setGraduados(response.data);
      } catch (error) {
        console.error("Error al obtener los graduados:", error);
        if (error.response && error.response.status === 403) {
          alert("Acceso denegado");
          window.location.href = "/";
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
      <h1 className="text-2xl font-bold mb-4">Panel</h1>
      {graduados.length > 0 ? (
        <ul className="space-y-4">
          {graduados.map((graduado) => (
            <li key={graduado._id} className="flex items-start space-x-4">
              {/* Card para el ID */}
              <div
                className={`border p-4 rounded-lg shadow-lg ${selectedGraduado === graduado ? "bg-blue-100" : "bg-white"
                  } transition-all duration-300 cursor-pointer text-center`}
                onClick={() => handleGraduadoClick(graduado)}
                style={{ minWidth: "80px" }}
              >
                <span className="text-lg font-bold text-gray-700">
                  {graduado._id}
                </span>
              </div>

              {/* Card para la información del graduado */}
              <div className="border p-6 rounded-lg shadow-lg bg-white flex-1">
                <div
                  className="cursor-pointer text-lg font-semibold flex items-center justify-between"
                  onClick={() => handleGraduadoClick(graduado)}
                >
                  {/* Nombre del graduado alineado a la izquierda */}
                  {graduado.nombreCompleto === 'Profesores Profesores'
                    ? <span className="flex-1 text-left">Profesores</span>
                    : <span className="flex-1 text-left">Lic. {graduado.nombreCompleto}</span>}

                  {/* Confirmados / Total centrado */}
                  <span className="flex-4 text-center text-gray-500">
                    {graduado.arrayInvitados.reduce(
                      (acc, invitado) =>
                        acc + (invitado.status === 'confirmada' ? invitado.cantidadPasesInd : 0),
                      0
                    )}
                    /
                    {graduado.numeroInvitados}
                  </span>
                </div>
                {selectedGraduado === graduado && (
                  <ul className="mt-4 space-y-2 bg-gray-100 p-4 rounded-lg">
                    {graduado.arrayInvitados.map((invitado, index) => (
                      <li key={index} className="border-b pb-2 last:border-b-0">
                        <p>
                          <strong>Nombre:</strong> {invitado.nombre}
                        </p>
                        <p>
                          <span
                            className={`flex items-center gap-3 ${invitado.status === "pendiente"
                              ? "text-orange-500"
                              : "text-green-500"
                              } space-x-1`}
                          >
                            {invitado.status === "pendiente" ? (
                              <>
                                {" "}
                                Pendiente{" "}
                                <FaExclamationTriangle className="text-orange-500" />{" "}
                              </>
                            ) : (
                              <>
                                {" "}
                                Confirmada{" "}
                                <FaCheckCircle className="text-green-500" />{" "}
                                {invitado.cantidadPasesInd >= 0 && (<>{invitado.cantidadPasesInd}/{invitado.cantidadPases}</>)}
                              </>
                            )}
                          </span>
                        </p>
                        <a
                          href={`${window.location.origin
                            }/invitations/grad/lniuat2024/${graduado.nombreCompleto.split(" ")[0]
                            }/${graduado.nombreCompleto.split(" ")[graduado.nombreCompleto.split(" ").length - 2]
                            }/${index + 1}`}
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
              </div>
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
