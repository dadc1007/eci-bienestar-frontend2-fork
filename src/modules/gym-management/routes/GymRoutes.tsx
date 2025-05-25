import { Routes, Route } from "react-router-dom";
import { Role } from "@/common/types";
import ProtectedRoute from "@/modules/gym-management/components/ProtectedRoute";
import GymRedirect from "@/modules/gym-management/components/GymRedirect";

// Layouts
import StudentDashboardPage from "@/modules/gym-management/pages/StudentDashboardPage";
import TrainerDashboardPage from "@/modules/gym-management/pages/TrainerDashboardPage";

// Index
import StudentIndexPage from "@/modules/gym-management/pages/StudentIndexPage";
import TrainerIndexPage from "@/modules/gym-management/pages/TrainerIndexPage";

// Student pages
import StudentMainPage from "@/modules/gym-management/pages/student/StudentMainPage";
import ReservationsPage from "@/modules/gym-management/pages/student/ReservationsPage";
import BookingPage from "@/modules/gym-management/pages/student/BookingPage";
import RoutinesPage from "@/modules/gym-management/pages/student/RoutinesPage";
import RegisterProgressPage from "@/modules/gym-management/pages/student/RegisterProgressPage";
import EvolutionPage from "@/modules/gym-management/pages/student/EvolutionPage";
import RegisterMeasurements from "@/modules/gym-management/pages/student/RegisterMeasurements";
import BodyMeasurements from "@/modules/gym-management/pages/student/BodyMeasurements";
import MyStudentsProgress from "@/modules/gym-management/pages/trainer/MyStudentsProgress";

// Trainer pages
import TrainerMainPage from "@/modules/gym-management/pages/trainer/TrainerMainPage";
import TrainerRoutinesPage from "@/modules/gym-management/pages/trainer/TrainerRoutinesPage";
import ExercisesPage from "@/modules/gym-management/pages/trainer/ExercisesPage";
import SessionsPage from "@/modules/gym-management/pages/trainer/SessionsPage";
import TrainerGenerateReportPage from "@/modules/gym-management/pages/trainer/TrainerGenerateReportPage";
import ProgressPage from "@/modules/gym-management/pages/trainer/ProgressPage";

// NotFound page
import NotFoundPage from "@/modules/gym-management/pages/NotFoundPage";

const GymRoutes = () => {
  return (
    <Routes>
      {/* Redirección basada en rol */}
      <Route index element={<GymRedirect />} />
      <Route path="redirect" element={<GymRedirect />} />

      {/* Rutas protegidas para estudiantes */}
      <Route
        path="student"
        element={
          <ProtectedRoute allowedRoles={[Role.STUDENT]}>
            <StudentDashboardPage />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentIndexPage />} />
        <Route path="home" element={<StudentMainPage />} />
        <Route path="reservations" element={<ReservationsPage />} />
        <Route path="booking" element={<BookingPage />} />
        <Route path="routines" element={<RoutinesPage />} />
        <Route path="progress" element={<RegisterProgressPage />} />
        <Route path="evolution" element={<EvolutionPage />} />
        <Route path="first-register" element={<RegisterMeasurements />} />
        <Route path="body-measurements" element={<BodyMeasurements />} />
      </Route>

      {/* Rutas protegidas para entrenadores */}
      <Route
        path="trainer"
        element={
          <ProtectedRoute allowedRoles={[Role.TRAINER]}>
            <TrainerDashboardPage />
          </ProtectedRoute>
        }
      >
        <Route index element={<TrainerIndexPage />} />
        <Route path="trainerHome" element={<TrainerMainPage />} />
        <Route path="trainer-routines" element={<TrainerRoutinesPage />} />
        <Route path="exercises" element={<ExercisesPage />} />
        <Route path="sessions" element={<SessionsPage />} />
        <Route path="trainer-generate-report" element={<TrainerGenerateReportPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="my-students-progress" element={<MyStudentsProgress />} />
      </Route>

      {/* Ruta para no encontrados */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default GymRoutes;