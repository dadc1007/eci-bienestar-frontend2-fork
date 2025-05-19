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

  // Valores por defecto seleccionados (Todos o Todo el tiempo)
  const [selectedEspecialidad, setSelectedEspecialidad] =
    useState<string>("Todos");
  const [selectedRol, setSelectedRol] = useState<string>("");
  const [selectedFecha, setSelectedFecha] = useState<string>("");
  const [selectedEstado, setSelectedEstado] = useState<string>("");

  const [turnAttended, setTurnAttended] = useState<number>(0);
  const [turnUnAttended, setTurnUnAttended] = useState<number>(0);
  const [attendedByRol, setAttendedByRol] = useState<number[]>([0, 0, 0, 0]);
  const [attendedBySpeciality, setAttendedBySpeciality] = useState<number[]>([
    0, 0, 0, 0,
  ]);
  const [datosGrafico, setDatosGrafico] = useState<
    { name: string; value: number }[]
  >([]);

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

  // Agregando opción "Todos" / "Todo el tiempo"
  const fetchEspecialidades = async () => [
    "Todos",
    "Medicina General",
    "Odontologia",
    "Psicologia",
  ];
  const fetchRoles = async () => [
    "Todos",
    "Estudiante",
    "Docente",
    "Administrativo",
    "Servicios generales",
  ];
  const fetchRangosFecha = async () => [
    "Todo el tiempo",
    "Última semana",
    "Último mes",
    "Último año",
  ];
  const fetchEstadosTurno = async () => [
    "Todos",
    "Pendiente",
    "Completo",
    "Actual",
    "Terminado",
  ];

  useEffect(() => {
    // Calcular base como suma de filtros seleccionados (solo si no es "Todos" o "Todo el tiempo")
    let base = 0;

    if (selectedEspecialidad && selectedEspecialidad !== "Todos")
      base += datosPorEspecialidad[selectedEspecialidad] || 0;

    if (selectedRol && selectedRol !== "Todos")
      base += datosPorRol[selectedRol] || 0;

    if (selectedFecha && selectedFecha !== "Todo el tiempo")
      base += datosPorFecha[selectedFecha] || 0;

    if (selectedEstado && selectedEstado !== "Todos")
      base += datosPorEstado[selectedEstado] || 0;

    setTurnAttended(base);
    setTurnUnAttended(Math.floor(base * 0.4));

    // Construir datos para gráfico según selección

    const datosGraficoTemp: { name: string; value: number }[] = [];

    // Si selecciona "Todos", manda todos los datos de esa categoría
    // Si selecciona uno, manda solo ese

    if (selectedEspecialidad === "Todos") {
      Object.entries(datosPorEspecialidad).forEach(([name, value]) => {
        datosGraficoTemp.push({ name, value });
      });
    } else if (selectedEspecialidad) {
      datosGraficoTemp.push({
        name: selectedEspecialidad,
        value: datosPorEspecialidad[selectedEspecialidad] || 0,
      });
    }

    if (selectedRol === "Todos") {
      Object.entries(datosPorRol).forEach(([name, value]) => {
        datosGraficoTemp.push({ name, value });
      });
    } else if (selectedRol) {
      datosGraficoTemp.push({
        name: selectedRol,
        value: datosPorRol[selectedRol] || 0,
      });
    }

    if (selectedFecha === "Todo el tiempo") {
      Object.entries(datosPorFecha).forEach(([name, value]) => {
        datosGraficoTemp.push({ name, value });
      });
    } else if (selectedFecha) {
      datosGraficoTemp.push({
        name: selectedFecha,
        value: datosPorFecha[selectedFecha] || 0,
      });
    }

    if (selectedEstado === "Todos") {
      Object.entries(datosPorEstado).forEach(([name, value]) => {
        datosGraficoTemp.push({ name, value });
      });
    } else if (selectedEstado) {
      datosGraficoTemp.push({
        name: selectedEstado,
        value: datosPorEstado[selectedEstado] || 0,
      });
    }

    setDatosGrafico(datosGraficoTemp);

    // Datos para attendedBySpeciality (solo los seleccionados o todo)

    if (selectedEspecialidad === "Todos") {
      const arrayEspecialidades = especialidades.map(
        (esp) => datosPorEspecialidad[esp] || 0
      );
      setAttendedBySpeciality(arrayEspecialidades);
    } else {
      const arrayEspecialidades = especialidades.map((esp) =>
        esp === selectedEspecialidad ? datosPorEspecialidad[esp] || 0 : 0
      );
      setAttendedBySpeciality(arrayEspecialidades);
    }

    // Datos para attendedByRol (vamos a poner el arreglo completo si "Todos")

    if (selectedRol === "Todos") {
      const arrayRoles = rolesPaciente.map((rol) => datosPorRol[rol] || 0);
      setAttendedByRol(arrayRoles);
    } else {
      setAttendedByRol([base, base - 1, base - 2, base - 3]);
    }
  }, [
    selectedEspecialidad,
    selectedRol,
    selectedFecha,
    selectedEstado,
    especialidades,
    rolesPaciente,
  ]);

  return (
    <div className="ml-8 mr-8">
      <div className="mb-7 mt-7 flex justify-between">
        <h1 className="text-4xl font-bold">Reportes</h1>
        <Button
          className="bg-health-primary text-white px-4 py-2"
          type="button"
          onPress={volver}
        >
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
        datosGrafico={datosGrafico}
      />
    </div>
  );
};

export default Stadistics;
