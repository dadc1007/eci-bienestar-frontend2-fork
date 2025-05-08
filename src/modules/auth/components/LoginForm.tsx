import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../utils/LoginForm.css";
import { login } from "../services/authService";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
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

          <form onSubmit={handleSubmit}>
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
