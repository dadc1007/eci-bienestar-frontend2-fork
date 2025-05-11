import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSimulatedLogin = () => {
    setIsLoading(true);
    setError("");

    const fakeUserData = {
      id: "fake-user-123",
      name: "Usuario Falso",
      email: "falso@mail.escuela.edu.co",
      token: "fake-jwt-token-simulated-abc456",
      role: "admin",
    };

    console.log("Simulated Login exitoso:", fakeUserData);
    localStorage.setItem("user", JSON.stringify(fakeUserData));

    setIsLoading(false);
    navigate("/home");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // --- Start of commented out real login logic placeholder ---
    /*
    try {
      const response = await axios.post('http://localhost:8080/usuarios/login', { email, password });
      console.log('Login exitoso:', response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate("/home");
    } catch (error: any) {
      console.error('Error en login:', error);
      if (error.response && error.response.data && error.response.data.message) {
         setError(error.response.data.message);
      } else {
         setError('Credenciales incorrectas. Inténtalo de nuevo.'); // Generic error message
      }
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
    }
    */
    setIsLoading(false);
  };

  return (
    <div className="flex h-screen font-sans w-screen">
      <div className="flex-1 bg-[#cf3a3a] flex items-center justify-center">
        {/* falta el carrusel */}
        <p>Imágenes de la escuela</p>
      </div>

      <div className="w-1/2 bg-white flex flex-col items-center justify-center p-8">
        <div className="text-center mb-8">
          <h1>ECI BIENESTAR</h1>
          <h2 className="text-[26px] text-red-500">Inicio de Sesión</h2>
        </div>

        <div className="w-full max-w-[400px] min-w-[200px] p-8 rounded-[30px] bg-[#cf3a3a] shadow-md">
          <form onSubmit={handleSimulatedLogin}>
            <div className="mb-61">
              <label
                htmlFor="email"
                className="block mb-2 text-[#ffffff] font-bold"
              >
                Correo
              </label>
              <input
                className="w-full p-3 border border-[#bdc3c7] rounded-md text-base text-[#ffffff]"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@mail.escuela.edu.co"
                required
              />
            </div>

            <div className="block mb-2 text-[#ffffff] font-bold">
              <label
                htmlFor="password"
                className="block mb-2 text-[#ffffff] font-bold"
              >
                Contraseña
              </label>
              <input
                className="w-full p-3 border border-[#bdc3c7] rounded-md text-base text-[#ffffff]"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <div className="flex flex-col items-center">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full p-3 bg-[#990000] text-white border-none rounded-md text-base cursor-pointer mb-4"
              >
                {isLoading ? "Cargando..." : "Iniciar Sesión"}
              </button>
              <a
                href="/forgot-password"
                className="text-[#7aa6ff] no-underline text-[1.5rem]"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
