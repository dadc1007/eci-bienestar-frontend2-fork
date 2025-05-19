import { Button } from "@heroui/react";
import Layout from "../../layout/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faGear,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import ShiftsUser from "../../components/shiftsUser/shiftsUser";
import { shiftItems, carroselItems, users } from "./datosMock";
import { useNavigate } from "react-router-dom";

const enrichedShiftItems = shiftItems.map((shift) => {
  const user = users.find((u) => u.id === shift.UserId);
  return {
    ...shift,
    turn: shift.code,
    namePatient: user?.name || "Paciente desconocido",
  };
});

const ShiftsPrincipal = () => {
  const navigate = useNavigate();

  return (
    <Layout
      header={
        <div className="w-full flex flex-row items-center justify-between bg-white py-5 px-7">
          <h1 className="font-bold text-2xl">Sistema de turnos</h1>
          <div className="flex flex-row items-center justify-between gap-4">
            <Button
              className="bg-health-primary text-white px-4 py-2"
              type="button"
              onPress={() =>
                navigate("/modules/appointment-management/statistics")
              }
            >
              <FontAwesomeIcon icon={faChartSimple} size="lg" color="white" />
              Estadísticas
            </Button>
            <Button
              className="bg-health-primary text-white px-4 py-2"
              type="button"
              onPress={() =>
                navigate("/modules/appointment-management/manage-shifts")
              }
            >
              <FontAwesomeIcon icon={faGear} size="lg" color="white" />
              Gestionar turnos
            </Button>
            <Button
              className="bg-health-primary text-white px-4 py-2"
              type="button"
              onPress={() =>
                navigate("/modules/appointment-management/request-shifts")
              }
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
