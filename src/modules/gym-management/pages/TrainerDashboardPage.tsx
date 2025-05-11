import { Routes, Route } from "react-router-dom";
import GymNavbarTrainer from "../components/GymNavBarTrainer";
import TrainerMainPage from "../pages/trainer/TrainerMainPage";
import TrainerRoutinesPage from "../pages/trainer/TrainerRoutinesPage";
import ExercisesPage from "../pages/trainer/ExercisesPage";
import SessionsPage from "../pages/trainer/SessionsPage";
import TrainerReservationsPage from "../pages/trainer/TrainerReservationsPage";
import ProgressPage from "../pages/trainer/ProgressPage";

const TrainerDashboardPage = () => {
  return (
    <Routes>
      <Route path="/" element={<GymNavbarTrainer />}>
        <Route index element={<TrainerMainPage />} />
        <Route path="routines" element={<TrainerRoutinesPage />} />
        <Route path="exercises" element={<ExercisesPage />} />
        <Route path="sessions" element={<SessionsPage />} />
        <Route path="reservations" element={<TrainerReservationsPage />} />
        <Route path="progress" element={<ProgressPage />} />
      </Route>
    </Routes>
  );
};

export default TrainerDashboardPage;