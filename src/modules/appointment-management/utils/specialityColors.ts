import { Shift } from "@appointment-management/models/shift";

export const getTitleClassName = (specialty: Shift["specialty"]) => {
  const baseClasses = "font-semibold text-lg";
  switch (specialty) {
    case "Medicina general":
      return `${baseClasses} text-health-medicine-primary`;
    case "Psicologia":
      return `${baseClasses} text-health-psychology-primary`;
    case "Odontologia":
      return `${baseClasses} text-health-primary`;
    default:
      return baseClasses;
  }
};
