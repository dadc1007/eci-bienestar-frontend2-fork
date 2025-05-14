// src/modules/extracurricular-classes/components/student/AvailableClassesList.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Class } from '../../services/classesService';
import ClassCard from '../student/classCard';

interface AvailableClassesListProps {
  classes: Class[];
  filter: string;
  onEnroll: (classId: string) => Promise<void>;
}

interface CategorySection {
  name: string;
  classes: Class[];
}

const AvailableClassesList: React.FC<AvailableClassesListProps> = ({ classes, filter, onEnroll }) => {
  const [expandedCategories, setExpandedCategories] = useState<{[key: string]: boolean}>({
    "Desarrollo Humano": true,
    "Arte y Cultura": true,
    "Deportes": true
  });

  // Agrupar clases por categoría
  const categorizedClasses = classes.reduce<{[key: string]: Class[]}>((acc, curr) => {
    if (!acc[curr.type]) {
      acc[curr.type] = [];
    }
    acc[curr.type].push(curr);
    return acc;
  }, {});

  // Filtrar clases según el filtro de búsqueda
  const filteredCategories = filter 
    ? Object.keys(categorizedClasses).reduce<{[key: string]: Class[]}>((acc, category) => {
        acc[category] = categorizedClasses[category].filter(cls => 
          cls.name.toLowerCase().includes(filter.toLowerCase())
        );
        return acc;
      }, {})
    : categorizedClasses;

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <>
      {Object.keys(filteredCategories).map(category => (
        <div key={category} className="mb-6">
          <div 
            className="flex justify-between items-center bg-purple-900 text-white py-3 px-4 rounded-md cursor-pointer"
            onClick={() => toggleCategory(category)}
          >
            <h2 className="text-xl font-semibold">{category}</h2>
            <FontAwesomeIcon 
              icon={faChevronDown} 
              className={`transition-transform ${expandedCategories[category] ? 'transform rotate-180' : ''}`} 
            />
          </div>
          
          {expandedCategories[category] && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {filteredCategories[category]?.length > 0 ? (
                filteredCategories[category].map(classItem => (
                  <ClassCard 
                    key={classItem.id} 
                    classData={classItem} 
                    onEnroll={onEnroll} 
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-10 text-gray-500">
                  No hay clases disponibles en esta categoría que coincidan con tu búsqueda.
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {Object.keys(filteredCategories).length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No hay clases disponibles que coincidan con tu búsqueda.
        </div>
      )}
    </>
  );
};

export default AvailableClassesList;