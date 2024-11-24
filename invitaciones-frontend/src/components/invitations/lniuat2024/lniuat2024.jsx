import React, { useState, useEffect } from "react";
import axios from "axios";
import Birrete from "../../../assets/invitations/lniuat2024/birrete.svg";
import BirreteWeb from "../../../assets/invitations/lniuat2024/birreteweb.svg";
import Stars1 from "../../../assets/invitations/lniuat2024/stars1.svg";
import Stars2 from "../../../assets/invitations/lniuat2024/stars2.svg";
import StarsHotel1 from "../../../assets/invitations/lniuat2024/StarsHotel1.svg";
import StarsHotel2 from "../../../assets/invitations/lniuat2024/StarsHotel2.svg";
import IconLocation from "../../../assets/invitations/lniuat2024/icon-location.svg";
import IconLocationWeb from "../../../assets/invitations/lniuat2024/icon-location-web.svg";
import DiscoBall from "../../../assets/invitations/lniuat2024/disco-ball.svg";
import DiscoBallWeb from "../../../assets/invitations/lniuat2024/disco-ballweb.svg";
import Traje from "../../../assets/invitations/lniuat2024/traje.svg";
import Vestido from "../../../assets/invitations/lniuat2024/vestido.svg";
import Dropbox from "../../../assets/invitations/lniuat2024/dropbox.svg";
import StarsSec4_1 from "../../../assets/invitations/lniuat2024/stars-sec4-1.svg";
import StarsSec4_2 from "../../../assets/invitations/lniuat2024/stars-sec4-2.svg";
import StarsSec4_3 from "../../../assets/invitations/lniuat2024/stars-sec4-3.svg";
import PopUpImage from "./PopUpImage";
import Footer from "./Footer";
import "../lniuat2024/lniuat2024.css";

const Lniuat2024 = ({ primerNombre, primerApellido, index }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPases, setSelectedPases] = useState(0); // Estado para el dropdown
  const [errorMessage, setErrorMessage] = useState(""); // Estado para manejar errores
  const [isLoading, setIsLoading] = useState(false);
  const [isMd, setIsMd] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  //console.log(selectedPases);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/invitations/lniuat2024/${primerNombre},${primerApellido},${index}`
        );
        setData(response.data);
        setSelectedPases(response.data.invitado.cantidadPases[0]); // Valor inicial del dropdown
        setLoading(false);
      } catch (err) {
        setError("Error al obtener la información.");
        setLoading(false);
      }
    };

    fetchData();

    const handleResize = () => {
      // Verifica si la pantalla es al menos 'md' (768px)
      setIsMd(window.innerWidth >= 768);
    };

    handleResize(); // Verifica inicialmente el tamaño de la pantalla
    window.addEventListener("resize", handleResize); // Escucha cambios de tamaño

    return () => {
      window.removeEventListener("resize", handleResize); // Limpia el evento
    };
  }, [primerNombre, primerApellido, index]);

  useEffect(() => {
    const targetDate = new Date("December 13, 2024 20:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = String(
          Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        ).padStart(2, "0");
        const minutes = String(
          Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        ).padStart(2, "0");
        const seconds = String(
          Math.floor((distance % (1000 * 60)) / 1000)
        ).padStart(2, "0");

        setCountdown({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleConfirm = async () => {
    if (!selectedPases || selectedPases === 0) {
      setErrorMessage("Por favor, selecciona el número de pases.");
      return;
    }
    setErrorMessage(""); // Limpiar error si todo está bien

    try {
      setIsLoading(true);
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/invitations/lniuat2024/actualizar-estado/${primerNombre},${primerApellido},${index}`,
        {
          nuevoEstado: "confirmada",
          cantidadPasesInd: selectedPases,
        }
      );
      alert("Confirmación exitosa");
    } catch (error) {
      alert("Error al confirmar la invitación");
    } finally {
      setIsLoading(false);
    }
  };

  const formatNombre = (nombreCompleto) => {
    const palabras = nombreCompleto.split(" ");
    const totalPalabras = palabras.length;

    if (totalPalabras === 2) {
      //Profesores
      return (
        <>
          <p className="py-2 md:py-6 font-qanect text-white text-3xl md:text-5xl"
            style={isMd ? { lineHeight: "4rem" } : {}}>
            Licenciatura en Negocios Internacionales
          </p>
        </>
      );
    } else if (totalPalabras === 3) {
      // Si hay 3 palabras, muestra la primera y luego el resto en una nueva línea
      return (
        <>
          <p className="font-playfair text-white text-lg md:text-4xl">
            {data.graduado.genero === "masculino" ? (
              <div>Licenciado en Negocios Internacionales</div>
            ) : (
              <div>Licenciada en Negocios Internacionales</div>
            )}
          </p>
          <p className="py-2 md:py-6 font-qanect text-white text-3xl md:text-5xl"
            style={isMd ? { lineHeight: "4rem" } : {}}>
            {palabras[0]}
            <br />
            {palabras.slice(1).join(" ")}
          </p>
        </>
      );
    } else if (totalPalabras === 4) {
      // Si hay 4 palabras, divide en dos líneas, dos palabras cada una
      return (
        <>
          <p className="font-playfair text-white text-lg md:text-4xl">
            {data.graduado.genero === "masculino" ? (
              <div>Licenciado en Negocios Internacionales</div>
            ) : (
              <div>Licenciada en Negocios Internacionales</div>
            )}
          </p>
          <p className="py-2 md:py-6 font-qanect text-white text-3xl md:text-5xl"
            style={isMd ? { lineHeight: "4rem" } : {}}>
            {palabras.slice(0, 2).join(" ")}
            <br />
            {palabras.slice(2).join(" ")}
          </p>
        </>
      );
    } else {
      // Para otros casos, muestra el nombre completo tal cual
      return nombreCompleto;
    }
  };

  if (loading) return <div className="text-center text-lg">Cargando...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div>
      {/* Primera sección */}
      <div className="relative bg-hbg1 md:bg-hbg1web min-h-screen flex flex-col justify-between items-center bg-cover bg-center h-auto px-4">
        <div className="absolute inset-0 custom-gradient-1"></div>

        <div className="z-10 w-full max-w-sm text-center">
          <img
            src={isMd ? BirreteWeb : Birrete}
            alt="Birrete"
            className="mx-auto mb-6 w-full md:scale-150 md:-ml-5"
          />
          <div className="font-bison text-center text-white text-3xl md:text-4xl md:mt-16">
            FCAT - UAT <br /> 2020 - 2024
          </div>
        </div>

        <div className="z-10 w-full max-w-sm md:max-w-2xl text-center">
          {formatNombre(data.graduado.nombreCompleto)}
        </div>

        <div className="z-10 w-full text-center mb-4">
          <p className="font-playfair text-white text-lg md:hidden">
            Viernes 13 de Diciembre del 2024
          </p>
          <div className="absolute inset-0 flex items-center justify-center md:hidden">
            <img
              src={Stars1}
              alt="Stars1"
              className="absolute bottom-[3%] left-[5%] transform w-7 sm:w-5"
            />
          </div>
        </div>
      </div>

      {/* Segunda sección */}
      <div className="relative bg-hbg2 min-h-screen flex flex-col justify-between items-center bg-cover md:bg-contain bg-center md:bg-bottom h-auto px-4">
        <div className="absolute -inset-1 custom-gradient-2"></div>
        <div className="absolute inset-0 custom-gradient-bottom"></div>

        <div className="z-10 w-full max-w-sm md:max-w-2xl text-center pt-2">
          <p className="font-playfair text-white text-4xl hidden mt-8 mb-16 md:block">
            Viernes 13 de Diciembre del 2024
          </p>
          <div className="absolute inset-0 md:flex items-center justify-center hidden">
            <img
              src={Stars1}
              alt="Stars1"
              className="absolute top-[0%] left-[25%] transform sm:w-90"
            />
          </div>
          <div className="flex justify-center space-x-3 md:space-x-6 text-white font-qanect text-4xl md:text-8xl">
            <div className="flex flex-col items-center">
              <p>{countdown.days}</p>
              <p className="text-xs md:text-xl font-playfair">días</p>
            </div>
            <div className="flex flex-col justify-center">
              <p>.</p>
            </div>
            <div className="flex flex-col items-center">
              <p>{countdown.hours}</p>
              <p className="text-xs md:text-xl font-playfair">horas</p>
            </div>
            <div className="flex flex-col justify-center">
              <p>.</p>
            </div>
            <div className="flex flex-col items-center">
              <p>{countdown.minutes}</p>
              <p className="text-xs md:text-xl font-playfair">minutos</p>
            </div>
            <div className="flex flex-col justify-center">
              <p>.</p>
            </div>
            <div className="flex flex-col items-center">
              <p>{countdown.seconds}</p>
              <p className="text-xs md:text-xl font-playfair">segundos</p>
            </div>
          </div>
          <p className="pt-5 md:pt-10 font-playfair text-white text-lg md:text-4xl">
            A partir de las 8:00 pm
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={Stars2}
              alt="Stars2"
              className="absolute top-[12%] right-[15%] transform w-4 md:hidden"
            />
            <img
              src={Stars2}
              alt="Stars2"
              className="absolute top-[38%] right-[36%] transform w-6 hidden md:flex"
            />
          </div>
        </div>

        <div className="z-10 w-full max-w-sm text-center"></div>

        <div className="z-10 w-full max-w-sm md:max-w-3xl text-center">
          <p className="py-1 font-qanect text-3xl md:text-5xl">
            {data.invitado.nombre}
          </p>
          <p className="pt-2 md:pt-6 font-playfair text-lg md:text-2xl">
            Su apoyo y cariño han sido fundamentales en mi vida.
          </p>
          <p className="pt-2 md:pt-6 font-playfair text-lg md:text-2xl">
            Es un honor compartir esta celebración con las personas más
            importantes en mi vida.
          </p>
        </div>

        <div className="z-10 w-full max-w-sm md:max-w-3xl text-right mt-4">
          {data.graduado.adicional && data.graduado.adicional !== "" ? (
            <p className="font-playfair text-white text-lg py-5 md:text-2xl">
              "{data.graduado.adicional}"
              <br />- {data.graduado.nombreCompleto.split(" ")[0]}
            </p>
          ) : (
            <p></p>
          )}
        </div>
        <div className="z-10 w-full max-w-sm text-center"></div>
      </div>

      {/* Tercera sección */}
      <div className="relative bg-hbg3 md:bg-hbg3web min-h-screen flex flex-col justify-between items-center  bg-fixed bg-bottom h-auto px-4">
        <div className="absolute -inset-1 custom-gradient-3"></div>

        <div className="z-10 w-full max-w-sm md:max-w-3xl text-right md:text-center pt-4">
          <p className="text-white font-playfair text-lg md:text-2xl">
            Y quiero reunirme con ustedes en un lugar que honre{" "}
            <br className="hidden md:flex" /> cada paso recorrido.
          </p>
        </div>

        <div className="relative z-10 w-full max-w-sm md:max-w-3xl text-center">
          <p className="py-1 text-white font-qanect text-3xl md:hidden">
            Hotel HS HOTSSON
          </p>
          {/* Web */}
          <p className="py-1 text-white font-qanect hidden text-5xl md:flex items-start justify-center gap-5">
            <img
              src={IconLocationWeb}
              alt="Icono de ubicación"
              className="w-8 h-auto md:inline-block"
            />
            Hotel HS HOTSSON
          </p>
          <p className="py-1 text-white font-playfair text-2xl md:hidden">
            Salon Esmeralda
            <br />
            Av. Miguel Hidalgo 2000, Smith,
            <br />
            89140, Tampico, Tamps.
          </p>
          {/* Web */}
          <p className="py-6 text-white font-playfair text-3xl hidden md:block">
            Salon Esmeralda
            <br />
            Av. Miguel Hidalgo 2000, Smith,
            <br />
            89140, Tampico, Tamps.
          </p>

          {/* Estrellas */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <img
              src={StarsHotel1}
              alt="StarsHotel1"
              className="absolute bottom-[63%] left-[2%] md:bottom-[55%] md:left-[0%] transform w-8 md:w-14 pointer-events-none"
            />
            <img
              src={StarsHotel2}
              alt="StarsHotel2"
              className="absolute top-[-15%] right-[2%] md:top-[-15%] md:right-[0%] transform w-5 md:w-10 pointer-events-none"
            />
          </div>

          <div className="relative z-10 flex justify-center items-center my-32 sm:my-16">
            <a
              href="https://www.google.com/maps/place/HS+HOTSSON+Hotel+Tampico/@22.2404952,-97.905197,13z/data=!4m13!1m2!2m1!1sHotel+HS+Hotsson+Salon+Esmeralda+89140+Tampico+Tamps!3m9!1s0x85d7f9ffbbab4b75:0x3a49defb532f68e4!5m2!4m1!1i2!8m2!3d22.2404952!4d-97.8701781!15sCjRIb3RlbCBIUyBIb3Rzc29uIFNhbG9uIEVzbWVyYWxkYSA4OTE0MCBUYW1waWNvIFRhbXBzIgOIAQGSAQVob3RlbOABAA!16s%2Fg%2F11btx0fxww?entry=ttu&g_ep=EgoyMDI0MTExMS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-white/70 text-black py-4 px-6 rounded-full hover:bg-white/90 transition duration-300 font-qanect sm:py-3 sm:px-4"
            >
              <img
                src={IconLocation}
                alt="Icono de ubicación"
                className="w-auto h-6 md:hidden"
              />
              <span>Ver ubicación en el mapa</span>
            </a>
          </div>
        </div>

        <div className="z-10 w-full max-w-sm md:max-w-3xl text-center hidden md:flex"></div>
      </div>

      {/* Cuarta sección */}
      <div className="relative custom-gradient-4 min-h-screen flex flex-col justify-between items-center bg-cover bg-no-repeat h-auto px-4">
        <div className="absolute inset-4 md:inset-0 md:inset-x-[30%] bg-hbg4 md:bg-hbg4web bg-cover md:bg-bottom"></div>
        <div className="absolute custom-gradient-4"></div>
        <div className="absolute left-0 md:hidden">
          <img src={DiscoBall} alt="Disco ball" className="w-[45%] h-full" />
        </div>
        <div className="absolute left-[30%] hidden md:flex">
          <img src={DiscoBallWeb} alt="Disco ball" className="w-[75%] h-full" />
        </div>

        <div className="z-10 w-full max-w-sm md:max-w-xl text-right pt-12 md:pt-24">
          <p className="font-playfair text-xl md:text-2xl text-[#97989D]">
            Dress code:{" "}
            <strong className="font-qanect text-black ml-4 mr-4">Formal</strong>
          </p>
          <div className="flex justify-end mt-2 md:mt-4 space-x-2 md:mr-2">
            <img src={Traje} alt="Traje" className="w-[13.5%] md:w-[9%]" />
            <img src={Vestido} alt="Vestido" className="w-[13.5%] md:w-[9%]" />
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="font-playfair text-xl text-[#97989D] text-center ml-[6.5rem] md:ml-0 mt-[5.6rem] leading-none">
              Este día no seria el mismo <br /> sin tu presencia.
            </p>
          </div>
          {data.invitado.cantidadPasesInd === 0 ? (
            <>
              <p className="text-3xl md:text-5xl font-qanect text-center mt-10 md:mt-20">
                Confirmación de <br /> asistencia
              </p>
              <div className="flex flex-col items-center mt-4 md:hidden">
                <div className="relative mb-4">
                  <select
                    id="pases-select"
                    value={selectedPases}
                    onChange={(e) => setSelectedPases(Number(e.target.value))}
                    className="block w-full px-6 pr-14 py-2 border-2 border-black rounded-lg appearance-none bg-white bg-opacity-65 text-black font-bison text-2xl"
                  >
                    <option value="" disabled selected>
                      Cantidad de pases a confirmar
                    </option>
                    {[...Array(data.invitado.cantidadPases).keys()].map(
                      (_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      )
                    )}
                  </select>
                  {selectedPases == null && (
                    <img
                      src={Dropbox}
                      alt="Dropbox icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none w-5"
                    />
                  )}
                </div>
                {/* Mensaje de error */}
                {errorMessage && (
                  <p className="text-red-500 py-3 px-3 font-bison text-lg bg-white/75 rounded-xl">
                    {errorMessage}
                  </p>
                )}

                <button
                  onClick={handleConfirm}
                  className="flex items-center justify-center space-x-2 bg-black/70 text-white py-3 px-14 rounded-full hover:bg-black/90 transition duration-300 font-qanect sm:py-3 sm:px-4"
                  disabled={isLoading}
                >
                  <span>{isLoading ? "Confirmando..." : "Confirmar"}</span>
                </button>
              </div>
              {/* Web */}
              <div className="flex-row items-center content-center justify-around mt-4 hidden md:flex">
                <div className="relative mb-4">
                  <select
                    id="pases-select"
                    value={selectedPases}
                    onChange={(e) => setSelectedPases(Number(e.target.value))}
                    className="block w-full px-6 pr-14 py-1 border-2 border-black rounded-lg appearance-none bg-white bg-opacity-65 text-black font-bison text-2xl md:text-xl"
                  >
                    <option value="" disabled selected>
                      Cantidad de pases a confirmar
                    </option>
                    {[...Array(data.invitado.cantidadPases).keys()].map(
                      (_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      )
                    )}
                  </select>
                  {selectedPases == null && (
                    <img
                      src={Dropbox}
                      alt="Dropbox icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none w-5"
                    />
                  )}
                </div>

                <div className="mb-4">
                  <button
                    onClick={handleConfirm}
                    className="flex items-center justify-center space-x-2 bg-black/70 text-white py-2 px-12 rounded-full hover:bg-black/90 transition duration-300 font-qanect"
                    disabled={isLoading}
                  >
                    <span>{isLoading ? "Confirmando..." : "Confirmar"}</span>
                  </button>
                </div>
              </div>

              {/* Mensaje de error */}
              {errorMessage && (
                <p className="text-red-500 py-3 px-2 font-bison text-lg bg-white/75 rounded-xl text-center">
                  {errorMessage}
                </p>
              )}
            </>
          ) : (
            <>
              <p className="text-3xl md:text-5xl font-qanect text-center mt-10 md:mt-20">
                Confirmados: {data.invitado.cantidadPasesInd}
              </p>
            </>
          )}

        </div>

        <PopUpImage />
      </div>

      {/* Quinta sección */}
      {data.graduado.imagenes && data.graduado.imagenes.length > 0 && (
        <div className="relative bg-[#040814] min-h-screen flex flex-col justify-between items-center bg-cover bg-no-repeat h-auto px-4">
          <div className="absolute bg-[#040814] -inset-1"></div>
          {/* Primera subsección */}
          <div className="z-10 w-full max-w-sm md:max-w-2xl text-center pt-12">
            <p className="text-[1.7rem] md:text-5xl sm:text-4xl font-qanect text-white">
              Galeria de fotos
            </p>
            <p className="font-playfair text-white mt-4 md:text-xl">
              Momentos que marcaron este viaje y que ahora{" "}
              <br className="md:hidden" /> comparto con quienes lo hicieron
              posible.
            </p>
            <div className="absolute inset-0 flex justify-center">
              <img
                src={StarsSec4_1}
                alt="Stars1"
                className="absolute top-[45px] md:top-[2%] left-[20px] md:left-[32%] transform w-6 md:w-10"
              />
              <img
                src={StarsSec4_2}
                alt="Stars1"
                className="absolute top-[40px] md:top-[2%] right-[20px] md:right-[32%] transform w-6 md:w-8"
              />
            </div>
          </div>

          {/* Segunda subsección - Galería de fotos */}
          <div
            className={`z-30 w-full max-w-sm md:max-w-2xl gap-4 mt-8 md:mt-16 px-2 pb-32 ${data.graduado.imagenes.length === 1
              ? 'columns-1 flex justify-center'
              : data.graduado.imagenes.length === 2
                ? 'columns-2'
                : 'columns-3'
              }`}
          >
            {data.graduado.imagenes.slice(0, 6).map((imagen, index) => (
              <img
                key={index}
                src={imagen}
                alt={`Galeria ${index + 1}`}
                className={`w-full mb-6 break-inside-avoid max-w-[500px]`}
              />
            ))}
          </div>
          <div className="z-10 w-full max-w-sm md:max-w-3xl text-center hidden md:flex"></div>
          <div className="absolute inset-0 flex justify-center">
            <img
              src={StarsSec4_3}
              alt="Stars1"
              className="absolute bottom-[40px] md:bottom-[5%] left-[30px] md:left-[32.5%] transform w-10 md:w-10"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Lniuat2024;
