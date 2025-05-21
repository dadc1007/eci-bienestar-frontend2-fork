import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
// Páginas de estudiante
import EnrolledClassesPage from './pages/student/enrolledClassesPage';
import AvailableClassesPage from './pages/student/availableClassesPage';
import AttendanceHistoryPage from './pages/student/attendanceHistoryPage';
// Páginas de docente
import ScheduledClassesPage from './pages/teacher/scheduledClassesPage';
import AttendanceRegisterPage from './pages/teacher/attendanceRegisterPage';
// Páginas personal de bienestar y admin
import StatisticsPage from './pages/common/statisticsPage';
import ClassManagementPage from './pages/common/classManagementPage';
import NotificationManagementPage from './pages/admin/notificationManagementPage';

interface AppRoutesProps {
  userRole: 'student' | 'teacher' | 'wellnessStaff' | 'admin';
}

const ExtracurricularClassesRoutes: React.FC<AppRoutesProps> = ({ userRole }) => {
  return (
    <Routes>
      {/* Ruta base que redirige según el rol */}
      <Route index element={<Navigate to={
        userRole === 'student' ? 'estudiante' : 
        userRole === 'teacher' ? 'profesor' : 
        'estadisticas'  // Cambiado de 'bienestar' a 'estadisticas' para wellnessStaff y admin
      } replace />} />
      
      {/* Rutas de estudiante */}
      {userRole === 'student' && (
        <>
          <Route path="estudiante" element={<Navigate to="clases-inscritas" replace />} />
          <Route path="estudiante/clases-inscritas" element={<EnrolledClassesPage />} />
          <Route path="estudiante/clases-disponibles" element={<AvailableClassesPage />} />
          <Route path="estudiante/historial-asistencia" element={<AttendanceHistoryPage />} />
          
          <Route path="clases-inscritas" element={<EnrolledClassesPage />} />
          <Route path="clases-disponibles" element={<AvailableClassesPage />} />
          <Route path="historial-asistencia" element={<AttendanceHistoryPage />} />
        </>
      )}
      
      {/* Rutas de profesor */}
      {userRole === 'teacher' && (
        <>
          <Route path="profesor" element={<Navigate to="clases-programadas" replace />} />
          <Route path="profesor/clases-programadas" element={<ScheduledClassesPage />} />
          <Route path="profesor/registro-de-asistencia" element={<AttendanceRegisterPage />} />
          
          <Route path="clases-programadas" element={<ScheduledClassesPage />} />
          <Route path="registro-de-asistencia" element={<AttendanceRegisterPage />} />
        </>
      )}
      
      {/* Rutas compartidas para wellnessStaff y admin */}
      {(userRole === 'wellnessStaff' || userRole === 'admin') && (
        <>
          {/* Redirige bienestar a estadísticas */}
          <Route path="bienestar" element={<Navigate to="estadisticas" replace />} />
          
          {/* Rutas comunes */}
          <Route path="bienestar/estadisticas" element={<StatisticsPage />} />
          <Route path="bienestar/gestion-de-clases" element={<ClassManagementPage />} />
          
          {/* Rutas directas sin prefijo */}
          <Route path="estadisticas" element={<StatisticsPage />} />
          <Route path="gestion-de-clases" element={<ClassManagementPage />} />
          
          {/* Solo admin tiene acceso a notificaciones */}
          {userRole === 'admin' && (
            <>
              <Route path="bienestar/gestion-de-notificaciones" element={<NotificationManagementPage />} />
              <Route path="gestion-de-notificaciones" element={<NotificationManagementPage />} />
            </>
          )}
        </>
      )}
      
      {/* Ruta de fallback */}
      <Route path="*" element={<Navigate to={
        userRole === 'student' ? 'estudiante' : 
        userRole === 'teacher' ? 'profesor' : 
        'estadisticas'  // Cambiado de 'bienestar' a 'estadisticas' para wellnessStaff y admin
      } replace />} />
    </Routes>
  );
};

export default ExtracurricularClassesRoutes;