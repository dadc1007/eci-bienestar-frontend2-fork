import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  getTurnCountBySpeciality,
  getTurnCountByRole,
} from "@modules/appointment-management/services/stadistic";
import StadisticsShifts from "../../components/StadisticsShifts/StadisticsShifts";

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

const getDateRange = (label: string): { start: string; end: string } => {
  const now = new Date();
  let start: Date;

  switch (label) {
    case "Última semana":
      start = new Date();
      start.setDate(start.getDate() - 7);
      break;
    case "Último mes":
      start = new Date();
      start.setMonth(start.getMonth() - 1);
      break;
    case "Último año":
      start = new Date();
      start.setFullYear(start.getFullYear() - 1);
      break;
    default:
      start = new Date(2000, 0, 1);
  }

  const range = {
    start: start.toISOString().split("T")[0],
    end: now.toISOString().split("T")[0],
  };

  return range;
};


  useEffect(() => {
    const fetchEstadisticas = async () => {
      const { start, end } = getDateRange(selectedFecha);

      try {
        const specialityData = await getTurnCountBySpeciality(
          start,
          end,
          selectedEspecialidad !== "Todos" ? selectedEspecialidad : undefined,
          selectedEstado !== "Todos" ? selectedEstado : undefined
        );
        const especialidadArray = especialidades
          .filter((esp) => esp !== "Todos")
          .map((esp) => {
            const found = specialityData.data.find((d) => d.speciality === esp);
            return found?.count || 0;
          });
        setAttendedBySpeciality(especialidadArray);

        const rolData = await getTurnCountByRole(
          start,
          end,
          selectedRol !== "Todos" ? selectedRol : undefined,
          selectedEstado !== "Todos" ? selectedEstado : undefined
        );
        const rolesArray = rolesPaciente
          .filter((rol) => rol !== "Todos")
          .map((rol) => {
            const found = rolData.data.find((d) => d.role === rol);
            return found?.count || 0;
          });
        setAttendedByRol(rolesArray);

        const total = specialityData.data.reduce(
          (acc, curr) => acc + curr.count,
          0
        );
        setTurnAttended(total);
        setTurnUnAttended(Math.floor(total * 0.4)); 

        const datosGraficoTemp: { name: string; value: number }[] = [];
        if (selectedEspecialidad === "Todos") {
          specialityData.data.forEach(({ speciality, count }) => {
            datosGraficoTemp.push({ name: speciality, value: count });
          });
        } else if (selectedRol === "Todos") {
          rolData.data.forEach(({ role, count }) => {
            datosGraficoTemp.push({ name: role, value: count });
          });
        }
        setDatosGrafico(datosGraficoTemp);
      } catch (err) {
        console.error("Error obteniendo estadísticas reales:", err);
      }
    };

    if (especialidades.length > 0 && rolesPaciente.length > 0) {
      fetchEstadisticas();
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
