import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../utils/LoginForm.css";
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
    <div className="login-page">
      <div className="image-slider">
        {/* falta el carrusel */}
        <p>Imágenes de la escuela</p>
      </div>

      <div className="login-section">
        <div className="login-container">
          <div className="login-header">
            <h1>ECI BIENESTAR</h1>
            <h2>Inicio de Sesión</h2>
          </div>

          <form onSubmit={handleSimulatedLogin}>
            <div className="form-group">
              <label htmlFor="email">Correo</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@mail.escuela.edu.co"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <div className="form-footer">
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Cargando..." : "Iniciar Sesión"}
              </button>
              <a href="/forgot-password" className="forgot-password">
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
