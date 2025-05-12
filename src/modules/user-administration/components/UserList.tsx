import React from "react";

interface ListItemData {
  id: string | number;
  name: string;
  isVerified?: boolean;
}

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
  // Función para obtener la inicial (ya la tenías)
  const getInitial = (name: string): string => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
      {" "}
      {/* Añadido borde y overflow-hidden */}
      {/* Encabezado */}
      <div className="bg-[#990000] rounded-t-lg w-full p-4">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      {/* Lista de elementos */}
      <ul>
        {data.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between border-b border-gray-200 py-3 px-4 last:border-b-0" // Añadido last:border-b-0 para el último elemento
          >
            {/* Parte Izquierda: Inicial y Nombre */}
            <div className="flex items-center">
              {/* Círculo con la Inicial */}
              <div
                className="
                  w-8 h-8 // Tamaño fijo
                  bg-red-200 // Color de fondo claro (similar a la imagen)
                  text-red-800 // Color del texto oscuro
                  rounded-full // Forma circular
                  flex items-center justify-center // Centrar la inicial
                  mr-3 // Margen a la derecha para separar del nombre
                  font-semibold // Texto en negrita
                "
              >
                {getInitial(item.name)} {/* Muestra la inicial */}
              </div>
              {/* Nombre */}
              <span className="text-gray-800">{item.name}</span>{" "}
              {/* Muestra el nombre */}
            </div>

            {/* Parte Derecha: Botones de acción */}
            <div className="flex items-center space-x-3">
              {" "}
              {/* Espacio entre iconos */}
              {/* Icono de Check/Verificado */}
              {/* Moví este primero para que el orden sea similar a la imagen: Check, Edit, Delete */}
              <button
                onClick={() => onToggleVerification(item)}
                className={`
                  text-red-600 hover:text-red-800 p-1 // Usando un color rojo similar para los iconos
                `}
                title={item.isVerified ? "Desverificar" : "Verificar"}
              >
                {item.isVerified ? "✅" : "⬜"}{" "}
                {/* Puedes usar SVGs si prefieres iconos */}
              </button>
              {/* Icono de Editar */}
              <button
                onClick={() => onEdit(item)}
                className="text-red-600 hover:text-red-800 p-1" // Color rojo
                title="Editar"
              >
                ✏️ {/* Puedes usar SVGs */}
              </button>
              {/* Icono de Eliminar */}
              <button
                onClick={() => onDelete(item)}
                className="text-red-600 hover:text-red-800 p-1" // Color rojo
                title="Eliminar"
              >
                🗑️ {/* Puedes usar SVGs */}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Mensaje si no hay datos */}
      {data.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          {" "}
          {/* Ajustado padding */}
          No hay datos disponibles.
        </p>
      )}
    </div>
  );
};

export default UserList;
