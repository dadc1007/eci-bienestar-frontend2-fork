import { TurnResponse } from "@/modules/appointment-management/types/dto";
import {
  RoleEnum,
  SpecialityEnum,
} from "@/modules/appointment-management/types/enums";
import { Card, CardBody, CardHeader, ScrollShadow } from "@heroui/react";
import { ShiftItem } from "@modules/appointment-management/components/doctor/ShiftsOnHold";

// Temporal mientras se conecta con el backend
const priorityTurn: TurnResponse = {
  id: 1,
  code: "O-62",
  user: {
    name: "Laura Gomez",
    id: "1032373105",
    role: RoleEnum.STUDENT,
  },
  speciality: SpecialityEnum.GENERAL_MEDICINE,
  priority: true,
};

// Temporal mientras se conecta con el backend
const turn: TurnResponse = {
  id: 1,
  code: "O-62",
  user: {
    name: "Laura Gomez",
    id: "1032373105",
    role: RoleEnum.STUDENT,
  },
  speciality: SpecialityEnum.GENERAL_MEDICINE,
  priority: false,
};

// Temporal mientras se conecta con el backend
const turns: TurnResponse[] = [priorityTurn, turn, turn, turn, turn, turn];

type Props = {
  readonly className?: string;
};

function ShiftsOnHold({ className }: Props) {
  return (
    <Card className={className}>
      <CardHeader
        className="px-4 flex-col items-start text-white rounded-t-xl z-0"
        style={{
          background: "linear-gradient(to right, #00BCFF, #0078B4)",
        }}
      >
        <h4 className="font-bold text-large">Turnos en espera</h4>
      </CardHeader>
      <CardBody className="py-7 px-5">
        <p className="text-gray-600 mb-4">{turns.length} pacientes en espera</p>
        <ScrollShadow hideScrollBar>
          <div className="flex flex-col gap-3">
            {turns.map((turn) => (
              <ShiftItem
                key={turn.id}
                code={turn.code}
                name={turn.user.name}
                priority={turn.priority}
              />
            ))}
          </div>
        </ScrollShadow>
      </CardBody>
    </Card>
  );
}

export default ShiftsOnHold;
