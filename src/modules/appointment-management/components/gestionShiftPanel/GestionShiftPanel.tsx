import {
  Card,
  CardBody,
  CardHeader,
  Form as FormHero,
  Tab,
  Tabs,
  Alert,
} from "@heroui/react";
import { specialties } from "../../../appointment-management/data/specialties";
import { hookGestionShiftPanel } from "../../../appointment-management/hooks";
import SpecialtyToggle from "./SpecialtyToggle";
import ShiftsStatus from "./ShiftsStatus";

const GestionShiftPanel = () => {
  const {
    availability,
    availabilityShifts,
    toggleSpecialty,
    toggleShiftAvailability,
  } = hookGestionShiftPanel();

  return (
    <Card className="p-5">
      <CardHeader className="flex flex-col items-start gap-2">
        <h1 className="text-3xl font-bold max-sm:text-2xl">
          Panel de administrador
        </h1>
        <p className="text-xs font-normal text-zinc-500">
          Gestión de disponibilidad de turnos
        </p>
      </CardHeader>

      <Tabs aria-label="Options" fullWidth>
        <Tab key="speciality" title="Especialidad">
          <Card>
            <CardHeader className="flex flex-col items-start gap-2 px-5">
              <p className="text-l">
                Gestión de disponibilidad por especialidad
              </p>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <FormHero
                className="flex flex-col gap-8"
                onSubmit={(e) => e.preventDefault()}
              >
                {specialties.map((specialty) => (
                  <SpecialtyToggle
                    key={specialty.key}
                    specialty={specialty}
                    isGlobalEnabled={availabilityShifts}
                    isAvailable={availability[specialty.key]}
                    onToggle={() => toggleSpecialty(specialty.key)}
                  />
                ))}

                {!availabilityShifts && (
                  <Alert
                    color="warning"
                    className="w-full"
                    description="La gestión de disponibilidad está deshabilitada. Habilite los turnos para poder gestionar la disponibilidad."
                  />
                )}
              </FormHero>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="shifts" title="Turnos">
          <Card>
            <CardHeader className="flex flex-col items-start gap-2">
              <ShiftsStatus
                isEnabled={availabilityShifts}
                onToggle={toggleShiftAvailability}
              />
            </CardHeader>
          </Card>
        </Tab>
      </Tabs>
    </Card>
  );
};

export default GestionShiftPanel;
