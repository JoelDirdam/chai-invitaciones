import React, { useState, useEffect } from "react";
import Hotel from "../../../assets/invitations/lniuat2024/hotel.svg";
import HotelWeb from "../../../assets/invitations/lniuat2024/hotelweb.svg";
import Reservacion from "../../../assets/invitations/lniuat2024/reservacion.svg";

const PopUpImage = () => {
    const [isImageOpen, setIsImageOpen] = useState(false);

    // Efecto para deshabilitar el scroll
    useEffect(() => {
        if (isImageOpen) {
            document.body.style.overflow = "hidden"; // Deshabilitar scroll
        } else {
            document.body.style.overflow = ""; // Restaurar scroll
        }

        return () => {
            document.body.style.overflow = ""; // Limpieza en caso de desmontar
        };
    }, [isImageOpen]);

    const handleOpenImage = () => setIsImageOpen(true);
    const handleCloseImage = () => setIsImageOpen(false);

    return (
        <>
            {/* Componente principal */}
            <div className="z-10 max-w-sm md:max-w-xl text-right pb-10">
                {/* Botón para abrir la imagen */}
                <button
                    onClick={handleOpenImage}
                    className="flex md:hidden items-center justify-center space-x-4 bg-black/70 text-white py-4 px-5 rounded-full hover:bg-black/90 transition duration-300 font-qanect pr-4"
                >
                    <img
                        src={Hotel}
                        alt="Icono de reservación"
                        className="w-auto h-6 sm:h-5"
                    />
                    <span>Información del hospedaje</span>
                </button>
                {/* Web */}
                <div className="md:flex flex-row hidden items-center justify-center gap-4">
                    <img
                        src={HotelWeb}
                        alt="Icono de reservación"
                        className="w-auto h-6 md:h-16"
                    />
                    <button
                        onClick={handleOpenImage}
                        className="text-center bg-black/70 text-white py-2 px-10 rounded-full hover:bg-black/90 transition duration-300 font-qanect"
                    >
                        <span>Información del hospedaje</span>
                    </button>
                </div>
            </div>

            {/* Imagen en pantalla completa */}
            {isImageOpen && (
                <div
                    className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999] cursor-zoom-out"
                    onClick={handleCloseImage} // Cierra al hacer clic fuera de la imagen
                >
                    <img
                        src={Reservacion}
                        alt="Información del hospedaje"
                        className="max-w-full max-h-full transform scale-100 transition-transform duration-300"
                    />
                </div>
            )}
        </>
    );
};

export default PopUpImage;
