import React, { useState, useEffect } from "react";
import axios from "axios";
import Birrete from "../../assets/invitations/lniuat2024/birrete.svg";
import Stars1 from "../../assets/invitations/lniuat2024/stars1.svg";
//import Stars2 from "../../assets/invitations/lniuat2024/stars2.svg";
import IconLocation from "../../assets/invitations/lniuat2024/icon-location.svg";
import "../invitations/lniuat2024.css";

const Lniuat2024 = ({ primerNombre, primerApellido, index }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/invitations/lniuat2024/${primerNombre},${primerApellido},${index}`
        );
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error al obtener la información.");
        setLoading(false);
      }
    };

    fetchData();
  }, [primerNombre, primerApellido, index]);

  useEffect(() => {
    const targetDate = new Date("December 13, 2024 20:00:00").getTime();
  
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
  
      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
        const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        const seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
  
        setCountdown({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
      }
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);
  

  if (loading) return <div className="text-center text-lg">Cargando...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div>
      {/* Primera sección */}
      <div className="relative bg-hbg1 min-h-screen flex flex-col justify-between items-center bg-cover bg-center h-auto px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#040814] bg-[length:100%_200%] bg-bottom"></div>

        <div className="z-10 w-full max-w-sm text-center">
          <img src={Birrete} alt="Birrete" className="mx-auto mb-6 w-4/5" />
          <div className="font-bison text-center text-white text-3xl sm:text-2xl">
            FCAT - UAT
          </div>
        </div>

        <div className="z-10 w-full max-w-sm text-center">
          <p className="font-playfair text-white text-lg sm:text-base">
            {data.graduado.genero === "masculino" ? (
              <div>Licenciado en Negocios Internacionales</div>
            ) : (
              <div>Licenciada en Negocios Internacionales</div>
            )}
          </p>
          <p className="py-2 font-qanect text-3xl text-white sm:text-2xl">
            {data.graduado.nombreCompleto}
          </p>
          <p className="pt-6 font-bison text-3xl text-white sm:text-2xl">
            2020 - 2024
          </p>
        </div>

        <div className="z-10 w-full text-center mb-4">
          <p className="font-playfair text-white text-lg sm:text-base">
            Viernes 13 de Diciembre del 2024
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={Stars1}
              alt="Stars1"
              className="absolute bottom-[25px] right-[340px] transform w-7 sm:w-5"
            />
          </div>
        </div>
      </div>

      {/* Segunda sección */}
      <div className="relative bg-hbg2 min-h-screen flex flex-col justify-between items-center bg-cover bg-center h-auto px-4">
        <div className="absolute -inset-1 custom-gradient"></div>
        <div className="absolute inset-0 custom-gradient-bottom"></div>

        <div className="z-10 w-full max-w-sm text-center pt-2">
          <div className="flex justify-center space-x-3 text-white font-qanect text-4xl sm:text-2xl">
            <div className="flex flex-col items-center">
              <p>{countdown.days}</p>
              <p className="text-xs font-playfair">días</p>
            </div>
            <div className="flex flex-col justify-center">
              <p>.</p>
            </div>
            <div className="flex flex-col items-center">
              <p>{countdown.hours}</p>
              <p className="text-xs font-playfair">horas</p>
            </div>
            <div className="flex flex-col justify-center">
              <p>.</p>
            </div>
            <div className="flex flex-col items-center">
              <p>{countdown.minutes}</p>
              <p className="text-xs font-playfair">minutos</p>
            </div>
            <div className="flex flex-col justify-center">
              <p>.</p>
            </div>
            <div className="flex flex-col items-center">
              <p>{countdown.seconds}</p>
              <p className="text-xs font-playfair">segundos</p>
            </div>
          </div>
          <p className="pt-5 font-playfair text-white text-lg sm:text-base">
            A partir de las 8:00 pm
          </p>
        </div>

        <div className="z-10 w-full max-w-sm text-center"></div>

        <div className="z-10 w-full max-w-sm text-center">
          <p className="py-1 font-qanect text-3xl sm:text-2xl">
            {data.invitado.nombre}
          </p>
          <p className="pt-2 font-playfair text-lg sm:text-base">
            Su apoyo y cariño han sido fundamentales en mi vida.
          </p>
          <p className="pt-2 font-playfair text-lg sm:text-base">
            Es un honor compartir esta celebración con las personas más
            importantes en mi vida.
          </p>
        </div>

        <div className="z-10 w-full max-w-sm text-right mt-4">
          {data.graduado.adicional && data.graduado.adicional !== "" ? (
            <p className="font-playfair text-white text-lg py-5 sm:text-base">
              "{data.graduado.adicional}"
              <br />- {data.graduado.nombreCompleto.split(" ")[0]}
            </p>
          ) : (
            <p></p>
          )}
        </div>
        <div className="z-10 w-full max-w-sm text-center"></div>
      </div>

      <div className="relative bg-hbg3 min-h-screen flex flex-col justify-between items-center bg-cover bg-bottom bg-no-repeat h-auto px-4">
        <div className="absolute -inset-1 custom-gradient-3"></div>

        <div className="z-10 w-full max-w-sm text-right pt-4">
          <p className="text-white font-playfair text-lg sm:text-base">
            Y quiero reunirme con ustedes en un lugar que honre cada paso
            recorrido.
          </p>
        </div>

        <div className="z-10 w-full max-w-sm text-center">
          <p className="py-1 text-white font-qanect text-3xl sm:text-2xl">
            Hotel HS HOTSSON
          </p>
          <p className="py-1 text-white font-playfair text-2xl sm:text-lg">
            Salon Esmeralda
            <br />
            Av. Miguel Hidalgo 2000, Smith,
            <br />
            89140, Tampico, Tamps.
          </p>

          <div className="flex justify-center items-center my-32 sm:my-16">
            <a
              href="https://www.google.com/maps/place/HS+HOTSSON+Hotel+Tampico/@22.2404952,-97.905197,13z/data=!4m13!1m2!2m1!1sHotel+HS+Hotsson+Salon+Esmeralda+89140+Tampico+Tamps!3m9!1s0x85d7f9ffbbab4b75:0x3a49defb532f68e4!5m2!4m1!1i2!8m2!3d22.2404952!4d-97.8701781!15sCjRIb3RlbCBIUyBIb3Rzc29uIFNhbG9uIEVzbWVyYWxkYSA4OTE0MCBUYW1waWNvIFRhbXBzIgOIAQGSAQVob3RlbOABAA!16s%2Fg%2F11btx0fxww?entry=ttu&g_ep=EgoyMDI0MTExMS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-white/70 text-black py-4 px-6 rounded-full hover:bg-white/90 transition duration-300 font-qanect sm:py-3 sm:px-4"
            >
              <img
                src={IconLocation}
                alt="Icono de ubicación"
                className="w-auto h-6 sm:h-5"
              />
              <span>Ver ubicación en el mapa</span>
            </a>
          </div>
        </div>
      </div>
    </div>
);

};

export default Lniuat2024;
