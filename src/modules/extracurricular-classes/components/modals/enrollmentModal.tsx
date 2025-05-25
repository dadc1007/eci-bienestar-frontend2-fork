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
  const { mutate, isLoading, isSuccess, error, reset } = useEnrollUser();

  // Resetear estados cuando se abre/cierra el modal
  useEffect(() => {
    if (!isOpen) {
      setConfirmEnroll(false);
      setShowError(false);
      reset();
    }
  }, [isOpen, reset]);

  // Formatear el horario según las sesiones o los tiempos directos
  const formattedSchedule = classData?.sessions
    ? classData.sessions.map(s => `${s.day} ${s.startTime}-${s.endTime}`).join(', ')
    : `${classData?.startTime} - ${classData?.endTime}`;

  const handleEnroll = async () => {
    if (!classData) return;
    
    try {
      await mutate("123", classData.id);
      setConfirmEnroll(true);
      setShowError(false);
    } catch (error) {
      setShowError(true);
      console.error('Error al inscribirse:', error);
    }
  };

  const handleClose = () => {
    setConfirmEnroll(false);
    onClose();
  };

  if (!classData) return null;

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