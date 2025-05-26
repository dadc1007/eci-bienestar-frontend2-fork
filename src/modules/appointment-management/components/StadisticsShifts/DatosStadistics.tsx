import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DatsStadistic {
  turnAttended: number;
  turnUnAttended: number;
  attendedBySpeciality: number[];
  attendedByRol: number[];
}

const speciality = ["Medicina general", "Odontologia", "Psicología"];

const rol = ["Estudiante", "Docente", "Administrativo", "Servicios generales"];

const DatosStadistics = (datos: DatsStadistic) => {
  return (
    <div className="drop-shadow-xl bg-white w-[43vw] border-2 rounded-[12px] p-3 h-[55vh] flex flex-col">
      <h1>Resumen de atención</h1>

      <section className="flex flex-row gap-2 pb-3 rounded-[12px] ">
        <div className="bg-gray-200 rounded-[10px] flex flex-col w-[25vw] p-6">
          <h6 className="text-gray-500">Total atendidos</h6>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <FontAwesomeIcon icon={faUser} size="xs" color="red" />
            <span>{datos.turnAttended}</span>
          </h2>
        </div>
        <div className="bg-gray-200 rounded-[10px] flex flex-col w-[25vw] p-6">
          <h6 className="text-gray-500">Turnos sin asistir</h6>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <FontAwesomeIcon icon={faUser} size="xs" color="#0078b4" />
            <span>{datos.turnUnAttended}</span>
          </h2>
        </div>
      </section>

      <div className="flex flex-col gap-2 flex-1 ">
        <div className="bg-gray-200 p-3 mb-3 rounded-[10px] flex-1">
          <h5 className="text-gray-500 pb-5">Atendidos por especialidad</h5>
          {speciality.map((esp, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-1"
            >
              <h5>{esp}</h5>
              <h5>{datos.attendedBySpeciality[index]}</h5>
            </div>
          ))}
        </div>
        <div className="bg-gray-200 p-3 rounded-[10px] flex-1">
          <h5 className="text-gray-500">Atendidos por rol de paciente</h5>
          {rol.map((esp, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-1"
            >
              <h5>{esp}</h5>
              <h5>{datos.attendedByRol[index]}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DatosStadistics;
