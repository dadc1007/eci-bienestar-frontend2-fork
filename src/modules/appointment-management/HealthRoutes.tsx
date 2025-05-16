import { useState } from "react";
import ShiftsPrincipal from "./features/ShiftsPrincipal/ShiftsPrincipal";
import GestionShifts from "./features/gestionShifts/gestionShifts";
import FormShift from "./features/formshift/formshift";
import StadisticsShifts from "./features/Stadistics/Stadistics";


const HealthRoutes = () => {
  const [vista, setVista] = useState<"principal" | "gestion" | "formShift" | "estadistics">("principal");

  return (
    <>
      {vista === "principal" && <ShiftsPrincipal isAStadistics={() => setVista("estadistics")} irAGestion={() => setVista("gestion")} irAFormShift={() => setVista("formShift")} />}
      {vista === "estadistics" && <StadisticsShifts volver={() => setVista("principal")} />}
      {vista === "gestion" && <GestionShifts volver={() => setVista("principal")} />}
      {vista === "formShift" && <FormShift volver={() => setVista("principal")} />}
    </>
  );
};

export default HealthRoutes;