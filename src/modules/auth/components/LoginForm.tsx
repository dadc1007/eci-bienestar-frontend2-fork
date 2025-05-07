import React, { useState } from "react";
import "../style/LoginForm.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Email:", email, "Password:", password);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="login-page">
      {/* Sección del carrusel de imágenes */}
      <div className="image-slider">
        {/* Aquí iría el componente del carrusel de imágenes */}
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

            <div className="form-footer">
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Cargando..." : "Iniciar Sesión"}
              </button>
              <a href="/forgot-password" className="forgot-password">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>

          <p className="disclaimer">[Excentos: 0,5% total]</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
