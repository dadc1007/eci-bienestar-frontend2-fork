import { useState } from "react";
import { specialties } from "../../appointment-management/data/specialties";

const hookGestionShiftPanel = () => {
  const [availability, setAvailability] = useState(
    Object.fromEntries(specialties.map((s) => [s.key, true]))
  );

  const [availabilityShifts, setAvailabilityShifts] = useState(true);

  const toggleShiftAvailability = () => setAvailabilityShifts((prev) => !prev);

  const toggleSpecialty = (key: string) =>
    setAvailability((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

  return {
    availability,
    availabilityShifts,
    toggleShiftAvailability,
    toggleSpecialty,
  };
};

export default hookGestionShiftPanel;
