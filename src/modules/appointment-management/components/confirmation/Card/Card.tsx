import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Alert,
  Button,
  Card as HeroCard,
  CardBody,
  CardHeader,
} from "@heroui/react";
import { InfoItem } from "../../../components/confirmation";
import styles from "./Card.module.css";

type Props = {
  readonly themeColor: "medicine" | "dentistry" | "psychology";
  readonly patientName: string;
  readonly speciality: string;
  readonly date: string;
};

const Card = ({ themeColor, patientName, speciality, date }: Props) => {
  return (
    <HeroCard>
      <CardHeader
        className={`${
          styles[`bg-gradient-health-${themeColor}`]
        } p-8 flex flex-col gap-5`}
      >
        <FontAwesomeIcon
          icon={["far", "circle-check"]}
          className="text-white"
          size="4x"
        />
        <h1 className="text-2xl text-white font-bold">¡Turno confirmado!</h1>
        <p className="text-4xl text-white font-bold p-6 bg-white/20 rounded-full">
          O-73
        </p>
      </CardHeader>
      <CardBody>
        <div className="flex items-center mt-5 mx-5 max-[540px]:mx-2">
          <div className={styles.circle}></div>
          <div className="flex-grow border-t-2 border-dashed border-gray-100"></div>
          <div className={styles.circle}></div>
        </div>
        <div className="flex flex-col gap-8 m-8 max-[540px]:mx-5">
          <InfoItem
            title="Paciente"
            info={patientName}
            icon={["far", "user"]}
            color={themeColor}
          />
          <InfoItem
            title="Especialidad"
            info={speciality}
            icon={["fas", "stethoscope"]}
            color={themeColor}
          />
          <InfoItem
            title="Fecha"
            info={date}
            icon={["far", "calendar"]}
            color={themeColor}
          />
          <Alert
            color="primary"
            title="Por favor, esté atento a la pantalla de llamado de turnos"
          ></Alert>
          <Button
            color="default"
            variant="bordered"
            startContent={<FontAwesomeIcon icon={["fas", "arrow-left"]} />}
          >
            Volver a registro
          </Button>
        </div>
      </CardBody>
    </HeroCard>
  );
};

export default Card;
