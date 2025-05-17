import { Button, Chip, Slider } from "@heroui/react";
import InfoItem from "./InfoItem";

const marks = Array.from({ length: 6 }, (_, i) => ({
  value: i,
  label: i.toString(),
}));

type Props = {
  readonly code: string;
  readonly name: string;
  readonly id: string;
  readonly role: string;
  readonly priority: boolean;
};

function ShiftInfo({ code, name, id, role, priority }: Props) {
  return (
    <>
      <div className="flex flex-col items-center gap-2 mb-8">
        <h2 className="text-4xl font-bold text-health-primary">{code}</h2>
        {priority && (
          <Chip color="warning" variant="flat" size="sm">
            Atención prioritaria
          </Chip>
        )}
      </div>
      <div className="flex flex-col gap-5">
        <InfoItem title="Nombre del paciente" value={name} />
        <InfoItem title="Documento de identidad" value={id} />
        <InfoItem title="Rol" value={role} />
      </div>
      <div className="flex gap-4 my-16">
        <Button color="danger">Finalizar turno</Button>
        <Button className="bg-health-primary text-white">
          Llamar siguiente
        </Button>
      </div>
      <div className="flex flex-col items-center w-10/12">
        <Slider
          color="warning"
          size="sm"
          defaultValue={0}
          label="Calidad de la atencion"
          marks={marks}
          maxValue={5}
          minValue={0}
          showTooltip={true}
          step={1}
        />
      </div>
    </>
  );
}

export default ShiftInfo;
