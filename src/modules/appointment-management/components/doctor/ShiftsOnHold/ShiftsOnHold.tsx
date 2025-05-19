import {
  useCallTurn,
  useTurnsBySpeciality,
} from "@/modules/appointment-management/hooks/useTurns";
import {
  CallTurnRequest,
  TurnResponse,
} from "@/modules/appointment-management/types/dto";
import { SpecialityEnum } from "@/modules/appointment-management/types/enums";
import {
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  ScrollShadow,
} from "@heroui/react";
import { ShiftItem } from "@modules/appointment-management/components/doctor/ShiftsOnHold";

type Props = {
  readonly className?: string;
  readonly level: number;
  readonly setLevel: (value: number) => void;
};

function ShiftsOnHold({ className, level, setLevel }: Props) {
  const { data, isLoading, error } = useTurnsBySpeciality(
    SpecialityEnum.GENERAL_MEDICINE
  );
  const { mutate: callTurn } = useCallTurn();

  const turns: TurnResponse[] = data?.data ?? [];
  const handleCallTurn = (callTurnRequest: CallTurnRequest) => {
    callTurn(callTurnRequest);
    setLevel(0);
  };

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

        {!isLoading && !error && turns.length === 0 && (
          <p className="text-gray-500">No hay pacientes en espera</p>
        )}

        {!isLoading && !error && turns.length > 0 && (
          <>
            <p className="text-gray-600 mb-4">
              {turns.length} pacientes en espera
            </p>
            <ScrollShadow hideScrollBar>
              <div className="flex flex-col gap-3">
                {turns.map((turn) => (
                  <ShiftItem
                    key={turn.id}
                    turn={turn}
                    level={level}
                    onCallTurn={handleCallTurn}
                  />
                ))}
              </div>
            </ScrollShadow>
          </>
        )}
      </CardBody>
    </Card>
  );
}

export default ShiftsOnHold;
