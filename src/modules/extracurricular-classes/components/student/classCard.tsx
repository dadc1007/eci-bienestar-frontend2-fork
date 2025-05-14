// src/modules/extracurricular-classes/components/common/ClassCard.tsx
import React, { useState } from 'react';
import { Class, enrollUserToClass } from '../../services/classesService';

interface ClassCardProps {
  classData: Class;
  onEnroll: (classId: string) => Promise<void>;
}

const ClassCard: React.FC<ClassCardProps> = ({ classData, onEnroll }) => {
  const [enrollmentStatus, setEnrollmentStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleEnroll = async () => {
    try {
      setEnrollmentStatus('loading');
      await onEnroll(classData.id);
      setEnrollmentStatus('success');
      
      // Reset status after a delay
      setTimeout(() => setEnrollmentStatus('idle'), 3000);
    } catch (error) {
      setEnrollmentStatus('error');
      
      // Reset status after a delay
      setTimeout(() => setEnrollmentStatus('idle'), 3000);
    }
  };

  // Map class names to image paths (in a real app these would come from the backend)
  const getImagePath = (className: string) => {
    const imageMap: {[key: string]: string} = {
      'Yoga': '/images/yoga.jpg',
      'Meditación': '/images/meditacion.jpg',
      'Liderazgo': '/images/liderazgo.jpg',
      'Pintura': '/images/pintura.jpg',
      'Teatro': '/images/teatro.jpg',
      'Danza': '/images/danza.jpg',
      'Fútbol': '/images/futbol.jpg',
      'Taekwondo': '/images/taekwondo.jpg',
      'Básquetbol': '/images/basquetbol.jpg'
    };
    
    return imageMap[className] || '/images/default-class.jpg';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="h-48 bg-gray-200">
        <img 
          src={getImagePath(classData.name)} 
          alt={classData.name} 
          className="w-full h-full object-cover" 
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/default-class.jpg';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold">{classData.name}</h3>
        <p><strong>Instructor:</strong> {classData.instructor}</p>
        <p><strong>Horario:</strong> {classData.schedule}</p>
        <p><strong>Ubicación:</strong> Coliseo</p>
        <p><strong>Capacidad:</strong> {classData.enrolledCount}/{classData.capacity}</p>
        
        <button
          onClick={handleEnroll}
          disabled={enrollmentStatus === 'loading'}
          className={`mt-4 w-full py-2 px-4 rounded-md text-white font-medium 
            ${enrollmentStatus === 'loading' 
              ? 'bg-gray-400' 
              : 'bg-purple-700 hover:bg-purple-800 transition-colors'}`}
        >
          {enrollmentStatus === 'loading' ? 'Procesando...' : 'Inscribirse'}
        </button>
        
        {enrollmentStatus === 'success' && (
          <p className="mt-2 text-green-600 text-sm text-center">¡Inscripción exitosa!</p>
        )}
        
        {enrollmentStatus === 'error' && (
          <p className="mt-2 text-red-600 text-sm text-center">Error al inscribirse</p>
        )}
      </div>
    </div>
  );
};

export default ClassCard;