import { Route, Routes } from "react-router-dom";
import DoctorView from "../pages/DoctorView";
import ShiftsPrincipal from "../features/ShiftsPrincipal/ShiftsPrincipal";
import FormShift from "../features/formshift/formshift";
import GestionShifts from "../features/gestionShifts/gestionShifts";
import Stadistics from "../features/Stadistics/Stadistics";
import MainView from "../pages/MainView";

function HealthRoutes() {
  return (
    <Routes>
      <Route index element={<MainView />} />
      <Route path="/home" element={<ShiftsPrincipal />} />
      <Route path="/request-shifts" element={<FormShift />} />
      <Route path="/manage-shifts" element={<GestionShifts />} />
      <Route path="/statistics" element={<Stadistics />} />
      <Route path="/call-turns" element={<DoctorView />} />
    </Routes>
  );
}

export default HealthRoutes;
