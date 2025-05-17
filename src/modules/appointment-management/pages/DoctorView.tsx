import Layout from "@/modules/appointment-management/layout/layout";
import {
  Header,
  CurrentAttention,
  ShiftsOnHold,
} from "@modules/appointment-management/components/doctor";
import { TurnResponse } from "@modules/appointment-management/types/dto";
import {
  RoleEnum,
  SpecialityEnum,
} from "@modules/appointment-management/types/enums";

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

function DoctorView() {
  return (
    <Layout
      header={
        <div className="w-full flex flex-row items-center justify-between bg-white py-5 px-7">
          <h1 className="font-bold text-2xl">Sistema de turnos</h1>
          <div className="flex flex-row items-center justify-between gap-4"></div>
        </div>
      }
      body={
        <div className="w-11/12 m-auto max-w-6xl">
          <Header />
          <div className="flex flex-row gap-5 my-8 h-[650px] max-md:flex-col max-md:h-auto">
            <CurrentAttention
              className="w-1/2 max-md:w-full"
              code={turn.code}
              id={turn.user.id}
              name={turn.user.name}
              role={turn.user.role}
              priority={turn.priority}
            />
            <ShiftsOnHold className="w-1/2 max-md:w-full max-md:h-[650px]" />
          </div>
        </div>
      }
    ></Layout>
  );
}

export default DoctorView;
