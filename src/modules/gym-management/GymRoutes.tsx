import { Routes, Route, Navigate } from "react-router-dom";
import GymRedirectPage from "./pages/GymRedirectPage";
import StudentDashboardPage from "@/modules/gym-management/pages/StudentDashboardPage";
import TrainerDashboardPage from "@/modules/gym-management/pages/TrainerDashboardPage";

const GymRoutes = () => {
  return (
    <Routes>
      <Route index element={<GymRedirectPage />} />
      <Route path="student" element={<StudentDashboardPage />} />
      <Route path="trainer" element={<TrainerDashboardPage />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};

export default GymRoutes;