import React from 'react';

interface AttendanceButtonProps {
  studentId: string;
  isPresent: boolean;
  onToggle: (studentId: string, isPresent: boolean) => void;
}

const AttendanceButton: React.FC<AttendanceButtonProps> = ({
  studentId,
  isPresent,
  onToggle
}) => {
  const handleClick = () => {
    onToggle(studentId, !isPresent);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-6 h-6 rounded border-2 transition-all duration-200 ${
        isPresent
          ? 'bg-[#362550] border-[#362550] hover:bg-indigo-700 hover:border-indigo-700'
          : 'bg-white border-gray-300 hover:border-gray-400'
      }`}
      title={isPresent ? 'Marcar como ausente' : 'Marcar como presente'}
    >
      {isPresent && (
        <svg
          className="w-3 h-3 text-white mx-auto"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );
};

export default AttendanceButton;