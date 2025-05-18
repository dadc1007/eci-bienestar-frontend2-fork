import {
  useCallNextTurn,
  useCurrentTurnBySpeciality,
} from "@/modules/appointment-management/hooks/useTurns";
import {
  CallTurnRequest,
  TurnResponse,
} from "@/modules/appointment-management/types/dto";
import { SpecialityEnum } from "@/modules/appointment-management/types/enums";
import { Card, CardBody, CardHeader, CircularProgress } from "@heroui/react";
import {
  NoShift,
  ShiftInfo,
} from "@modules/appointment-management/components/doctor/CurrentAttention";

type Props = {
  readonly className?: string;
  readonly level: number;
  readonly setLevel: (value: number) => void;
};

function CurrentAttention({ className, level, setLevel }: Props) {
  const { data, isLoading, error } = useCurrentTurnBySpeciality(
    SpecialityEnum.GENERAL_MEDICINE
  );
  const { mutate: callNextTurn } = useCallNextTurn();

  const turn: TurnResponse | undefined = data?.data;
  const handleCallNext = (callTurnRequest: CallTurnRequest) => {
    callNextTurn(callTurnRequest);
  };

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
        {isLoading && (
          <CircularProgress
            className="w-full h-full flex items-center m-auto"
            aria-label="Cargando..."
            size="lg"
          />
        )}

        {!isLoading && error && (
          <p className="text-red-500">
            Ocurrió un error al cargar los turnos: {error.message}
          </p>
        )}

        {!isLoading && !error && turn == null && (
          <div className="flex flex-col items-center justify-center h-full">
            <NoShift onCallTurn={handleCallNext} />
          </div>
        )}

        {!isLoading && !error && turn != null && (
          <div className="flex flex-col items-center justify-center h-full">
            <ShiftInfo
              turn={turn}
              level={level}
              setLevel={setLevel}
              onCallTurn={handleCallNext}
            />
          </div>
        )}
      </CardBody>
    </Card>
  );
}

export default CurrentAttention;
