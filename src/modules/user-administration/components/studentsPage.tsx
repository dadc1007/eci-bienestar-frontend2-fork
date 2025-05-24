import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
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

/**
 * Shape of what GET /api/students returns
 */
interface StudentFromApi {
  id: string;
  idType: string;
  fullName: string;
  phone: string;
  email: string;
  role: string;
  active: boolean;
  studentCode: string;
  program: string;
  semester: number;
  birthDate: string;
  address: string;
  emergencyContact: {
    id: number;
    fullName: string;
    phone: string;
    idType: string;
    idNumber: string;
    relationship: string;
  };
}

/**
 * What we actually render in the table
 */
interface ListItemData {
  id: number;
  name: string;
  email: string;
  semester: string;
  isVerified?: boolean;
}

const StudentsPage: React.FC = () => {
  const navigate = useNavigate();

  // --- State for listing students ---
  const [students, setStudents] = useState<ListItemData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // --- State for selection / deletion ---
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // --- Search & pagination ---
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // --- Modal state for “Add Student” ---
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // --- Emergency contact form fields ---
  const [ecFullName, setEcFullName] = useState("");
  const [ecPhone, setEcPhone] = useState("");
  const [ecIdType, setEcIdType] = useState("ANI");
  const [ecIdNumber, setEcIdNumber] = useState("");
  const [ecRelationship, setEcRelationship] = useState("AUNT");

  // --- Student form fields ---
  const [stuId, setStuId] = useState("");
  const [stuIdType, setStuIdType] = useState("ANI");
  const [stuFullName, setStuFullName] = useState("");
  const [stuPhone, setStuPhone] = useState("");
  const [stuEmail, setStuEmail] = useState("");
  const [stuRole, setStuRole] = useState("ADMINISTRATOR");
  const [stuPassword, setStuPassword] = useState("");
  const [stuCode, setStuCode] = useState("");
  const [stuProgram, setStuProgram] = useState("SOFTWARE_ENGINEERING");
  const [stuSemester, setStuSemester] = useState<number>(1);
  const [stuBirthDate, setStuBirthDate] = useState("");
  const [stuAddress, setStuAddress] = useState("");

  // --- Fetch all students on mount ---
  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const resp = await apiClient.get<StudentFromApi[]>(
          "/users-controll/students"
        );
        const dataFromApi = resp.data;
        const mapped: ListItemData[] = dataFromApi.map((stu) => ({
          id: Number(stu.id),
          name: stu.fullName,
          email: stu.email,
          semester: `${stu.semester}° Semestre`,
          isVerified: stu.active,
        }));
        setStudents(mapped);
      } catch (err) {
        console.error("Error loading students:", err);
        setError("Could not load students. Try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // --- Selection toggle ---
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });
  };

  // --- Handle “Delete Selected” (local only) ---
  const handleDeleteSelected = () => {
    if (!selectedIds.size) return;
    if (window.confirm(`Delete ${selectedIds.size} selected student(s)?`)) {
      setStudents((prev) => prev.filter((s) => !selectedIds.has(s.id)));
      setSelectedIds(new Set());
      // TODO: if you want to actually DELETE from backend, loop over IDs and call DELETE /api/students/{id}
    }
  };

  // --- Search filter & pagination logic ---
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  };

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.email.toLowerCase().includes(query.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const displayed = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  // --- Open/close modal ---
  const openAddModal = () => {
    // Reset all form fields
    setFormError(null);
    setEcFullName("");
    setEcPhone("");
    setEcIdType("ANI");
    setEcIdNumber("");
    setEcRelationship("AUNT");
    setStuId("");
    setStuIdType("ANI");
    setStuFullName("");
    setStuPhone("");
    setStuEmail("");
    setStuRole("ADMINISTRATOR");
    setStuPassword("");
    setStuCode("");
    setStuProgram("SOFTWARE_ENGINEERING");
    setStuSemester(1);
    setStuBirthDate("");
    setStuAddress("");
    setShowAddModal(true);
  };
  const closeAddModal = () => {
    setShowAddModal(false);
  };

  // --- Handle form submit: first create EC, then student ---
  const handleAddStudent = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    // 1) Build emergency-contact payload
    const ecPayload = {
      fullName: ecFullName.trim(),
      phone: ecPhone.trim(),
      idType: ecIdType,
      idNumber: ecIdNumber.trim(),
      relationship: ecRelationship,
    };

    // Basic front‐end validation
    if (!ecPayload.fullName || !ecPayload.phone || !ecPayload.idNumber) {
      setFormError("Please fill in all emergency-contact fields.");
      setIsSubmitting(false);
      return;
    }

    // 2) Check token
    const token = localStorage.getItem("authToken");
    if (!token) {
      setFormError("No se encontró token. Vuelve a iniciar sesión.");
      setIsSubmitting(false);
      return;
    }

    // 3) POST /users-controll/emergency-contacts (create EC)
    let createdECid: number;
    try {
      const ecResp = await apiClient.post<
        {
          id: number;
          fullName: string;
          phone: string;
          idType: string;
          idNumber: string;
          relationship: string;
        }
      >(
        "/users-controll/emergency-contacts",
        ecPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      createdECid = ecResp.data.id;
    } catch (err) {
      console.error("Error creating emergency contact:", err);
      setFormError(
        "Could not create emergency contact. Check data, token and try again."
      );
      setIsSubmitting(false);
      return;
    }

    // 4) Build student payload
    const stuPayload = {
      id: stuId.trim(),
      idType: stuIdType,
      fullName: stuFullName.trim(),
      phone: stuPhone.trim(),
      email: stuEmail.trim(),
      role: stuRole,
      password: stuPassword,
      studentCode: stuCode.trim(),
      program: stuProgram,
      semester: stuSemester,
      birthDate: stuBirthDate, // e.g. "2000-05-20"
      address: stuAddress.trim(),
      emergencyContactId: createdECid,
    };

    // Basic front‐end validation
    if (
      !stuPayload.id ||
      !stuPayload.fullName ||
      !stuPayload.email ||
      !stuPayload.password
    ) {
      setFormError("Please fill in all required student fields.");
      setIsSubmitting(false);
      return;
    }

    // 5) POST /users-controll/students (create Student)
    let newStudent: StudentFromApi;
    try {
      const stuResp = await apiClient.post<StudentFromApi>(
        "/users-controll/students",
        stuPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      newStudent = stuResp.data;
    } catch (err: any) {
      console.error("Error creating student:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setFormError(err.response.data.message);
      } else {
        setFormError(
          "Could not create student. Check data, token or permissions."
        );
      }
      setIsSubmitting(false);
      return;
    }

    // 6) Map the newly returned student into ListItemData and append
    const mappedItem: ListItemData = {
      id: Number(newStudent.id),
      name: newStudent.fullName,
      email: newStudent.email,
      semester: `${newStudent.semester}° Semestre`,
      isVerified: newStudent.active,
    };
    setStudents((prev) => [mappedItem, ...prev]);

    // 7) Close modal & reset submitting state
    setIsSubmitting(false);
    setShowAddModal(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* --- Header --- */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-700 hover:text-gray-900 p-2"
          title="Go Back"
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </button>
        <h2 className="ml-4 text-4xl font-semibold text-[#b30000]">
          Estudiantes
        </h2>
      </div>

      {/* --- Infobox --- */}
      <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6 text-blue-900">
        <p>
          Usa el buscador para filtrar por nombre o correo electrónico. 
          Haz clic en cualquier fila para seleccionar estudiantes. 
          Usa los botones para añadir, editar o eliminar rápidamente.
        </p>
      </div>

      {/* --- Loading / Error --- */}
      {isLoading && (
        <p className="text-center text-gray-700 py-4">
          Cargando estudiantes...
        </p>
      )}
      {error && (
        <p className="text-center text-red-600 py-4">{error}</p>
      )}

      {/* --- Search + Add/Delete --- */}
      <div className="flex items-center mb-6 space-x-2">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Busca por nombre o correo… 🔍"
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={openAddModal}
          className="text-white bg-blue-600 hover:bg-blue-700 rounded-full w-8 h-8 flex items-center justify-center"
          title="Add Student"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button
          onClick={handleDeleteSelected}
          disabled={!selectedIds.size}
          className="text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center disabled:opacity-50"
          title="Delete Selected"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>

      {/* --- Student Table --- */}
      <div className="bg-white rounded-lg shadow overflow-x-auto border border-gray-200">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Correo</th>
              <th className="px-4 py-2 text-left">Semestre</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((item) => (
              <tr
                key={item.id}
                className={`border-b hover:bg-gray-50 cursor-pointer ${
                  selectedIds.has(item.id) ? "bg-red-100" : ""
                }`}
                onClick={() => toggleSelect(item.id)}
              >
                <td className="px-4 py-2 text-gray-500">
                  {item.id}
                </td>
                <td className="px-4 py-2 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-red-200 text-red-800 rounded-full flex items-center justify-center font-semibold">
                    {getInitial(item.name)}
                  </div>
                  <span className="font-medium text-gray-800">
                    {item.name}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-500">
                  {item.email}
                </td>
                <td className="px-4 py-2 text-gray-500">
                  {item.semester}
                </td>
                <td className="px-4 py-2 flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Edit:", item);
                    }}
                    className="text-gray-600 hover:text-gray-800 p-1.5 hover:bg-gray-100 rounded"
                    title="Edit"
                  >
                    <FontAwesomeIcon icon={faEdit} size="lg" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Show stats for ${item.name}`);
                    }}
                    className="text-green-600 hover:text-green-800 p-1.5 hover:bg-gray-100 rounded"
                    title="Stats"
                  >
                    <FontAwesomeIcon icon={faChartBar} size="lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && !isLoading && (
          <p className="text-center text-gray-500 py-4">
            No data available.
          </p>
        )}

        {filtered.length > itemsPerPage && (
          <div className="flex justify-center items-center space-x-4 p-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* --- Add Student Modal --- */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-3/4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-semibold mb-4">
              Add New Student
            </h3>
            <form onSubmit={handleAddStudent} className="space-y-6">
              {/* --- Emergency Contact Section --- */}
              <div className="border border-gray-200 rounded p-4">
                <h4 className="text-xl font-medium mb-3">
                  Emergency Contact
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={ecFullName}
                      onChange={(e) =>
                        setEcFullName(e.target.value)
                      }
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={ecPhone}
                      onChange={(e) =>
                        setEcPhone(e.target.value)
                      }
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      ID Type
                    </label>
                    <select
                      value={ecIdType}
                      onChange={(e) =>
                        setEcIdType(e.target.value)
                      }
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                    >
                      <option value="ANI">ANI</option>
                      <option value="CC">CC</option>
                      <option value="TI">TI</option>
                      {/* Add any other types your backend uses */}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      ID Number
                    </label>
                    <input
                      type="text"
                      value={ecIdNumber}
                      onChange={(e) =>
                        setEcIdNumber(e.target.value)
                      }
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Relationship
                    </label>
                    <select
                      value={ecRelationship}
                      onChange={(e) =>
                        setEcRelationship(e.target.value)
                      }
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                    >
                      <option value="AUNT">Aunt</option>
                      <option value="UNCLE">Uncle</option>
                      <option value="PARENT">Parent</option>
                      <option value="SIBLING">Sibling</option>
                      {/* Add any other relationships your backend expects */}
                    </select>
                  </div>
                </div>
              </div>

              {/* --- Student Section --- */}
              <div className="border border-gray-200 rounded p-4">
                <h4 className="text-xl font-medium mb-3">
                  Student Info
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">
                      ID
                    </label>
                    <input
                      type="text"
                      value={stuId}
                      onChange={(e) =>
                        setStuId(e.target.value)
                      }
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      ID Type
                    </label>
                    <select
                      value={stuIdType}
                      onChange={(e) =>
                        setStuIdType(e.target.value)
                      }
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                    >
                      <option value="ANI">ANI</option>
                      <option value="CC">CC</option>
                      <option value="TI">TI</option>
                      {/* Etc. */}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={stuFullName}
                      onChange={(e) =>
                        setStuFullName(e.target.value)
                      }
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={stuPhone}
                      onChange={(e) =>
                        setStuPhone(e.target.value)
                      }
                      className="mt-1 p-2 border:border-gray-300 rounded w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      value={stuEmail}
                      onChange={(e) =>
                        setStuEmail(e.target.value)
                      }
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Role
                    </label>
                    <select
                      value={stuRole}
                      onChange={(e) =>
                        setStuRole(e.target.value)
                      }
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                    >
                      <option value="ADMINISTRATOR">
                        Administrator
                      </option>
                      <option value="PROFESSOR">
                        Professor
                      </option>
                      <option value="STUDENT">
                        Student
                      </option>
                      {/* Adjust based on your backend’s allowed roles */}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Password
                    </label>
                    <input
                      type="password"
                      value={stuPassword}
                      onChange={(e) =>
                        setStuPassword(e.target.value)
                      }
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Student Code
                    </label>
                    <input
                      type="text"
                      value={stuCode}
                      onChange={(e) =>
                        setStuCode(e.target.value)
                      }
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Program
                    </label>
                    <select
                      value={stuProgram}
                      onChange={(e) =>
                        setStuProgram(e.target.value)
                      }
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                    >
                      <option value="SOFTWARE_ENGINEERING">
                        Software Engineering
                      </option>
                      <option value="COMPUTER_SCIENCE">
                        Computer Science
                      </option>
                      <option value="ELECTRICAL_ENGINEERING">
                        Electrical Engineering
                      </option>
                      {/* Etc. */}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Semester
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={stuSemester}
                      onChange={(e) =>
                        setStuSemester(Number(e.target.value))
                      }
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Birth Date
                    </label>
                    <input
                      type="date"
                      value={stuBirthDate}
                      onChange={(e) =>
                        setStuBirthDate(e.target.value)
                      }
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium">
                      Address
                    </label>
                    <input
                      type="text"
                      value={stuAddress}
                      onChange={(e) =>
                        setStuAddress(e.target.value)
                      }
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                  </div>
                </div>
              </div>

              {/* --- Form-level error message --- */}
              {formError && (
                <p className="text-red-600 text-sm">{formError}</p>
              )}

              {/* --- Buttons --- */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;



