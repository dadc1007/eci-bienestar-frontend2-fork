import { Card, CardHeader, CardBody } from "@heroui/react";

type Props = {
  children?: React.ReactNode;
};

const ShiftActual = ({ children }: Props) => {
  return (
    <Card>
      <CardHeader
        className="px-4 flex-col items-start text-white rounded-t-xl z-0"
        style={{
          background: "linear-gradient(to right, #00BCFF, #0078B4)",
        }}
      >
        <h4 className="font-bold text-large">Atendiendo ahora</h4>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
};

export default ShiftActual;
