import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../../components/common/backButton';
import AttendanceButton from '../../components/teacher/attendanceButton';
import SaveAttendanceButton from '../../components/teacher/saveAttendanceButton';
import Pagination from '../../components/common/pagination';

interface Student {
  id: string;
  name: string;
  email: string;
}

const ClassAttendancePage: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  const instructorId = location.state?.instructorId || 'instructor-id';
  
  const [students, setStudents] = useState<Student[]>([]);
  const [classInfo, setClassInfo] = useState<{ name: string; schedule: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [attendanceRecords, setAttendanceRecords] = useState<{
    [studentId: string]: boolean;
  }>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const sessionId = `session-${new Date().toISOString().split('T')[0]}-${classId}`;

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        setLoading(true);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockStudents: Student[] = [
          { id: '12345', name: 'Juan RodrÍguez', email: 'juan.perez@example.com' },
          { id: '12346', name: 'Emily Noreña', email: 'ana.garcia@example.com' },
          { id: '12347', name: 'Mayerlly Suárez', email: 'carlos.rodriguez@example.com' },
          { id: '12348', name: 'David Espinoza', email: 'maria.lopez@example.com' },
          { id: '12349', name: 'Juan Martínez', email: 'juan.martinez@example.com' },
          { id: '12350', name: 'Laura Sánchez', email: 'laura.sanchez@example.com' },
          { id: '12351', name: 'Pedro González', email: 'pedro.gonzalez@example.com' },
          { id: '12352', name: 'Geraldine Rivera', email: 'sofia.rivera@example.com' },
          { id: '12353', name: 'Diego Morales', email: 'diego.morales@example.com' },
          { id: '12354', name: 'Valentina Castro', email: 'valentina.castro@example.com' },
        ];
        
        const mockClassInfo = {
          name: 'Comunicación Efectiva',
          schedule: 'Miércoles y Viernes 10:00 AM - 11:30 AM,'
        };
        setStudents(mockStudents);
        setClassInfo(mockClassInfo);
        
        const initialAttendance: { [key: string]: boolean } = {};
        mockStudents.forEach(student => {
          initialAttendance[student.id] = false;
        });
        setAttendanceRecords(initialAttendance);
        
      } catch (error) {
        console.error('Error fetching class data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (classId) {
      fetchClassData();
    }
  }, [classId]);

  const handleAttendanceToggle = (studentId: string, isPresent: boolean) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: isPresent
    }));
  };

  const handleSaveAttendance = () => {
    // Simular guardado de asistencia
    setShowSuccessModal(true);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/modules/extracurricular/profesor/registro-de-asistencia');
  };

  // Pagination logic
  const totalPages = Math.ceil(students.length / itemsPerPage);
  const currentItems = students.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center mb-4">
          <BackButton />
          <h1 className="text-2xl font-bold text-gray-800 ml-4">Cargando...</h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#362550]"></div>
        </div>
      </div>
    );
  }

  if (!classInfo) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center mb-4">
          <BackButton />
          <h1 className="text-2xl font-bold text-gray-800 ml-4">Error</h1>
        </div>
        <div className="text-center text-red-600">
          No se pudo cargar la información de la clase
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <BackButton />
        <div className="ml-4">
          <h1 className="text-2xl font-bold text-gray-800">Registro de Asistencia</h1>
          <h2 className="text-xl text-gray-600 mt-1">{classInfo.name}</h2>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#362550]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Estudiante</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Asistencia</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Observaciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {student.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <AttendanceButton
                    studentId={student.id}
                    isPresent={attendanceRecords[student.id] || false}
                    onToggle={handleAttendanceToggle}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                  Observaciones
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <SaveAttendanceButton
          attendanceRecords={Object.entries(attendanceRecords).map(([studentId, isPresent]) => ({
            studentId,
            isPresent
          }))}
          classId={classId || ''}
          sessionId={sessionId}
          onSave={handleSaveAttendance}
        />
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">¡Asistencia Guardada!</h3>
              <p className="text-sm text-gray-500 mb-4">
                La asistencia se ha registrado correctamente.
              </p>
              <button
                onClick={handleModalClose}
                className="w-full bg-[#362550] text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassAttendancePage;