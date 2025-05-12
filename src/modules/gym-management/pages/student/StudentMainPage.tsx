import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  "https://escuelaing.s3.amazonaws.com/production/images/_DSC5474.2e16d0ba.fill-1200x800-c100.jpg?AWSAccessKeyId=AKIAWFY3NGTFJHVI634A&Signature=ZCtmZR28LMhOJFcCGO9wkoYb0qQ%3D&Expires=1749403946",
  "https://escuelaing.s3.amazonaws.com/production/images/_DSC5393.2e16d0ba.fill-1200x800-c100.jpg?AWSAccessKeyId=AKIAWFY3NGTFJHVI634A&Signature=fCAzVSbwIHRdjzKZ4zPZY26Rius%3D&Expires=1749403946",
  "https://escuelaing.s3.amazonaws.com/production/images/Bienestar-Universitario-Gimn.2e16d0ba.fill-1200x800-c100_dY2H7Z9.jpg?AWSAccessKeyId=AKIAWFY3NGTFJHVI634A&Signature=kLqiRofdQMRQ70lvukO5QO%2Br87g%3D&Expires=1749403946",
  "https://escuelaing.s3.amazonaws.com/production/images/GYM2.2e16d0ba.fill-1200x800-c100.jpg?AWSAccessKeyId=AKIAWFY3NGTFJHVI634A&Signature=GP4qIp73TPALk1wCixfGpw2DMt4%3D&Expires=1749403946"
];

const StudentMainPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Cambiar imagen cada 8 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto text-gray-800">
      {/* Carrusel de imágenes */}
      <div className="w-full h-64 overflow-hidden rounded-lg shadow-md">
        <img
          src={images[currentIndex]}
          alt="Gimnasio"
          className="w-full h-full object-cover transition-all duration-1000"
        />
      </div>

      {/* Contenido reglamento */}

      <h2 className="text-2xl font-semibold mt-6">Aspectos generales</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Plan de entrenamiento:</strong> según la evaluación inicial (por parte
          del equipo de profesionales del gimnasio), cada usuario tendrá asignado un
          plan de entrenamiento acorde a las capacidades, intereses y necesidades
          detectadas previamente.
        </li>
        <li>
          <strong>Seguimiento:</strong> se realizará seguimiento periódico para
          monitorear la evolución de cada usuario frente a sus indicadores iniciales.
          Este seguimiento estará a cargo del profesional de actividad física, y si es
          necesario, también por parte del médico.
        </li>
        <li>
          <strong>Horario del gimnasio:</strong> estudiantes: lunes a viernes de 8:00 a.m.
          a 5:00 p.m. (Los usuarios no
          deberán exceder el horario asignado y al cumplirse este, deberán abandonar el
          gimnasio).
        </li>
        <li>
          <strong>Práctica de actividad física:</strong> cada usuario podrá acceder hasta
          tres veces por semana, con una intensidad máxima de una hora diaria.
        </li>
        <li>
          <strong>Edad mínima:</strong> el ingreso al gimnasio se permite a partir de los
          16 años cumplidos al momento de la inscripción.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">Implementos</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          Utilizar indumentaria cómoda y adecuada para la actividad física (sudadera,
          pantaloneta, tenis).
        </li>
        <li>
          Portar una toalla personal para higiene y limpieza de los equipos después de
          su uso.
        </li>
        <li>
          Limpiar adecuadamente la máquina utilizada con los atomizadores y toallas
          disponibles.
        </li>
        <li>Usar las papeleras para mantener limpio el área.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">Manejo de equipos</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Regresar las mancuernas, discos, barras, etc., a sus soportes al terminar.</li>
        <li>No descansar sobre las máquinas.</li>
        <li>Compartir los equipos y cuidar el material e instalaciones.</li>
        <li>
          Consultar al profesor para resolver cualquier inquietud o requerir ayuda.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">Horario</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Turnos de 60 minutos por sesión. Hasta 3 veces por semana.</li>
        <li>Estudiantes: jornada continua de 8:00 a.m. a 5:00 p.m.</li>
      </ul>

      <div className="pt-6">
        <button
          onClick={() => navigate("first-register")}
          className="bg-black text-white font-semibold px-6 py-3 rounded hover:bg-yellow-500 transition"
        >
          Inscribirte ahora
        </button>
      </div>
    </div>
  );
};

export default StudentMainPage;