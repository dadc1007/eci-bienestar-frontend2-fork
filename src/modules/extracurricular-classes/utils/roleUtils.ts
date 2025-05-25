// Tipos de roles en extraclases 
export type AppRole = 'student' | 'teacher' | 'wellnessStaff' | 'admin';

// Roles válidos del backend
export type BackendRole = 'ADMINISTRATOR' | 'WELLNESS_STAFF' | 'STUDENT' | 'TEACHER';

// Función para mapear roles del backend a roles en extraclases
export const mapBackendRoleToAppRole = (backendRole: string): AppRole | null => {
  switch (backendRole) {
    case 'ADMINISTRATOR':
      return 'admin';
    case 'WELLNESS_STAFF':
      return 'wellnessStaff';
    case 'STUDENT':
      return 'student';
    case 'TEACHER':
      return 'teacher';
    default:
      return null;
  }
};

// Función para verificar si es administrador
export const isAdministrator = (backendRole: string): boolean => {
  return backendRole === 'ADMINISTRATOR';
};