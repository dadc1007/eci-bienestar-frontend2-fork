import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import StadisticsShifts from "../../components/StadisticsShifts/StadisticsShifts";
import {
  datosPorEspecialidad,
  datosPorRol,
  datosPorFecha,
  datosPorEstado,
} from "./mockData";

const Stadistics = () => {
  const navigate = useNavigate();
  const [especialidades, setEspecialidades] = useState<string[]>([]);
  const [rolesPaciente, setRolesPaciente] = useState<string[]>([]);
  const [rangosFecha, setRangosFecha] = useState<string[]>([]);
  const [estadosTurno, setEstadosTurno] = useState<string[]>([]);

  const [selectedEspecialidad, setSelectedEspecialidad] =
    useState<string>("Todos");
  const [selectedRol, setSelectedRol] = useState<string>("Todos");
  const [selectedFecha, setSelectedFecha] = useState<string>("Todo el tiempo");
  const [selectedEstado, setSelectedEstado] = useState<string>("Todos");

  const [turnAttended, setTurnAttended] = useState<number>(0);
  const [turnUnAttended, setTurnUnAttended] = useState<number>(0);
  const [attendedByRol, setAttendedByRol] = useState<number[]>([]);
  const [attendedBySpeciality, setAttendedBySpeciality] = useState<number[]>(
    []
  );
  const [datosGrafico, setDatosGrafico] = useState<
    { name: string; value: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      setEspecialidades(await fetchEspecialidades());
      setRolesPaciente(await fetchRoles());
      setRangosFecha(await fetchRangosFecha());
      setEstadosTurno(await fetchEstadosTurno());
    };

    fetchData();
  }, []);

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
    let base = 0;
    const datosGraficoTemp: { name: string; value: number }[] = [];

    const especialidadTodos = selectedEspecialidad === "Todos";
    const rolTodos = selectedRol === "Todos";
    const fechaTodos = selectedFecha === "Todo el tiempo";
    const estadoTodos = selectedEstado === "Todos";

    // Solo un "Todos" activo permite mostrar pie chart
    const isPieChartActive =
      especialidadTodos || rolTodos || fechaTodos || estadoTodos;

    // Calcular datos en base al único "Todos" activo
    if (especialidadTodos) {
      Object.entries(datosPorEspecialidad).forEach(([name, value]) => {
        datosGraficoTemp.push({ name, value });
        base += value;
      });
    } else if (rolTodos) {
      Object.entries(datosPorRol).forEach(([name, value]) => {
        datosGraficoTemp.push({ name, value });
        base += value;
      });
    } else if (fechaTodos) {
      Object.entries(datosPorFecha).forEach(([name, value]) => {
        datosGraficoTemp.push({ name, value });
        base += value;
      });
    } else if (estadoTodos) {
      Object.entries(datosPorEstado).forEach(([name, value]) => {
        datosGraficoTemp.push({ name, value });
        base += value;
      });
    } else {
      // Si ningún "Todos" está activo, gráfico se vacía
      if (selectedEspecialidad && selectedEspecialidad !== "Todos") {
        base = datosPorEspecialidad[selectedEspecialidad] || 0;
      } else if (selectedRol && selectedRol !== "Todos") {
        base = datosPorRol[selectedRol] || 0;
      } else if (selectedFecha && selectedFecha !== "Todo el tiempo") {
        base = datosPorFecha[selectedFecha] || 0;
      } else if (selectedEstado && selectedEstado !== "Todos") {
        base = datosPorEstado[selectedEstado] || 0;
      }
    }

    setTurnAttended(base);
    setTurnUnAttended(Math.floor(base * 0.4));
    setDatosGrafico(isPieChartActive ? datosGraficoTemp : []);

    // Especialidades (sin "Todos")
    const especialidadArray = especialidades
      .filter((esp) => esp !== "Todos")
      .map((esp) =>
        selectedEspecialidad === "Todos"
          ? datosPorEspecialidad[esp] || 0
          : esp === selectedEspecialidad
          ? datosPorEspecialidad[esp] || 0
          : 0
      );
    setAttendedBySpeciality(especialidadArray);

    // Roles (sin "Todos")
    const rolesArray = rolesPaciente
      .filter((rol) => rol !== "Todos")
      .map((rol) =>
        selectedRol === "Todos"
          ? datosPorRol[rol] || 0
          : rol === selectedRol
          ? datosPorRol[rol] || 0
          : 0
      );
    setAttendedByRol(rolesArray);
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
          onPress={() => navigate(-1)}
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
