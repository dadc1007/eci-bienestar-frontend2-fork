// src/modules/auth/components/ChangePassword.tsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo/ECIBienestarTransparent.png";
import apiClient from "../../../common/services/apiCliend";

// imágenes del carrusel (opcional)
import carousel1 from "../../../assets/images/carousel/img1.jpg";
import carousel2 from "../../../assets/images/carousel/img2.jpg";
import carousel3 from "../../../assets/images/carousel/img3.jpg";

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  const navigate = useNavigate();

  // Carrusel (opcional, igual que en Login)
  const carouselImages = [carousel1, carousel2, carousel3];
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    // 1) Validar en cliente que nueva password y confirmPassword coincidan
    if (newPassword !== confirmPassword) {
      setError("La nueva contraseña y su confirmación no coinciden.");
      return;
    }

    // 2) Obtener userId y authToken de localStorage
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("authToken");

    if (!storedUser || !token) {
      setError("Necesitas iniciar sesión para cambiar la contraseña.");
      // Opcional: redirigir a /login en 2 segundos
      setTimeout(() => navigate("/"), 2000);
      return;
    }

    const userObj = JSON.parse(storedUser);
    const userId: string = userObj.id; // asumimos que user.id es string

    setIsLoading(true);

    try {
      // 3) Llamada PUT /auth/password/{userId}
      const response = await apiClient.put(
        `/auth/password/${userId}`,
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Si llega aquí sin lanzar error, entendemos que fue 200 OK
      setSuccessMsg("Contraseña actualizada con éxito. Serás redirigido al login.");
      // Limpiar campos
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Opcional: borrar datos de sesión para forzar login con la nueva contraseña
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // Redirigir a login después de mostrar mensaje
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err: any) {
      // 4) Manejo de errores comunes
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.response && err.response.status === 401) {
        setError("La contraseña actual es incorrecta.");
      } else if (err.response && err.response.status === 404) {
        setError("Usuario no encontrado.");
      } else {
        setError("Error al actualizar la contraseña. Inténtalo de nuevo.");
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
      <div className="w-full md:w-1/2 bg-white relative flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        {/* Botón “volver” al login */}
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

        {/* Título e indicaciones */}
        <div className="text-center mb-6 sm:mb-8">
          <img src={logo} alt="Logo" className="mx-auto h-24 sm:h-32" />
          <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-[#cf3a3a]">
            Cambiar contraseña
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#CF3A3A] text-center sm:text-left pl-4 sm:pl-8">
            Ingresa tu contraseña actual y luego la nueva contraseña.<br />
            Se te pedirá iniciar sesión de nuevo con la nueva contraseña.
          </p>
        </div>

        {/* Formulario de cambio de contraseña */}
        <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#cf3a3a] shadow-md">
          <form onSubmit={handleSubmit}>
            {/* Contraseña actual */}
            <div className="mb-4">
              <label
                htmlFor="currentPassword"
                className="block mb-2 text-white font-semibold text-sm sm:text-base"
              >
                Contraseña actual
              </label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="********"
                required
                className="w-full px-4 py-2 border border-[#bdc3c7] rounded-full text-black focus:outline-none focus:ring-2 focus:ring-[#990000]"
              />
            </div>

            {/* Nueva contraseña */}
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block mb-2 text-white font-semibold text-sm sm:text-base"
              >
                Nueva contraseña
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="********"
                minLength={8}
                required
                className="w-full px-4 py-2 border border-[#bdc3c7] rounded-full text-black focus:outline-none focus:ring-2 focus:ring-[#990000]"
              />
            </div>

            {/* Confirmar nueva contraseña */}
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-white font-semibold text-sm sm:text-base"
              >
                Confirmar nueva contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="********"
                minLength={8}
                required
                className="w-full px-4 py-2 border border-[#bdc3c7] rounded-full text-black focus:outline-none focus:ring-2 focus:ring-[#990000]"
              />
            </div>

            {/* Mostrar error, si lo hay */}
            {error && <p className="mb-4 text-red-200 text-sm">{error}</p>}

            {/* Mostrar mensaje de éxito, si lo hay */}
            {successMsg && <p className="mb-4 text-green-200 text-sm">{successMsg}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-[#990000] text-white rounded-full font-medium hover:bg-opacity-90 transition"
            >
              {isLoading ? "Cambiando…" : "Cambiar contraseña"}
            </button>
          </form>
        </div>

        {/* Carrusel en móvil (igual que en Login) */}
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

export default ChangePassword;


