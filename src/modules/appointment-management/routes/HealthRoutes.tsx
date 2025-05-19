import { Route, Routes } from "react-router-dom";
import DoctorView from "../pages/DoctorView";
import ShiftsPrincipal from "../features/ShiftsPrincipal/ShiftsPrincipal";
import FormShift from "../features/formshift/formshift";
import GestionShifts from "../features/gestionShifts/gestionShifts";
import StadisticsShifts from "../features/stadisticsShifts/StadisticsShifts";
import AdminView from "../pages/AdminView";
import SecretaryView from "../pages/SecretaryView";

function HealthRoutes() {
  return (
    <Routes>
      <Route index element={<SecretaryView />} />
      <Route path="/home" element={<ShiftsPrincipal />} />
      <Route path="/request-shifts" element={<FormShift />} />
      <Route path="/manage-shifts" element={<GestionShifts />} />
      <Route path="/statistics" element={<StadisticsShifts />} />
    </Routes>
  );
}

export default HealthRoutes;
