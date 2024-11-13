import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Birrete from '../../assets/invitations/lniuat2024/birrete.svg';
import Stars from '../../assets/invitations/lniuat2024/stars.svg';

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

  useEffect(() => {
    const targetDate = new Date('December 13, 2024 19:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

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
      <div className="relative bg-hbg1 min-h-screen flex flex-col justify-between items-center bg-cover bg-center h-auto">
        {/* Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#040814] bg-[length:100%_200%] bg-bottom"></div>

        {/* Primera subsección */}
        <div className="z-10 w-full max-w-sm text-center">
          <img src={Birrete} alt="Birrete" className="mx-auto mb-6 w-4/5" />
          <div className='font-bison text-center text-white text-3xl'>FCAT - UAT</div>
        </div>

        {/* Segunda subsección */}
        <div className="z-10 w-full max-w-sm text-center">
          <p className='font-playfair text-white text-lg'>
            {data.graduado.genero === 'masculino' ? (
              <div>Licenciado en Negocios Internacionales</div>
            ) : (
              <div>Licenciada en Negocios Internacionales</div>
            )}
          </p>
          <p className='py-2 font-qanect text-3xl text-white'>{data.graduado.nombreCompleto}</p>
          <p className='pt-6 font-bison text-3xl text-white'>2020 - 2024</p>
        </div>

        {/* Tercera subsección*/}
        <div className="z-10 w-full text-center mb-4">
          <p className='font-playfair text-white text-lg'>Viernes 13 de Diciembre del 2024</p>
          <div className='absolute inset-0 flex items-center justify-center'>
            <img src={Stars} alt="Stars" className='absolute bottom-[25px] right-[340px] transform w-7' />
          </div>
        </div>
      </div>

      {/* Segunda sección */}
      <div className="relative bg-hbg2 min-h-screen flex flex-col justify-between items-center bg-cover bg-center h-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-[#040814] via-white to-transparent"></div>
        {/* Gradiente abajo*/}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#040814] bg-bottom"></div> */}

        {/* Primera subsección con la cuenta regresiva */}
        <div className="z-10 w-full max-w-sm text-center">
          <div className="flex justify-center space-x-3 text-white font-qanect text-4xl">
            {/* Días */}
            <div className="flex flex-col items-center">
              <p>{countdown.days}</p>
              <p className="text-xs font-playfair">días</p>
            </div>
            {/* Punto separador */}
            <div className="flex flex-col justify-center">
              <p>.</p>
            </div>
            {/* Horas */}
            <div className="flex flex-col items-center">
              <p>{countdown.hours}</p>
              <p className="text-xs font-playfair">horas</p>
            </div>
            {/* Punto separador */}
            <div className="flex flex-col justify-center">
              <p>.</p>
            </div>
            {/* Minutos */}
            <div className="flex flex-col items-center">
              <p>{countdown.minutes}</p>
              <p className="text-xs font-playfair">minutos</p>
            </div>
            {/* Punto separador */}
            <div className="flex flex-col justify-center">
              <p>.</p>
            </div>
            {/* Segundos */}
            <div className="flex flex-col items-center">
              <p>{countdown.seconds}</p>
              <p className="text-xs font-playfair">segundos</p>
            </div>
          </div>
          <p className='pt-5 font-playfair text-white text-lg'>A partir de las 7:00 pm</p>
        </div>

        {/* Segunda subsección */}
        <div className="z-10 w-full max-w-sm text-center">
          <p className='py-2 font-qanect text-3xl'>{data.invitado.nombre}</p>
          <p className='pt-3 font-playfair text-lg mx-4'>Su apoyo y cariño han sido fundamentales en mi vida.</p>
          <p className='pt-3 font-playfair text-lg mx-4'>Es un honor compartir esta celebración con las personas más importantes en mi vida.</p>
        </div>

        {/* Tercera subsección*/}
        <div className="z-10 w-full text-center mb-4">
          <p className='font-playfair text-white text-lg'>Viernes 13 de Diciembre del 2024</p>
          <div className='absolute inset-0 flex items-center justify-center'>
            <img src={Stars} alt="Stars" className='absolute bottom-[25px] right-[340px] transform w-7' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lniuat2024;
