import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Modal from "react-modal";

const GallerySection = ({ data }) => {
    const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada

    // Cerrar el modal
    const closeModal = () => setSelectedImage(null);

    return (
        <div className="z-30 w-full max-w-4xl mt-8 md:mt-16 px-2 pb-32">
            {/* Carrusel */}
            <Swiper
                modules={[Navigation, Pagination]} // Registra los módulos directamente aquí
                navigation
                pagination={{ clickable: true }}
                spaceBetween={20} // Espacio entre imágenes
                slidesPerView={1} // Mostrar una imagen por vez
                centeredSlides={true} // Centrar las imágenes
            >
                {data.graduado.imagenes.slice(0, 10).map((imagen, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={imagen}
                            alt={`Galería ${index + 1}`}
                            className="w-[500px] h-auto mx-auto cursor-pointer object-cover" // Centrar con ancho fijo
                            onClick={() => setSelectedImage(imagen)} // Abrir modal al hacer clic
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Modal para ver la imagen ampliada */}
            <Modal
                isOpen={!!selectedImage}
                onRequestClose={closeModal}
                contentLabel="Imagen Ampliada"
                ariaHideApp={false} // Solo necesario si usas React-Modal en un SPA
                overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center" // Fondo oscuro centrado
                className="relative z-50 max-w-full max-h-full"
            >
                <div className="relative">
                    <img
                        src={selectedImage}
                        alt="Imagen ampliada"
                        className="max-w-full max-h-[90vh] mx-auto"
                    />
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 bg-white text-black p-2 rounded-full"
                    >
                        ✕
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default GallerySection;