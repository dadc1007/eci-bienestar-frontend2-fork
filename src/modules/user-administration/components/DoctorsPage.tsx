// src/modules/user-administration/components/DoctorsPage.tsx

import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faArrowLeft,
  faChartBar,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import apiClient from "../../../common/services/apiCliend";

interface DoctorData {
  id: string;         // en tu backend es string (p. ej. "2231334")
  idType: string;     // ej. "ANI" o "CC"
  fullName: string;
  phone: string;
  email: string;
  role: string;       // siempre "MEDICAL_STAFF"
  specialty: string;
  active: boolean;
}

const DoctorsPage: React.FC = () => {
  const navigate = useNavigate();

  // ——————— States principales ———————
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Multi‐select
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Búsqueda
  const [query, setQuery] = useState<string>("");

  // Paginación
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Modal de estadísticas
  const [statsDoctor, setStatsDoctor] = useState<DoctorData | null>(null);

  // ——————— Cargar lista de doctores desde backend (MEDICAL_STAFF) ———————
  const fetchDoctors = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("authToken") || "";
      const resp = await apiClient.get<DoctorData[]>(
        "/users-controll/users/by-role/MEDICAL_STAFF",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDoctors(resp.data);
    } catch (e: any) {
      console.error("Error cargando doctores:", e);
      setError(
        e.response?.data?.message ||
          "No se pudo cargar la lista de doctores. Intenta recargar."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // ——————— Lógica de multi‐selección en la tabla ———————
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });
  };

  // ——————— Eliminar múltiples seleccionados ———————
  const handleDeleteSelected = async () => {
    if (selectedIds.size === 0) return;
    if (
      !window.confirm(
        `¿Estás seguro de eliminar ${selectedIds.size} ${
          selectedIds.size > 1 ? "doctores" : "doctor"
        }?`
      )
    ) {
      return;
    }

    setLoading(true);
    setError("");

    const token = localStorage.getItem("authToken") || "";
    try {
      // Borrar uno a uno
      for (const id of selectedIds) {
        await apiClient.delete(`/users-controll/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      // Refrescar lista y limpiar selección
      await fetchDoctors();
      setSelectedIds(new Set());
    } catch (e: any) {
      console.error("Error eliminando doctores:", e);
      setError(
        e.response?.data?.message || "Error al eliminar. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  // ——————— Agregar un nuevo médico ———————
  // Para simplificar, pedimos datos con `prompt`. En producción sería mejor un modal/form completo.
  const handleAddDoctor = async () => {
    // Obtener datos básicos
    const id = prompt("ID del nuevo doctor (sin espacios):", "");
    if (!id) return;

    const idType = prompt("Tipo de documento (ej. CC, ANI):", "");
    if (!idType) return;

    const fullName = prompt("Nombre completo del doctor:", "");
    if (!fullName) return;

    const email = prompt("Email:", "");
    if (!email) return;

    const phone = prompt("Teléfono (solo números):", "");
    if (!phone) return;

    const specialty = prompt("Especialidad (ej. GENERAL_MEDICINE):", "");
    if (!specialty) return;

    const password = prompt("Contraseña temporal para el doctor:", "");
    if (!password) return;

    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("authToken") || "";
      // POST a /staff para crear el médico
      await apiClient.post(
        "/staff",
        {
          id,
          idType,
          fullName,
          phone,
          email,
          role: "MEDICAL_STAFF",
          password,
          specialty,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Refrescar lista
      await fetchDoctors();
    } catch (e: any) {
      console.error("Error creando doctor:", e);
      setError(
        e.response?.data?.message ||
          "No se pudo crear el doctor. Revisa los datos e inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  // ——————— Editar un médico existente ———————
  const handleEditDoctor = async (doctor: DoctorData) => {
    // Pedimos solo algunos campos modificables (nombre, email, phone, specialty)
    const newFullName = prompt(
      "Nuevo nombre completo:",
      doctor.fullName
    );
    if (newFullName === null) return;

    const newEmail = prompt("Nuevo email:", doctor.email);
    if (newEmail === null) return;

    const newPhone = prompt("Nuevo teléfono:", doctor.phone);
    if (newPhone === null) return;

    const newSpecialty = prompt(
      "Nueva especialidad:",
      doctor.specialty
    );
    if (newSpecialty === null) return;

    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("authToken") || "";
      // PUT a /users/{id} para actualizar
      await apiClient.put(
        `/users-controll/users/${doctor.id}`,
        {
          id: doctor.id,
          idType: doctor.idType,
          fullName: newFullName,
          phone: newPhone,
          email: newEmail,
          role: doctor.role, // debería seguir “MEDICAL_STAFF”
          password: undefined, // no cambiamos contraseña aquí
          specialty: newSpecialty,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await fetchDoctors();
    } catch (e: any) {
      console.error("Error actualizando doctor:", e);
      setError(
        e.response?.data?.message ||
          "No se pudo actualizar al doctor. Revisa los datos e inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  // ——————— Eliminar un solo médico ———————
  const handleDeleteDoctor = async (id: string) => {
    if (!window.confirm("¿Eliminar este doctor?")) return;
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("authToken") || "";
      await apiClient.delete(`/users-controll/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchDoctors();
      setSelectedIds((prev) => {
        const copy = new Set(prev);
        copy.delete(id);
        return copy;
      });
    } catch (e: any) {
      console.error("Error eliminando doctor:", e);
      setError(
        e.response?.data?.message ||
          "No se pudo eliminar al doctor. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  // ——————— Filtrado local (buscador) ———————
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  };
  const filtered = doctors.filter(
    (d) =>
      d.fullName.toLowerCase().includes(query.toLowerCase()) ||
      d.email.toLowerCase().includes(query.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const displayed = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () =>
    setCurrentPage((p) => Math.min(totalPages, p + 1));

  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  // ——————— Modal de estadísticas ———————
  const openStats = (doctor: DoctorData) => setStatsDoctor(doctor);
  const closeStats = () => setStatsDoctor(null);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header con botón regresar */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-700 hover:text-gray-900 p-2"
          title="Regresar"
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </button>
        <h2 className="ml-4 text-4xl font-semibold text-[#b30000]">
          Doctores
        </h2>
      </div>

      {/* Info box */}
      <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6 text-blue-900">
        <p>
          Usa el buscador para filtrar por nombre o correo. Haz clic en
          cualquier fila para seleccionarla. Emplea los botones para
          añadir, editar o eliminarlos.
        </p>
      </div>

      {/* Barra de búsqueda + botones */}
      <div className="flex items-center mb-6 space-x-2">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Buscar por nombre o correo... 🔍"
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleAddDoctor}
          className="text-white bg-blue-600 hover:bg-blue-700 rounded-full w-8 h-8 flex items-center justify-center"
          title="Agregar doctor"
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

      {/* Mensaje de error o loading */}
      {error && (
        <p className="text-red-600 mb-4 font-medium text-sm">{error}</p>
      )}
      {loading && <p className="text-gray-600 mb-4">Cargando...</p>}

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow overflow-x-auto border border-gray-200">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Correo</th>
              <th className="px-4 py-2 text-left">Especialidad</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((doc) => (
              <tr
                key={doc.id}
                className={`border-b hover:bg-gray-50 cursor-pointer ${
                  selectedIds.has(doc.id) ? "bg-red-100" : ""
                }`}
                onClick={() => toggleSelect(doc.id)}
              >
                <td className="px-4 py-2 text-gray-500">{doc.id}</td>
                <td className="px-4 py-2 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-red-200 text-red-800 rounded-full flex items-center justify-center font-semibold">
                    {getInitial(doc.fullName)}
                  </div>
                  <span className="font-medium text-gray-800">
                    {doc.fullName}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-500">{doc.email}</td>
                <td className="px-4 py-2 text-gray-500">
                  {doc.specialty}
                </td>
                <td className="px-4 py-2 flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditDoctor(doc);
                    }}
                    className="text-gray-600 hover:text-gray-800 p-1.5 hover:bg-gray-100 rounded"
                    title="Editar"
                  >
                    <FontAwesomeIcon icon={faEdit} size="lg" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openStats(doc);
                    }}
                    className="text-green-600 hover:text-green-800 p-1.5 hover:bg-gray-100 rounded"
                    title="Estadísticas"
                  >
                    <FontAwesomeIcon icon={faChartBar} size="lg" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDoctor(doc.id);
                    }}
                    className="text-red-600 hover:text-red-800 p-1.5 hover:bg-gray-100 rounded"
                    title="Eliminar este doctor"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Si no hay resultados tras filtrar */}
        {filtered.length === 0 && !loading && (
          <p className="text-center text-gray-500 py-4">
            No hay datos disponibles.
          </p>
        )}

        {/* Paginación */}
        {filtered.length > itemsPerPage && (
          <div className="flex justify-center items-center space-x-4 p-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
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

      {/* Modal de estadísticas (vacío, a completar luego) */}
      {statsDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-1/2">
            <h3 className="text-xl font-semibold mb-4">
              Estadísticas de {statsDoctor.fullName}
            </h3>
            <p>
              Aquí irían las gráficas o datos concretos de ese doctor. Queda
              pendiente implementar la lógica de “estadísticas”.
            </p>
            <button
              onClick={closeStats}
              className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
