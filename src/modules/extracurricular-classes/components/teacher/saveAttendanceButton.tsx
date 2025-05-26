import React, { useState } from 'react';

interface AttendanceRecord {
  studentId: string;
  isPresent: boolean;
}

interface SaveAttendanceButtonProps {
  attendanceRecords: AttendanceRecord[];
  classId: string;
  sessionId: string;
  onSave: () => void;
}

const SaveAttendanceButton: React.FC<SaveAttendanceButtonProps> = ({
  attendanceRecords,
  classId,
  sessionId,
  onSave
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Aquí iría la lógica real para guardar en la base de datos
      console.log('Guardando asistencia:', {
        classId,
        sessionId,
        attendanceRecords,
        timestamp: new Date().toISOString()
      });
      
      onSave();
    } catch (error) {
      console.error('Error al guardar asistencia:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const presentCount = attendanceRecords.filter(record => record.isPresent).length;
  const totalCount = attendanceRecords.length;

  return (
    <div className="flex flex-col items-start space-y-4">
      <div className="text-sm text-gray-600">
        Estudiantes presentes: {presentCount} de {totalCount}
      </div>
      
      <button
        onClick={handleSave}
        disabled={isLoading}
        className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-[#362550] hover:bg-indigo-700'
        } text-white`}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Guardando...</span>
          </div>
        ) : (
          'Guardar Asistencia'
        )}
      </button>
    </div>
  );
};

export default SaveAttendanceButton;