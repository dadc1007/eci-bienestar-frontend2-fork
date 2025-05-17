import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo/ECIBienestarTransparent.png";

// carousel images
import carousel1 from "../../../assets/images/carousel/img1.jpg";
import carousel2 from "../../../assets/images/carousel/img2.jpg";
import carousel3 from "../../../assets/images/carousel/img3.jpg";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  // Carousel state
  const carouselImages = [carousel1, carousel2, carousel3];
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  // Auto-play effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIdx((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const nextSlide = () => {
    setCurrentIdx((prev) => (prev + 1) % carouselImages.length);
  };

  const handlePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement password reset logic
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen font-sans">
      {/* Desktop carousel half */}
      <div className="hidden md:flex md:w-1/2 relative bg-[#990000] items-center justify-center overflow-hidden">
        {carouselImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Slide ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              idx === currentIdx ? "opacity-50" : "opacity-0"
            }`}
          />
        ))}
        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carouselImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={`w-3 h-3 rounded-full transition-opacity duration-300 ${
                idx === currentIdx ? "bg-white opacity-100" : "bg-white opacity-50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Formulario */}
      <div className="w-full md:w-1/2 bg-white relative flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        {/* Botón volver */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-[#cf3a3a] flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 sm:h-7 sm:w-7 text-[#cf3a3a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Texto superior */}
        <div className="text-center mb-6 sm:mb-8">
          <img src={logo} alt="Logo" className="mx-auto h-24 sm:h-32" />
          <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-[#cf3a3a]">
            Recupera tu contraseña
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#CF3A3A] text-center sm:text-left pl-4 sm:pl-8">
            Verifica tu dirección de email. Una vez que lo hayas hecho,<br />  
            te enviaremos instrucciones para restablecer tu contraseña.
          </p>
        </div>

        {/* Formulario */}
        <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#cf3a3a] shadow-md">
          <form onSubmit={handlePassword}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-white font-semibold text-sm sm:text-base"
              >
                Correo
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@mail.escuela.edu.co"
                required
                className="w-full px-4 py-2 border border-[#bdc3c7] rounded-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#990000]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#990000] text-white rounded-full font-medium hover:bg-opacity-90 transition"
            >
              Enviar
            </button>
          </form>
        </div>

        {/* Mobile mini-carousel for small screens */}
        <div className="md:hidden w-full h-40 mt-6 relative overflow-hidden rounded-xl shadow-inner bg-[#990000]">
          {carouselImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Slide ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                idx === currentIdx ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          {/* Simple indicators */}
          <div className="absolute inset-0 bg-[#990000] bg-opacity-50 pointer-events-none" />
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {carouselImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`w-2 h-2 rounded-full transition-opacity duration-300 ${
                  idx === currentIdx ? "bg-white opacity-90" : "bg-white opacity-50"
                }`}  
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

