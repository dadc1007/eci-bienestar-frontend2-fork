import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/icons/panoramic.jpg";
import studentIcon from "../../../assets/images/icons/students.png";
import teacherIcon from "../../../assets/images/icons/teachers.jpg";
import staffIcon from "../../../assets/images/icons/staff.png";
import doctorIcon from "../../../assets/images/icons/doctors.jpeg";

const UserActions: React.FC = () => {
  const navigate = useNavigate();

  const cards = [
    {
      icon: studentIcon,
      label: "Estudiantes",
      description: "Aquí puedes gestionar a los estudiantes",
      to: "/modules/users/students",
    },
    {
      icon: teacherIcon,
      label: "Profesores",
      description: "Aquí puedes gestionar a los profesores",
      to: "/modules/users/teachers",
    },
    {
      icon: staffIcon,
      label: "Personal",
      description: "Aquí puedes gestionar al personal de la escuela",
      to: "/modules/users/staff",
    },
    {
      icon: doctorIcon,
      label: "Doctores",
      description: "Aquí puedes gestionar al personal médico de la escuela",
      to: "/modules/users/doctors",
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Encabezado con imagen y solo el título */}
      <div
        className="relative w-full h-64 md:h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${logo})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end justify-start p-6 md:p-16">
          <h1 className="text-3xl md:text-5xl font-bold text-white text-left">
            Bienvenido al módulo de<br /> 
            gestión de usuarios
          </h1>
        </div>
      </div>

      {/* Texto explicativo y grid de tarjetas */}
      <div className="flex-1 overflow-y-auto px-6 md:px-16 py-8 w-full">
        <div className="mb-8 mx-auto bg-gray-100 p-6 rounded-2xl shadow-md text-left">
          <h2 className="text-2xl font-semibold text-[#b30000] mb-4">
            ¡Explora las opciones de usuario!
          </h2>
          <p className="text-gray-700 leading-relaxed">
          En esta sección podrás gestionar todos los usuarios de la institución. Consulta listados completos, crea perfiles con datos personales, 
          asigna roles y permisos, edita información y elimina cuentas no requeridas. Administra eficientemente estudiantes, 
          profesores, personal administrativo y médico para optimizar la gestión de la aplicación.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {cards.map(({ icon, label, description, to }) => (
            <div key={label} className="flex flex-col items-center">
              <button
                onClick={() => navigate(to)}
                className="w-full bg-[#b30000] rounded-xl overflow-hidden shadow-md hover:bg-[#990000] transition-all group"
              >
                <div className="w-full h-40 overflow-hidden">
                  <img
                    src={icon}
                    alt={label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="py-3">
                  <span className="block text-center text-lg font-semibold text-white">
                    {label}
                  </span>
                </div>
              </button>
              <p className="mt-2 text-center text-sm text-gray-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserActions;


