import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
// Páginas de estudiante
import EnrolledClassesPage from './pages/student/enrolledClassesPage';
import AvailableClassesPage from './pages/student/availableClassesPage';
import AttendanceHistoryPage from './pages/student/attendanceHistoryPage';
// Páginas de docente
// Páginas de coordinator
// Páginas de admin
interface AppRoutesProps {
  userRole: 'student' | 'teacher' | 'coordinator' | 'admin';
}

const ExtracurricularClassesRoutes: React.FC<AppRoutesProps> = ({ userRole }) => {
  return (
    <Routes>
      {/* Ruta base que redirige según el rol */}
      <Route index element={<Navigate to={userRole === 'student' ? 'estudiante' : userRole} replace />} />
      
      {/* Rutas de estudiante */}
      {userRole === 'student' && (
        <>
          {/* Ruta principal de estudiante que redirige a clases inscritas */}
          <Route path="estudiante" element={<Navigate to="clases-inscritas" replace />} />
          <Route path="estudiante/clases-inscritas" element={<EnrolledClassesPage />} />
          <Route path="estudiante/clases-disponibles" element={<AvailableClassesPage />} />
          <Route path="estudiante/historial-asistencia" element={<AttendanceHistoryPage />} />
          
          {/* Agregar rutas directas sin el prefijo "estudiante/" para compatibilidad con los tabs */}
          <Route path="clases-inscritas" element={<EnrolledClassesPage />} />
          <Route path="clases-disponibles" element={<AvailableClassesPage />} />
          <Route path="historial-asistencia" element={<AttendanceHistoryPage />} />
        </>
      )}
      
      {/* Rutas de profesor */}
      {userRole === 'teacher' && (
        <>
          <Route path="profesor" element={<div>Página de profesor (por implementar)</div>} />
        </>
      )}
      
      {/* Rutas de coordinador */}
      {userRole === 'coordinator' && (
        <>
          <Route path="coordinador" element={<div>Página de coordinador (por implementar)</div>} />
        </>
      )}
      
      {/* Rutas de administrador */}
      {userRole === 'admin' && (
        <>
          <Route path="admin" element={<div>Página de administrador (por implementar)</div>} />
        </>
      )}
      
      {/* Ruta de fallback que redirige según el rol */}
      <Route path="*" element={<Navigate to={userRole === 'student' ? 'estudiante' : userRole} replace />} />
    </Routes>
  );
};

export default ExtracurricularClassesRoutes;