import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Slider,
} from "@heroui/react";
import { InfoItem } from "@modules/appointment-management/components/doctor/CurrentAttention";

const marks = Array.from({ length: 6 }, (_, i) => ({
  value: i,
  label: i.toString(),
}));

type Props = {
  readonly className?: string;
  readonly code: string;
  readonly name: string;
  readonly id: string;
  readonly role: string;
  readonly priority: boolean;
};

function CurrentAttention({
  className,
  code,
  name,
  id,
  role,
  priority,
}: Props) {
  return (
    <Card className={className}>
      <CardHeader
        className="px-4 flex-col items-start text-white rounded-t-xl z-0"
        style={{
          background: "linear-gradient(to right, #00BCFF, #0078B4)",
        }}
      >
        <h4 className="font-bold text-large">Atención actual</h4>
      </CardHeader>
      <CardBody className="py-10">
        <div className="flex flex-col items-center justify-center h-full">
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
        </div>
      </CardBody>
    </Card>
  );
}

export default CurrentAttention;
