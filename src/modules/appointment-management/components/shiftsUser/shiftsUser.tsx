import InstitutionalInfo from "./institutionalInfo";
import ShiftActual from "./shiftActual";
import ShiftsList from "./shiftsList";
import { InfoCardItem } from "../../../appointment-management/components/InfoCardItem";
import type { CarroselProps } from "../../../appointment-management/types/carroselType";
import type { User } from "../../../appointment-management/models/User";
import type { Shift } from "../../../appointment-management/models/shift";
import { getTitleClassName } from "../../../appointment-management/utils/specialityColors";

type Props = {
  shiftItems: (Shift & { namePatient: User["name"]; turn: string })[];
  carroselItems: CarroselProps["items"];
};

const ShiftsUser = ({ shiftItems, carroselItems }: Props) => {
  const [firstShift, ...otherShifts] = shiftItems;

  return (
    <div className="px-6 py-4">
      <div className="w-full h-full flex flex-row gap-4">
        <div className="flex-[2]">
          <ShiftsList>
            {otherShifts.map((shift) => (
              <InfoCardItem
                key={shift.id}
                id={shift.id}
                title={shift.turn}
                titleClassName={getTitleClassName(shift.specialty)}
                subtitle={shift.namePatient}
              >
                <p className="text-zinc-400">{shift.specialty}</p>
              </InfoCardItem>
            ))}
          </ShiftsList>
        </div>

        <div className="flex-[3] flex flex-col gap-4 h-full">
          <ShiftActual>
            {firstShift && (
              <InfoCardItem
                key={firstShift.id}
                id={firstShift.id}
                title={firstShift.turn}
                titleClassName={getTitleClassName(firstShift.specialty)}
                subtitle={firstShift.namePatient}
              >
                <p className="text-zinc-400">{firstShift.specialty}</p>
              </InfoCardItem>
            )}
          </ShiftActual>

          <InstitutionalInfo items={carroselItems} />
        </div>
      </div>
    </div>
  );
};

export default ShiftsUser;
