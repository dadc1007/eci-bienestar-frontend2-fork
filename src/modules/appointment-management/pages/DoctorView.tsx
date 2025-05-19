import Layout from "@/modules/appointment-management/layout/layout";
import {
  Header,
  CurrentAttention,
  ShiftsOnHold,
} from "@modules/appointment-management/components/doctor";
import { useState } from "react";

function DoctorView() {
  const [level, setLevel] = useState<number>(0);

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
              level={level}
              setLevel={setLevel}
            />
            <ShiftsOnHold
              className="w-1/2 max-md:w-full max-md:h-[650px]"
              setLevel={setLevel}
              level={level}
            />
          </div>
        </div>
      }
    ></Layout>
  );
}

export default DoctorView;
