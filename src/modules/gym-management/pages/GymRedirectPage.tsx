import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROLES } from "@/modules/gym-management/constants/roles";

// ⚠️ Simulación temporal del rol
const MOCK_USER_ROLE = ROLES.STUDENT; // Cambia a ROLES.STUDENT para probar

const GymRedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (MOCK_USER_ROLE === ROLES.TRAINER) {
      navigate("trainer");
    } else {
      navigate("student");
    }
  }, [navigate]);

  return <div className="text-center mt-10">Redirigiendo según tu rol...</div>;
};

export default GymRedirectPage;