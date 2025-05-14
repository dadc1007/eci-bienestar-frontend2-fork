// src/modules/extracurricular-classes/components/common/ClassSearchBar.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface ClassSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  classNames?: string;
  dropdownOptions?: Array<{value: string, label: string}>;
}

const ClassSearchBar: React.FC<ClassSearchBarProps> = ({ 
  value, 
  onChange, 
  placeholder = "Buscar clase...",
  classNames = "",
  dropdownOptions
}) => {
  return (
    <div className={`relative ${classNames}`}>
      <label htmlFor="classSearch" className="block text-sm font-medium text-gray-700 mb-1">
        Buscar Clase
      </label>
      
      {dropdownOptions ? (
        <select 
          id="classSearch"
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Todas las clases</option>
          {dropdownOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
          </div>
          <input
            id="classSearch"
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default ClassSearchBar;