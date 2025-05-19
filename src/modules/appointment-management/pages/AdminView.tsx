import { MainViewLayout } from "@modules/appointment-management/layout";
import { commonModules } from "@modules/appointment-management/data";

function AdminView() {
  return <MainViewLayout modules={commonModules} />;
}

export default AdminView;
