import React, { useState, useEffect } from "react";
import UserList from "./components/UserList";
import apiClient from "../../common/services/apiCliend";

interface UserData {
  id: string | number;
  name: string;
}

const AdminUsers: React.FC = () => {
  const [students, setStudents] = useState<UserData[]>([]);
  const [professors, setProfessors] = useState<UserData[]>([]);
  const [staff, setStaff] = useState<UserData[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [studentsResponse, professorsResponse, staffResponse] =
          await Promise.all([
            apiClient.get<UserData[]>(`/users/by-role/?role=STUDENT`),
            apiClient.get<UserData[]>(`/users/by-role/?role=TRAINER`),
            apiClient.get<UserData[]>(`/users/by-role/?role=PREFECT`),
          ]);

        setStudents(studentsResponse.data);
        setProfessors(professorsResponse.data);
        setStaff(staffResponse.data);
      } catch (err: any) {
        console.error("Error fetching users:", err);
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.message || "Error al cargar los datos de usuarios.");
        } else {
          setError("Ocurrió un error inesperado al cargar los datos.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // --- Funciones para manejar acciones (editar, verificar, eliminar) ---
  // En un escenario real, estas funciones harían llamadas a la API para realizar las acciones
  const handleEdit = (item: UserData) => {
    console.log("Editar usuario:", item);
    // Aquí implementarías la lógica para editar, como abrir un modal/formulario
  };

  const handleToggleVerification = async (item: UserData) => {
    console.log("Cambiar estado de verificación para:", item);
    // Aquí implementarías la llamada a la API para actualizar el estado de verificación
    // try {
    //   await axios.patch(`${API_BASE_URL}/users/${item.id}/toggle-verification`);
    //   // Si la API responde exitosamente, actualiza el estado local
    //   // Dependiendo del tipo de usuario, actualiza el estado correcto (students, professors, o staff)
    //   // Por ejemplo, si sabes que el item es un estudiante:
    //   // setStudents(students.map(s => s.id === item.id ? { ...s, isVerified: !s.isVerified } : s));
    //   console.log('Estado de verificación actualizado.');
    // } catch (err) {
    //   console.error('Error al actualizar verificación:', err);
    //   alert('Hubo un error al actualizar el estado de verificación.');
    // }
  };

  const handleDelete = async (item: UserData) => {
    console.log("Eliminar usuario:", item);
    if (
      window.confirm(`¿Estás seguro de que quieres eliminar a ${item.name}?`)
    ) {
      try {
        // Aquí implementarías la llamada a la API para eliminar el usuario
        // await axios.delete(`${API_BASE_URL}/users/${item.id}`);
        // Después de una respuesta exitosa, actualiza el estado para eliminar el item de la lista correspondiente
        // setStudents(students.filter(s => s.id !== item.id));
        // (Haz lo mismo para professors y staff si el item pertenece a esas listas)
        console.log(`${item.name} eliminado exitosamente.`);
      } catch (err) {
        console.error("Error al eliminar usuario:", err);
        alert("Hubo un error al eliminar el usuario.");
      }
    }
  };
  // --- Fin de funciones de acción ---

  // --- Lógica de Renderizado (el "main" del componente) ---
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p>Cargando datos de usuarios...</p>
        {/* Puedes añadir un spinner o animación de carga */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>{error}</p>
        <p>No se pudieron cargar los datos de usuarios.</p>
      </div>
    );
  }

  // Si no hay carga ni error, muestra las listas usando el componente UserList
  return (
    <div className="container mx-auto px-4 py-8">
      {/* El título principal "Gestión Administrativa de Usuarios" */}
      {/* Podría estar aquí o dentro del Layout si quieres que siempre aparezca de la misma forma */}
      {/* <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión Administrativa de Usuarios</h1> */}

      {/* Contenedor para las columnas usando grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Lista de Estudiantes */}
        <UserList
          title="Estudiantes"
          data={students} // Pasa los datos del estado
          onEdit={handleEdit}
          onToggleVerification={handleToggleVerification}
          onDelete={handleDelete}
        />

        {/* Lista de Profesores */}
        <UserList
          title="Profesores"
          data={professors} // Pasa los datos del estado
          onEdit={handleEdit}
          onToggleVerification={handleToggleVerification}
          onDelete={handleDelete}
        />

        {/* Lista de Funcionarios */}
        <UserList
          title="Funcionarios"
          data={staff} // Pasa los datos del estado
          onEdit={handleEdit}
          onToggleVerification={handleToggleVerification}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AdminUsers;
