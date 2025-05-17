import { Card, CardBody, CardHeader } from "@heroui/react";
import {
  NoShift,
  ShiftInfo,
} from "@modules/appointment-management/components/doctor/CurrentAttention";

// Temporal mientras se conecta con el backend
const turn: boolean = true;

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
          {turn ? (
            <ShiftInfo
              code={code}
              name={name}
              id={id}
              role={role}
              priority={priority}
            />
          ) : (
            <NoShift />
          )}
        </div>
      </CardBody>
    </Card>
  );
}

export default CurrentAttention;
