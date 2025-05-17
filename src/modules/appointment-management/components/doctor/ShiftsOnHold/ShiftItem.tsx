import { Button, Card, CardBody, Chip } from "@heroui/react";

type Props = {
  readonly code: string;
  readonly name: string;
  readonly priority: boolean;
};

function ShiftItem({ code, name, priority }: Props) {
  return (
    <Card className="shadow-none border border-gray-200">
      <CardBody>
        <div className="flex flex-row items-center justify-between px-2">
          <div>
            <p className="text-xl text-health-primary font-bold">{code}</p>
            <p>{name}</p>
            {priority && (
              <Chip color="warning" variant="flat" size="sm" className="mt-3">
                Atención prioritaria
              </Chip>
            )}
          </div>
          <Button variant="light" className="text-health-primary">
            Llamar
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default ShiftItem;
