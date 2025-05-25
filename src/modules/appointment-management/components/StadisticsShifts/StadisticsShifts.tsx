import DatosStadistics from "./DatosStadistics";
import FilterSelect from "./FilterSelect";
import GraphicShift from "./GraphicShift";

type Props = {
  especialidades: string[];
  rolesPaciente: string[];
  rangosFecha: string[];
  estadosTurno: string[];
  selectedEspecialidad: string;
  setSelectedEspecialidad: (value: string) => void;
  selectedRol: string;
  setSelectedRol: (value: string) => void;
  selectedFecha: string;
  setSelectedFecha: (value: string) => void;
  selectedEstado: string;
  setSelectedEstado: (value: string) => void;
  turnAttended: number;
  turnUnAttended: number;
  attendedBySpeciality: number[];
  attendedByRol: number[];
  datosGrafico: { name: string; value: number }[]
};

const StadisticsShifts = ({
  especialidades,
  rolesPaciente,
  rangosFecha,
  estadosTurno,
  selectedEspecialidad,
  setSelectedEspecialidad,
  selectedRol,
  setSelectedRol,
  selectedFecha,
  setSelectedFecha,
  selectedEstado,
  setSelectedEstado,
  turnAttended,
  turnUnAttended,
  attendedBySpeciality,
  attendedByRol,
  datosGrafico,
}: Props) => {
  return (
    <div className="drop-shadow-xl bg-white h-[80vh] flex flex-col justify-between p-4">
      <div>
        <h2 className="text-2xl font-bold">Reportes de atención</h2>
        <p>Genere informes detallados sobre el nivel de atención brindado</p>
      </div>

      <section className="flex flex-row gap-6 w-full">
        <FilterSelect label="Especialidad" options={especialidades} value={selectedEspecialidad} onChange={setSelectedEspecialidad} />
        <FilterSelect label="Rol paciente" options={rolesPaciente} value={selectedRol} onChange={setSelectedRol} />
        <FilterSelect label="Rango fechas" options={rangosFecha} value={selectedFecha} onChange={setSelectedFecha} />
        <FilterSelect label="Estado de los turnos" options={estadosTurno} value={selectedEstado} onChange={setSelectedEstado} />
      </section>

      <section className="flex flex-row justify-between gap-4 h-full mt-4">
        <div className="flex-1">
          <DatosStadistics
            turnAttended={turnAttended}
            turnUnAttended={turnUnAttended}
            attendedBySpeciality={attendedBySpeciality}
            attendedByRol={attendedByRol}
          />
        </div>
        <div className="flex-1">
          <GraphicShift data={datosGrafico} title="Turnos" />
        </div>
      </section>
    </div>
  );
};

export default StadisticsShifts;
