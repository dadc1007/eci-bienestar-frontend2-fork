import { Button } from "@heroui/react";
import Layout from "../../layout/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faGear,  faChartSimple } from "@fortawesome/free-solid-svg-icons";
import ShiftsUser from "../../components/shiftsUser/shiftsUser";
import { shiftItems, carroselItems, users } from "./datosMock"; 

const enrichedShiftItems = shiftItems.map((shift) => {
  const user = users.find((u) => u.id === shift.UserId);
  return {
    ...shift,
    turn: shift.code,
    namePatient: user?.name || "Paciente desconocido",
  };
});

const ShiftsPrincipal = ({ irAGestion, irAFormShift, isAStadistics }: { irAGestion: () => void, irAFormShift: () => void, isAStadistics: () => void }) => {
  return (
    <Layout
      header={
        <div className="w-full flex flex-row items-center justify-between bg-white py-5 px-7">
          <h1 className="font-bold text-2xl">Sistema de turnos</h1>
          <div className="flex flex-row items-center justify-between gap-4">
            <Button
              className="bg-health-primary text-white px-4 py-2"
              type="button"
              onPress={isAStadistics}
            >
              <FontAwesomeIcon icon={faChartSimple} size="lg" color="white" />
              Estadísticas
            </Button>
            <Button
              className="bg-health-primary text-white px-4 py-2"
              type="button"
              onPress={irAGestion}
            >
              <FontAwesomeIcon icon={faGear} size="lg" color="white" />
              Gestionar turnos
            </Button>
            <Button 
              className="bg-health-primary text-white px-4 py-2"
              type="button"
              onPress={irAFormShift} // Aquí se maneja el botón de "Pedir turno"
            >
              <FontAwesomeIcon icon={faPlus} /> Pedir turno
            </Button>
          </div>
        </div>
      }
      body={
        <ShiftsUser
          carroselItems={carroselItems}
          shiftItems={enrichedShiftItems}
        />
      }
    />
  );
};

export default ShiftsPrincipal;
