import React from "react";
// Importa tus componentes de iconos reales si los tienes
// import { FaEdit, FaCheckCircle, FaRegCircle, FaTrashAlt } from 'react-icons/fa';

// Define la interfaz para un item de la lista (puede estar en otro archivo si se reutiliza)
interface ListItemData {
  id: string | number;
  name: string;
  isVerified?: boolean;
  // ... otras propiedades
}

// Define las props para el componente de lista
interface UserListProps {
  title: string;
  data: ListItemData[];
  onEdit: (item: ListItemData) => void;
  onToggleVerification: (item: ListItemData) => void;
  onDelete: (item: ListItemData) => void;
}

const UserList: React.FC<UserListProps> = ({
  title,
  data,
  onEdit,
  onToggleVerification,
  onDelete,
}) => {
  // Función auxiliar para obtener la inicial del nombre
  const getInitial = (name: string): string => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {" "}
      {/* Contenedor con estilos de tarjeta */}
      <h2 className="text-xl font-semibold mb-4 text-gray-700">{title}</h2>
      <ul>
        {data.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between border-b border-gray-200 py-3"
          >
            {/* Parte Izquierda: Inicial y Nombre */}
            <div className="flex items-center">
              {/* Círculo con la inicial */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold text-white ${
                  item.isVerified ? "bg-green-500" : "bg-gray-400" // Ejemplo de color basado en estado
                }`}
              >
                {getInitial(item.name)}
              </div>
              <span className="text-gray-800">{item.name}</span>
            </div>

            {/* Parte Derecha: Iconos de Acción */}
            <div className="flex items-center space-x-3">
              {/* Icono de Editar */}
              <button
                onClick={() => onEdit(item)}
                className="text-blue-600 hover:text-blue-800"
              >
                {/* Reemplazar con tu componente de icono FaEdit */}
                ✏️
              </button>
              {/* Icono de Check/Verificado */}
              <button
                onClick={() => onToggleVerification(item)}
                className={`
                  ${item.isVerified ? "text-green-600" : "text-gray-400"}
                  hover:text-green-800
              `}
              >
                {/* Reemplazar con tu componente de icono FaCheckCircle o FaRegCircle */}
                {item.isVerified ? "✅" : "⬜"}
              </button>
              {/* Icono de Eliminar */}
              <button
                onClick={() => onDelete(item)}
                className="text-red-600 hover:text-red-800"
              >
                {/* Reemplazar con tu componente de icono FaTrashAlt */}
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Mensaje si la lista está vacía */}
      {data.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No hay datos disponibles.
        </p>
      )}
    </div>
  );
};

export default UserList;
