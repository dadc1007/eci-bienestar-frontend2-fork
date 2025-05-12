import { useEffect, useState } from "react"
import { Button } from "@heroui/react";
import DatosStadistics from "../../components/datosStadistics/DatosStadistics"
import { faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StadisticsShifts = ({ volver }: { volver: () => void }) => {
    const [especialidades, setEspecialidades] = useState<string[]>([])
    const [rolesPaciente, setRolesPaciente] = useState<string[]>([])
    const [rangosFecha, setRangosFecha] = useState<string[]>([])
    const [estadosTurno, setEstadosTurno] = useState<string[]>([])

    const [selectedEspecialidad, setSelectedEspecialidad] = useState<string>("")
    const [selectedRol, setSelectedRol] = useState<string>("")
    const [selectedFecha, setSelectedFecha] = useState<string>("")
    const [selectedEstado, setSelectedEstado] = useState<string>("")

    const [turnAttended, setTurnAttended] = useState<number>(0)
    const [turnUnAttended, setTurnUnAttended] = useState<number>(0)
    const [attendedByRol, setAttendedByRol] = useState<number[]>([0, 0, 0, 0])
    const [attendedBySpeciality, setAttendedBySpeciality] = useState<number[]>([0, 0, 0, 0])

    const datosPorEspecialidad: Record<string, number> = {
        "Medicina General": 5,
        "Odontologia": 10,
        "Psicologia": 3,
    }

    const datosPorRol: Record<string, number> = {
        "Estudiante": 4,
        "Docente": 7,
        "Administrativo": 6,
        "Servicios generales": 2,
    }

    const datosPorFecha: Record<string, number> = {
        "Última semana": 3,
        "Último mes": 8,
        "Último año": 15,
    }

    const datosPorEstado: Record<string, number> = {
        "Pendiente": 2,
        "Completo": 12,
        "Actual": 5,
        "Terminado": 10,
    }

    useEffect(() => {
        const fetchData = async () => {
        const especialidadesData = await fetchEspecialidades()
        const rolesData = await fetchRoles()
        const rangosData = await fetchRangosFecha()
        const estadosData = await fetchEstadosTurno()

        setEspecialidades(especialidadesData)
        setRolesPaciente(rolesData)
        setRangosFecha(rangosData)
        setEstadosTurno(estadosData)
        }

        fetchData()
    }, [])

    const fetchEspecialidades = async () => ["Medicina General", "Odontologia", "Psicologia"]
    const fetchRoles = async () => ["Estudiante", "Docente", "Administrativo", "Servicios generales"]
    const fetchRangosFecha = async () => ["Última semana", "Último mes", "Último año"]
    const fetchEstadosTurno = async () => ["Pendiente", "Completo", "Actual", "Terminado"]

  
    useEffect(() => {
    let base = 0

    if (selectedEspecialidad) base += datosPorEspecialidad[selectedEspecialidad] || 0
    if (selectedRol) base += datosPorRol[selectedRol] || 0
    if (selectedFecha) base += datosPorFecha[selectedFecha] || 0
    if (selectedEstado) base += datosPorEstado[selectedEstado] || 0

    setTurnAttended(base)
    setTurnUnAttended(Math.floor(base * 0.4))


    const especialidadesGraph = especialidades.map((esp) =>
        esp === selectedEspecialidad ? datosPorEspecialidad[esp] || 0 : 0
    )
    setAttendedBySpeciality(especialidadesGraph)


    setAttendedByRol([base, base - 1, base - 2, base - 3])
    }, [selectedEspecialidad, selectedRol, selectedFecha, selectedEstado])

    return (
        <div className="ml-8 mr-8">
        <div className="mb-7 mt-7 flex justify-between">
            <h1 className="text-4xl font-bold">Reportes</h1>
             <Button
              className="bg-health-primary text-white px-4 py-2"
              type="button"
              onPress={volver}
            >
              <FontAwesomeIcon icon={faArrowLeft} size="lg" color="white" />{" "}
              Volver
            </Button>
        </div>
        <div className="drop-shadow-xl bg-white h-[80vh] flex flex-col justify-between p-4 ">
            <div>
                <h2 className="text-2xl font-bold">Reportes de atención</h2>
                <p>Genere informes detallados sobre el nivel de atención brindado</p>
            </div>
            <section className="flex flex-row gap-6 w-full">
                <div className="flex-1">
                    <h3>Especialidad</h3>
                    <select
                    value={selectedEspecialidad}
                    onChange={(e) => setSelectedEspecialidad(e.target.value)}
                    className="bg-gray-200 text-gray-500 border rounded-[7px] px-2 py-1 w-full"
                    >
                    <option value="">Seleccione una especialidad</option>
                    {especialidades.map((esp, index) => (
                        <option key={index} value={esp}>{esp}</option>
                    ))}
                    </select>
                </div>
                <div className="flex-1">
                    <h3>Rol paciente</h3>
                    <select
                    value={selectedRol}
                    onChange={(e) => setSelectedRol(e.target.value)}
                    className="bg-gray-200 text-gray-500 border rounded-[7px] px-2 py-1 w-full"
                    >
                    <option value="">Seleccione un rol</option>
                    {rolesPaciente.map((rol, index) => (
                        <option key={index} value={rol}>{rol}</option>
                    ))}
                    </select>
                </div>
                <div className="flex-1">
                    <h3>Rango fechas</h3>
                    <select
                    value={selectedFecha}
                    onChange={(e) => setSelectedFecha(e.target.value)}
                    className="bg-gray-200 text-gray-500 border rounded-[7px] px-2 py-1 w-full"
                    >
                    <option value="">Seleccione un rango de fechas</option>
                    {rangosFecha.map((rango, index) => (
                        <option key={index} value={rango}>{rango}</option>
                    ))}
                    </select>
                </div>
                <div className="flex-1">
                    <h3>Estado de los turnos</h3>
                    <select
                    value={selectedEstado}
                    onChange={(e) => setSelectedEstado(e.target.value)}
                    className="bg-gray-200 text-gray-500 border rounded-[7px] px-2 py-1 w-full"
                    >
                    <option value="">Seleccione un estado</option>
                    {estadosTurno.map((estado, index) => (
                        <option key={index} value={estado}>{estado}</option>
                    ))}
                    </select>
                </div>
            </section>
            <div>
            <DatosStadistics
                turnAttended={turnAttended}
                turnUnAttended={turnUnAttended}
                attendedBySpeciality={attendedBySpeciality}
                attendedByRol={attendedByRol}
            />
            </div>
        </div>
        </div>
    )
    }

export default StadisticsShifts
