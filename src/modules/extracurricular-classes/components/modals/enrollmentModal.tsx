import React, { useState, useEffect } from 'react';
import Modal from '../common/modal';
import { Class } from '../../services/classesService';
import { useEnrollUser } from '../../hooks/useEnrollment';


interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: Class | null;
  userId: string;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  classData,
  userId
}) => {
  const [confirmEnroll, setConfirmEnroll] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { mutate, isLoading, isSuccess, error } = useEnrollUser();

  useEffect(() => {
  if (isOpen && classData) {
    console.log('Datos completos de la clase recibidos:', JSON.stringify(classData, null, 2));
  }
}, [isOpen, classData]);

  useEffect(() => {
    if (!isOpen) {
      setConfirmEnroll(false);
      setShowError(false);
      setErrorMessage('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (isSuccess) {
      setConfirmEnroll(true);
      setShowError(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      setShowError(true);
      setErrorMessage(error.message || 'Error al procesar la inscripción');
      console.log('Error en inscripción:', error);
    }
  }, [error]);

  const formattedSchedule = classData?.sessions
    ? classData.sessions.map(s => `${s.day} ${s.startTime}-${s.endTime}`).join(', ')
    : `${classData?.startDate} - ${classData?.endTime}`;

  const handleEnroll = async () => {
  if (!classData?.id || !userId) {
    setErrorMessage(!classData?.id ? 'Clase no seleccionada' : 'Usuario no identificado');
    setShowError(true);
    return;
  }

  try {
    if (!classData.startDate) {
      throw new Error('La clase no tiene fecha de inicio definida');
    }

    // Extraer solo la parte de la fecha (YYYY-MM-DD)
    const dateOnly = classData.startDate.split('T')[0];
    
    // Validar formato de fecha
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOnly)) {
      throw new Error(`Formato de fecha inválido: ${classData.startDate}`);
    }

    const result = await mutate({ 
      userId, 
      classId: classData.id, 
      startDate: classData.startDate.split('T')[0]
    });

    // Manejar tanto respuesta JSON como texto plano
    if (typeof result === 'string') {
      console.log('Respuesta del servidor (texto):', result);
    } else {
      console.log('Respuesta del servidor (JSON):', result);
    }

    setConfirmEnroll(true);
    
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('Error en inscripción:', {
      error: err,
      classData,
      userId
    });
    setErrorMessage(message);
    setShowError(true);
  }
};
  const handleClose = () => {
    onClose();
    setConfirmEnroll(false);
    setShowError(false);
  };

  if (!classData) {
    return null;
  }
    

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={confirmEnroll ? "¡Inscripción Exitosa!" : `Inscripción a Clase`}
    >
      {confirmEnroll ? (
        <div className="text-center">
          <div className="mb-4 text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="mb-4">Te has inscrito correctamente a la clase de <strong>{classData.name}</strong>.</p>
          <div className="mb-4 text-left bg-gray-100 p-2 rounded">
            <p className="text-sm"><strong>Horario:</strong> {formattedSchedule}</p>
            <p className="text-sm"><strong>Lugar:</strong> Coliseo</p>
          </div>
          <button
            onClick={handleClose}
            className="bg-purple-800 hover:bg-purple-900 text-white py-2 px-4 rounded-md"
          >
            Aceptar
          </button>
        </div>
      ) : (
        <div>
          {showError && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              <p><strong>Error:</strong> {error?.message || 'Ocurrió un error al procesar tu inscripción'}</p>
            </div>
          )}

          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">{classData.name}</h2>
            <p className="mb-1"><strong>Instructor:</strong> {classData.instructorId || 'Por asignar'}</p>
            <p className="mb-1"><strong>Horario:</strong> {formattedSchedule}</p>
            <p className="mb-1"><strong>Ubicación:</strong> Coliseo</p>
            <p className="mb-1"><strong>Categoría:</strong> {classData.type || 'Desarrollo Humano'}</p>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Al inscribirte en esta clase, te comprometes a asistir regularmente. Las faltas de asistencia injustificadas pueden resultar en penalizaciones.
          </p>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleEnroll}
              className="bg-[#362550] hover:bg-[#362550] text-white py-2 px-4 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? 'Procesando...' : 'Confirmar Inscripción'}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EnrollmentModal;