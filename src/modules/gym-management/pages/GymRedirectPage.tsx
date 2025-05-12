import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ⚠️ Simulación temporal del rol
const MOCK_USER_ROLE = "ESTUDIANTE"; // Cambia a "ESTUDIANTE" para probar

const GymRedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (MOCK_USER_ROLE === "ENTRENADOR") {
      navigate("trainer");
    } else {
      navigate("student");
    }
  }, [navigate]);

  return <div className="text-center mt-10">Redirigiendo según tu rol...</div>;
};

export default GymRedirectPage;