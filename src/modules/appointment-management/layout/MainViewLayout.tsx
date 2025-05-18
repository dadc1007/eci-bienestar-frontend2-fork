import Layout from "./layout";
import { ModuleOption } from "@modules/appointment-management/types";
import ServiceCard from "@/common/serviceCard";

type Props = {
  readonly modules: ModuleOption[];
};

function MainViewLayout({ modules }: Props) {
  return (
    <Layout
      header={
        <div className="w-full flex flex-row items-center justify-between bg-white py-5 px-7">
          <h1 className="font-bold text-2xl">¡Bienvenido, Juan Pérez!</h1>
          <div className="flex flex-row items-center justify-between gap-4"></div>
        </div>
      }
      body={
        <div className="w-full h-56 px-5 mt-5 flex flex-wrap justify-evenly items-center gap-5">
          {modules.map((module) => (
            <ServiceCard
              key={module.id}
              title={module.title}
              imageUrl={module.imageUrl}
              linkTo={module.linkTo}
              className="w-1/4 min-w-96"
            />
          ))}
        </div>
      }
    ></Layout>
  );
}

export default MainViewLayout;
