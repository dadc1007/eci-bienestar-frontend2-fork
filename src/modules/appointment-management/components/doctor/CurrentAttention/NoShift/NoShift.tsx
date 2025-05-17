import InfoItem from "../ShiftInfo/InfoItem";
import { Button } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NoShift() {
  return (
    <div className="flex flex-col items-center gap-7">
      <FontAwesomeIcon icon={["fas", "user-check"]} size="3x" />
      <InfoItem
        title="No hay pacientes en atencion"
        value="Llama al siguiente turno para empezar"
      />
      <Button className="bg-health-primary text-white">Llamar turno</Button>
    </div>
  );
}

export default NoShift;
