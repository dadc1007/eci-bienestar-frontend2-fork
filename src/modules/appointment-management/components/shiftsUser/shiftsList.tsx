import { Card, CardHeader, CardBody } from "@heroui/react";

type ShiftsListProps = {
  children?: React.ReactNode;
};

const ShiftsList = ({ children }: ShiftsListProps) => {
  return (
    <Card className="h-full">
      <CardHeader
        className="px-4 flex-col items-start text-white rounded-t-xl z-0"
        style={{
          background: "linear-gradient(to right, #00BCFF, #0078B4)",
        }}
      >
        <h4 className="font-bold text-large">Próximos</h4>
      </CardHeader>
      <CardBody className="">{children}</CardBody>
    </Card>
  );
};

export default ShiftsList;
