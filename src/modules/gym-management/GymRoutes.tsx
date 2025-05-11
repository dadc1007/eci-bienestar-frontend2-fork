import { Routes, Route, Navigate } from "react-router-dom";
import GymRedirectPage from "@/modules/gym-management/pages/GymRedirectPage";

// Layouts
import StudentDashboardPage from "@/modules/gym-management/pages/StudentDashboardPage";
import TrainerDashboardPage from "@/modules/gym-management/pages/TrainerDashboardPage";

// Student pages
import StudentMainPage from "@/modules/gym-management/pages/student/StudentMainPage";
import ReservationsPage from "@/modules/gym-management/pages/student/ReservationsPage";
import BookingPage from "@/modules/gym-management/pages/student/BookingPage";
import RoutinesPage from "@/modules/gym-management/pages/student/RoutinesPage";
import RegisterProgressPage from "@/modules/gym-management/pages/student/RegisterProgressPage";
import EvolutionPage from "@/modules/gym-management/pages/student/EvolutionPage";

const GymRoutes = () => {
  return (
    <Routes>
      {/* Redirección basada en rol */}
      <Route index element={<GymRedirectPage />} />

      {/* Rutas para estudiantes */}
      <Route path="student" element={<StudentDashboardPage />}>
        <Route index element={<StudentMainPage />} />
        <Route path="reservations" element={<ReservationsPage />} />
        <Route path="booking" element={<BookingPage />} />
        <Route path="routines" element={<RoutinesPage />} />
        <Route path="progress" element={<RegisterProgressPage />} />
        <Route path="evolution" element={<EvolutionPage />} />
      </Route>

      {/* Rutas para entrenadores */}
      <Route path="trainer" element={<TrainerDashboardPage />} />
      {/* Aquí puedes anidar rutas de entrenador si tienes varias subpáginas */}

      {/* Catch-all: redirige rutas desconocidas */}
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  );
};

export default GymRoutes;