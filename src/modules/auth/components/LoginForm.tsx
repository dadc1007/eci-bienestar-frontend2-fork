// src/modules/auth/components/LoginForm.tsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo/ECIBienestarTransparent.png";
import apiClient from "../../../common/services/apiCliend"; 

// imágenes del carrusel
import carousel1 from "../../../assets/images/carousel/img1.jpg";
import carousel2 from "../../../assets/images/carousel/img2.jpg";
import carousel3 from "../../../assets/images/carousel/img3.jpg";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // Estado del carrusel
  const carouselImages = [carousel1, carousel2, carousel3];
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  // Efecto para autoplay del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Cambiar a la diapositiva anterior
  const prevSlide = () => {
    setCurrentIdx((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  // Cambiar a la diapositiva siguiente
  const nextSlide = () => {
    setCurrentIdx((prev) => (prev + 1) % carouselImages.length);
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // ────────────────────────────────────────────────────────────────────────
      // 1) LLAMADA A /auth/login (vía API Gateway)
      // ────────────────────────────────────────────────────────────────────────
      const response = await apiClient.post("/auth/login", {
        username,
        password,
      });
      // Respuesta esperada (200):
      // {
      //   token: "eyJhbGciOiJIUzUxMiJ9…",
      //   refreshToken: "abcd1234…",
      //   type: "Bearer",
      //   id: "user-uuid",
      //   fullName: "Juan Pérez",
      //   email: "juan@ejemplo.com",
      //   role: "ADMINISTRATOR",
      //   specialty: "GENERAL_MEDICINE"
      // }

      const {
        token,
        refreshToken,
        id,
        fullName,
        email: returnedEmail,
        role,
        specialty,
      } = response.data;

      if (!token) {
        throw new Error("No se recibió token desde el servicio de autenticación.");
      }

      // ────────────────────────────────────────────────────────────────────────
      // 2) ALMACENAR token, refreshToken y datos mínimos de usuario en localStorage
      // ────────────────────────────────────────────────────────────────────────
      localStorage.setItem("authToken", token);
      localStorage.setItem("refreshToken", refreshToken);

      // Guardar un objeto “user” con la info mínima (id, nombre, email, rol, especialidad)
      localStorage.setItem(
        "user",
        JSON.stringify({
          id,
          fullName,
          email: returnedEmail,
          role,
          specialty,
        })
      );

      // ────────────────────────────────────────────────────────────────────────
      // 3) REDIRIGIR a la página protegida (Home / Dashboard)
      // ────────────────────────────────────────────────────────────────────────
      navigate("/home");
    } catch (err: any) {
      // Si el backend responde con 401 u otro error con { message: "..." }, muéstralo
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Credenciales incorrectas o error en el servidor. Inténtalo de nuevo.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen font-sans">
      {/* ───────────── Lado del carrusel (solo en desktop) ───────────── */}
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

      {/* ───────────── Lado del formulario ───────────── */}
      <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <img src={logo} alt="Logo" className="mx-auto h-24 sm:h-32 md:h-40" />
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-[#cf3a3a]">
            Inicio de Sesión
          </h2>
        </div>

        <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#cf3a3a] shadow-md">
          <form onSubmit={handleSubmit}>
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="usuario@mail.escuela.edu.co"
                required
                className="w-full px-4 py-2 border border-[#bdc3c7] rounded-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#990000]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-white font-semibold text-sm sm:text-base"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                className="w-full px-4 py-2 border border-[#bdc3c7] rounded-full text-black focus:outline-none focus:ring-2 focus:ring-[#990000]"
              />
            </div>

            {error && <p className="mb-4 text-red-200 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-[#990000] text-white rounded-full font-medium hover:bg-opacity-90 transition"
            >
              {isLoading ? "Cargando..." : "Iniciar Sesión"}
            </button>

            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="text-sm sm:text-base text-[#7aa6ff]">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </form>
        </div>

        {/* ───────────── Carrusel en móvil ───────────── */}
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

export default Login;


