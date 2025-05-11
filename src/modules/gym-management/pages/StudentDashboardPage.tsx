import { Routes, Route } from "react-router-dom";
import GymNavbarStudent from "../components/GymNavBarStudent";
import StudentMainPage from "../pages/student/StudentMainPage";
import ReservationsPage from "../pages/student/ReservationsPage";
import BookingPage from "../pages/student/BookingPage";
import RoutinesPage from "../pages/student/RoutinesPage";
import RegisterProgressPage from "../pages/student/RegisterProgressPage";
import EvolutionPage from "../pages/student/EvolutionPage";

const StudentDashboardPage = () => {
  return (
    <Routes>
      <Route path="/" element={<GymNavbarStudent />}>
        <Route index element={<StudentMainPage />} />
        <Route path="reservations" element={<ReservationsPage />} />
        <Route path="booking" element={<BookingPage />} />
        <Route path="routines" element={<RoutinesPage />} />
        <Route path="progress" element={<RegisterProgressPage />} />
        <Route path="evolution" element={<EvolutionPage />} />
      </Route>
    </Routes>
  );
};

export default StudentDashboardPage;