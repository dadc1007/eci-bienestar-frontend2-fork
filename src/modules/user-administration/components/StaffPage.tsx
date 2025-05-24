import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowLeft, faChartBar, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from "@fortawesome/free-regular-svg-icons";

interface ListItemData {
  id: number;
  name: string;
  email: string;
  role: string;
  isVerified?: boolean;
}

const StaffPage: React.FC = () => {
  const navigate = useNavigate();

  // State & initial load
  const [staff, setStaff] = useState<ListItemData[]>([]);
  useEffect(() => {
    const mockData: ListItemData[] = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `Doctor muelitas ${i + 1}`,
      email: `doctors${i + 1}@example.com`,
      role: `Rol ${(i % 8) + 1}`,
      isVerified: Math.random() < 0.5,
    }));
    setStaff(mockData);
  }, []);

  // Multi-select logic
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const toggleSelect = (id: number) => {
    setSelectedIds(prev => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });
  };
  const handleDeleteSelected = () => {
    if (!selectedIds.size) return;
    if (window.confirm(`¿Eliminar ${selectedIds.size} personal seleccionados?`)) {
      setStaff(prev => prev.filter(s => !selectedIds.has(s.id)));
      setSelectedIds(new Set());
    }
  };

  // Search
  const [query, setQuery] = useState("");
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  };

  // Stats modal
  const [statsStaff, setStatsStaff] = useState<ListItemData | null>(null);
  const openStats = (staff: ListItemData) => setStatsStaff(staff);
  const closeStats = () => setStatsStaff(null);

  // Pagination
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const filtered = staff.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.email.toLowerCase().includes(query.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const displayed = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePrev = () => setCurrentPage(p => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));

  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="text-gray-700 hover:text-gray-900 p-2" title="Regresar">
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </button>
        <h2 className="ml-4 text-4xl font-semibold text-[#b30000]">Personal</h2>
      </div>

      {/* Infobox Description */}
      <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6 text-blue-900">
        <p>
          Usa el buscador para filtrar por nombre o correo, haz clic en cualquier parte de la fila para seleccionar personal<br />
          y emplea los botones para añadir, editar o eliminarlos de forma rápida.
        </p>
      </div>

      {/* Search + Add/Delete buttons */}
      <div className="flex items-center mb-6 space-x-2">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Buscar por nombre o correo... 🔍"
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={() => console.log("Agregar personal")}
          className="text-white bg-blue-600 hover:bg-blue-700 rounded-full w-8 h-8 flex items-center justify-center"
          title="Agregar personal"
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

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto border border-gray-200">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Correo</th>
              <th className="px-4 py-2 text-left">Rol</th>
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
                <td className="px-4 py-2 text-gray-500">{item.role}</td>
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
      {statsStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-1/2">
            <h3 className="text-xl font-semibold mb-4">Estadísticas de {statsStaff.name}</h3>
            <p>Contenido de estadísticas para el personal.</p>
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

export default StaffPage;