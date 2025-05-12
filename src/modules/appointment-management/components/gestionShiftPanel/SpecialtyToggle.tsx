import { Switch } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  specialty: { key: string; label: string };
  isAvailable: boolean;
  isGlobalEnabled: boolean;
  onToggle: () => void;
};

const SpecialtyToggle = ({
  specialty,
  isAvailable,
  isGlobalEnabled,
  onToggle,
}: Props) => {
  const active = isGlobalEnabled && isAvailable;

  return (
    <div
      className="w-full flex justify-between items-center"
      key={specialty.key}
    >
      <div className="flex items-center gap-2 px-2">
        <FontAwesomeIcon
          icon={active ? faCheckCircle : faTimesCircle}
          className={active ? "text-green-500" : "text-red-500"}
        />
        <span>{specialty.label}</span>
      </div>

      <div className="flex items-center gap-2 px-2">
        <span className="text-sm text-gray-500">
          {active ? "Disponible" : "No disponible"}
        </span>
        <Switch
          isSelected={active}
          aria-label={specialty.label}
          checked={isAvailable}
          onChange={onToggle}
          isDisabled={!isGlobalEnabled}
          classNames={{
            wrapper: active ? "bg-health-primary" : "bg-gray-300",
          }}
        />
      </div>
    </div>
  );
};

export default SpecialtyToggle;
