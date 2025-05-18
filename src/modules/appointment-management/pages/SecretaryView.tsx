import { MainViewLayout } from "@modules/appointment-management/layout";
import { secretaryModules } from "@modules/appointment-management/data";

function SecretaryView() {
  return <MainViewLayout modules={secretaryModules} />;
}

export default SecretaryView;
