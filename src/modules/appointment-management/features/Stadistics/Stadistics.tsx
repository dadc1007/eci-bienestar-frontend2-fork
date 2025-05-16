// src/pages/Stadistics/Stadistics.tsx

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import StadisticsShifts from "../../components/StadisticsShifts/StadisticsShifts";
import {
  datosPorEspecialidad,
  datosPorRol,
  datosPorFecha,
  datosPorEstado,
} from "./mockData";

const Stadistics = ({ volver }: { volver: () => void }) => {
  const [especialidades, setEspecialidades] = useState<string[]>([]);
  const [rolesPaciente, setRolesPaciente] = useState<string[]>([]);
  const [rangosFecha, setRangosFecha] = useState<string[]>([]);
  const [estadosTurno, setEstadosTurno] = useState<string[]>([]);

  const [selectedEspecialidad, setSelectedEspecialidad] = useState<string>("");
  const [selectedRol, setSelectedRol] = useState<string>("");
  const [selectedFecha, setSelectedFecha] = useState<string>("");
  const [selectedEstado, setSelectedEstado] = useState<string>("");

  const [turnAttended, setTurnAttended] = useState<number>(0);
  const [turnUnAttended, setTurnUnAttended] = useState<number>(0);
  const [attendedByRol, setAttendedByRol] = useState<number[]>([0, 0, 0, 0]);
  const [attendedBySpeciality, setAttendedBySpeciality] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const fetchData = async () => {
      const especialidadesData = await fetchEspecialidades();
      const rolesData = await fetchRoles();
      const rangosData = await fetchRangosFecha();
      const estadosData = await fetchEstadosTurno();

      setEspecialidades(especialidadesData);
      setRolesPaciente(rolesData);
      setRangosFecha(rangosData);
      setEstadosTurno(estadosData);
    };

    fetchData();
  }, []);

  const fetchEspecialidades = async () => ["Medicina General", "Odontologia", "Psicologia"];
  const fetchRoles = async () => ["Estudiante", "Docente", "Administrativo", "Servicios generales"];
  const fetchRangosFecha = async () => ["Última semana", "Último mes", "Último año"];
  const fetchEstadosTurno = async () => ["Pendiente", "Completo", "Actual", "Terminado"];

  useEffect(() => {
    let base = 0;

    if (selectedEspecialidad) base += datosPorEspecialidad[selectedEspecialidad] || 0;
    if (selectedRol) base += datosPorRol[selectedRol] || 0;
    if (selectedFecha) base += datosPorFecha[selectedFecha] || 0;
    if (selectedEstado) base += datosPorEstado[selectedEstado] || 0;

    setTurnAttended(base);
    setTurnUnAttended(Math.floor(base * 0.4));

    const especialidadesGraph = especialidades.map((esp) =>
      esp === selectedEspecialidad ? datosPorEspecialidad[esp] || 0 : 0
    );
    setAttendedBySpeciality(especialidadesGraph);

    setAttendedByRol([base, base - 1, base - 2, base - 3]);
  }, [selectedEspecialidad, selectedRol, selectedFecha, selectedEstado]);

  return (
    <div className="ml-8 mr-8">
      <div className="mb-7 mt-7 flex justify-between">
        <h1 className="text-4xl font-bold">Reportes</h1>
        <Button className="bg-health-primary text-white px-4 py-2" type="button" onPress={volver}>
          <FontAwesomeIcon icon={faArrowLeft} size="lg" color="white" /> Volver
        </Button>
      </div>

      <StadisticsShifts
        especialidades={especialidades}
        rolesPaciente={rolesPaciente}
        rangosFecha={rangosFecha}
        estadosTurno={estadosTurno}
        selectedEspecialidad={selectedEspecialidad}
        setSelectedEspecialidad={setSelectedEspecialidad}
        selectedRol={selectedRol}
        setSelectedRol={setSelectedRol}
        selectedFecha={selectedFecha}
        setSelectedFecha={setSelectedFecha}
        selectedEstado={selectedEstado}
        setSelectedEstado={setSelectedEstado}
        turnAttended={turnAttended}
        turnUnAttended={turnUnAttended}
        attendedBySpeciality={attendedBySpeciality}
        attendedByRol={attendedByRol}
      />
    </div>
  );
};

export default Stadistics;
