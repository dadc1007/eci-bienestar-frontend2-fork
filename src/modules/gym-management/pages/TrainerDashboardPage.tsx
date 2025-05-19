import { Routes, Route } from "react-router-dom";
import GymNavbarTrainer from "../components/GymNavBarTrainer";
import TrainerMainPage from "../pages/trainer/TrainerMainPage";
import TrainerRoutinesPage from "../pages/trainer/TrainerRoutinesPage";
import ExercisesPage from "../pages/trainer/ExercisesPage";
import SessionsPage from "../pages/trainer/SessionsPage";
import TrainerGenerateReportPage from "./trainer/TrainerGenerateReportPage.tsx";
import ProgressPage from "../pages/trainer/ProgressPage";

const TrainerDashboardPage = () => {
  return (
    <Routes>
      <Route path="/" element={<GymNavbarTrainer />}>
        <Route index element={<TrainerMainPage />} />
        <Route path="trainer-routines" element={<TrainerRoutinesPage />} />
        <Route path="exercises" element={<ExercisesPage />} />
        <Route path="sessions" element={<SessionsPage />} />
        <Route path="trainer-generate-report" element={<TrainerGenerateReportPage />} />
        <Route path="progress" element={<ProgressPage />} />
      </Route>
    </Routes>
  );
};

export default TrainerDashboardPage;