import React, { useState, useEffect } from "react";
import UserList from "./components/UserList";
import apiClient from "../../common/services/apiCliend";

interface UserData {
  id: string | number;
  name: string;
}

const AdminUsers: React.FC = () => {
  const [students, setStudents] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const studentsResponse = await Promise.all([
          apiClient.get<UserData[]>(`/users-controll/users`),
        ]);

        setStudents(studentsResponse.flatMap((response) => response.data));
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

  const handleEdit = (item: UserData) => {
    console.log("Editar usuario:", item);
  };

  const handleToggleVerification = async (item: UserData) => {
    console.log("Cambiar estado de verificación para:", item);
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

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p>Cargando datos de usuarios...</p>
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UserList
          title="Estudiantes"
          data={students} // Pasa los datos del estado
          onEdit={handleEdit}
          onToggleVerification={handleToggleVerification}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AdminUsers;
