import {
  CallTurnRequest,
  TurnResponse,
} from "@/modules/appointment-management/types/dto";
import { SpecialityEnum } from "@/modules/appointment-management/types/enums";
import { Button, Card, CardBody, Chip } from "@heroui/react";

type Props = {
  readonly turn: TurnResponse;
  readonly level: number;
  readonly onCallTurn: (callTurnRequest: CallTurnRequest) => void;
};

function ShiftItem({ turn, level, onCallTurn }: Props) {
  const handleCallTurn = () => {
    onCallTurn({
      turnId: turn.id,
      speciality: SpecialityEnum.GENERAL_MEDICINE,
      levelAttention: level,
    });
  };

  return (
    <Card className="shadow-none border border-gray-200">
      <CardBody>
        <div className="flex flex-row items-center justify-between px-2">
          <div>
            <p className="text-xl text-health-primary font-bold">{turn.code}</p>
            <p>{turn.user.name}</p>
            {turn.priority && (
              <Chip color="warning" variant="flat" size="sm" className="mt-3">
                Atención prioritaria
              </Chip>
            )}
          </div>
          <Button
            variant="light"
            className="text-health-primary"
            onPress={handleCallTurn}
          >
            Llamar
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default ShiftItem;
