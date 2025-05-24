import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowLeft, faChartBar, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from "@fortawesome/free-regular-svg-icons";

interface ListItemData {
  id: string;           
  name: string;         
  email: string;        
  isVerified: boolean;  
}

const TeachersPage: React.FC = () => {
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState<ListItemData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const API_URL = "https://suoeltmtp2.execute-api.us-east-1.amazonaws.com/users-controll/users/by-role/TEACHER";

    setLoading(true);
    setError(null);



  fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Si necesitas autorización, añade aquí:
        // "Authorization": `Bearer ${token}`
      }
    })
      .then(async (res) => {
        if (!res.ok) {
          // Si el servidor responde con error, leemos el texto y lanzamos excepción
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text}`);
        }
        return res.json();
      })
      .then((data: Array<{
        id: string;
        idType: string;
        fullName: string;
        phone: string;
        email: string;
        role: string;
        active: boolean;
      }>) => {
        // Mapear cada objeto JSON a nuestro ListItemData
        const mapped: ListItemData[] = data.map((u) => ({
          id: u.id,
          name: u.fullName,
          email: u.email,
          isVerified: u.active
        }));
        setTeacher(mapped);
      })
      .catch((err: Error) => {
        console.error("Error al obtener profesores:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // arreglo de dependencias vacío → se ejecuta solo una vez

  //
  // 4) Mostrar mensajes de carga o error si corresponde:
  //
  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <p className="text-gray-700 text-center">Cargando profesores…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <p className="text-red-600 text-center">Error: {error}</p>
      </div>
    );
  }

  //
  // 5) El resto del componente (sin simulación de datos) permanece igual:
  //

  // Lógica de multiselección
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });
  };
  const handleDeleteSelected = () => {
    if (!selectedIds.size) return;
    if (window.confirm(`¿Eliminar ${selectedIds.size} profesores seleccionados?`)) {
      setTeacher(prev => prev.filter(s => !selectedIds.has(s.id)));
      setSelectedIds(new Set());
    }
  };

  // Búsqueda
  const [query, setQuery] = useState("");
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  };

  // Modal de estadísticas
  const [statsTeacher, setStatsTeacher] = useState<ListItemData | null>(null);
  const openStats = (t: ListItemData) => setStatsTeacher(t);
  const closeStats = () => setStatsTeacher(null);

  // Paginación
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const filtered = teacher.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.email.toLowerCase().includes(query.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const displayed = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePrev = () => setCurrentPage(p => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));

  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  //
  // 6) Renderizado final de la tabla:
  //
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="text-gray-700 hover:text-gray-900 p-2" title="Regresar">
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </button>
        <h2 className="ml-4 text-4xl font-semibold text-[#b30000]">Profesores</h2>
      </div>

      {/* Infobox Descripción */}
      <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6 text-blue-900">
        <p>
          Usa el buscador para filtrar por nombre o correo, haz clic en cualquier parte de la fila para seleccionar profesores<br />
          y emplea los botones para añadir, editar o eliminarlos de forma rápida.
        </p>
      </div>

      {/* Búsqueda + Botones de Agregar/Eliminar */}
      <div className="flex items-center mb-6 space-x-2">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Buscar por nombre o correo... 🔍"
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={() => console.log("Agregar profesores")}
          className="text-white bg-blue-600 hover:bg-blue-700 rounded-full w-8 h-8 flex items-center justify-center"
          title="Agregar profesores"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button
          onClick={handleDeleteSelected}
          disabled={!selectedIds.size}
          className="text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center disabled:opacity-50"
          title="Eliminar seleccionados"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow overflow-x-auto border border-gray-200">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Correo</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map(item => (
              <tr
                key={item.id}
                className={`border-b hover:bg-gray-50 cursor-pointer ${selectedIds.has(item.id) ? 'bg-red-100' : ''}`}
                onClick={() => toggleSelect(item.id)}
              >
                <td className="px-4 py-2 text-gray-500">{item.id}</td>
                <td className="px-4 py-2 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-red-200 text-red-800 rounded-full flex items-center justify-center font-semibold">
                    {getInitial(item.name)}
                  </div>
                  <span className="font-medium text-gray-800">{item.name}</span>
                </td>
                <td className="px-4 py-2 text-gray-500">{item.email}</td>
                <td className="px-4 py-2 flex items-center space-x-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); console.log("Editar:", item); }}
                    className="text-gray-600 hover:text-gray-800 p-1.5 hover:bg-gray-100 rounded"
                    title="Editar"
                  >
                    <FontAwesomeIcon icon={faEdit} size="lg" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); openStats(item); }}
                    className="text-green-600 hover:text-green-800 p-1.5 hover:bg-gray-100 rounded"
                    title="Estadísticas"
                  >
                    <FontAwesomeIcon icon={faChartBar} size="lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-4">No hay datos disponibles.</p>
        )}

        {filtered.length > itemsPerPage && (
          <div className="flex justify-center items-center space-x-4 p-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {statsTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-1/2">
            <h3 className="text-xl font-semibold mb-4">Estadísticas de {statsTeacher.name}</h3>
            <p>Contenido de estadísticas para el profesor.</p>
            <button
              onClick={closeStats}
              className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            >Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeachersPage;