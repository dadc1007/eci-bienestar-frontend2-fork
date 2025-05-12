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
import RegisterMeasurements from "@/modules/gym-management/pages/student/RegisterMeasurements";
//import RegisterMeasurements from "@/modules/gym-management/pages/student/BodyMeasurements";

// Trainer pages
import TrainerMainPage from "@/modules/gym-management/pages/trainer/TrainerMainPage";
import TrainerRoutinesPage from "@/modules/gym-management/pages/trainer/TrainerRoutinesPage";
import ExercisesPage from "@/modules/gym-management/pages/trainer/ExercisesPage";
import SessionsPage from "@/modules/gym-management/pages/trainer/SessionsPage";
import TrainerReservationsPage from "@/modules/gym-management/pages/trainer/TrainerReservationsPage";
import ProgressPage from "@/modules/gym-management/pages/trainer/ProgressPage";


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
        <Route path="first-register" element={<RegisterMeasurements />} />
      </Route>

      {/* Rutas para entrenadores */}
      <Route path="trainer" element={<TrainerDashboardPage />}>
        <Route index element={<TrainerMainPage />} />
        <Route path="trainer-routines" element={<TrainerRoutinesPage />} />
        <Route path="exercises" element={<ExercisesPage />} />
        <Route path="sessions" element={<SessionsPage />} />
        <Route path="trainer-reservations" element={<TrainerReservationsPage />} />
        <Route path="progress" element={<ProgressPage />} />
      </Route>

      {/* Catch-all: redirige rutas desconocidas */}
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  );
};

export default GymRoutes;