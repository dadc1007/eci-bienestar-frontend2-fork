import { useState } from "react";
import { Alert, Button } from "@heroui/react";
import Layout from "../../../appointment-management/layout/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Form from "../../components/request/Form"; // Importar el formulario
import { Card } from "../../../appointment-management/components/confirmation"; // Importar la tarjeta de confirmación
import { useNavigate } from "react-router-dom";
import { TurnResponse } from "../../types/dto";

const FormShift = () => {
  const navigate = useNavigate();
  const [userFound, setUserFound] = useState<boolean>(true);
  const [userHasTurn, setUserHasTurn] = useState<boolean>(false);
  const [turnResponse, setTurnResponse] = useState<TurnResponse | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const handleFormSubmit = (bool: boolean) => {
    setIsFormSubmitted(bool);
  };

  return (
    <Layout
      header={
        <div className="w-full flex flex-row items-center justify-between bg-white py-5 px-7">
          <h1 className="font-bold text-2xl">Sistema de turnos</h1>
          <div className="flex flex-row items-center justify-between gap-4">
            <Button
              className="bg-health-primary text-white px-4 py-2"
              type="button"
              onPress={() => navigate(-1)}
            >
              <FontAwesomeIcon icon={faArrowLeft} size="lg" color="white" />{" "}
              Volver
            </Button>
          </div>
        </div>
      }
      body={
        <div className="flex flex-col items-center justify-center w-full h-full p-2">
          <div className="w-1/2 h-1/2">
            {!isFormSubmitted ? (
              <div className="flex flex-col gap-5">
                {!userFound && (
                  <Alert
                    icon={
                      <FontAwesomeIcon icon={["fas", "user-xmark"]} size="3x" />
                    }
                    description="El usuario no se encontro en el sistema"
                    title="Usuario no encontrado"
                    color="warning"
                  />
                )}
                {userHasTurn && (
                  <Alert
                    icon={
                      <FontAwesomeIcon icon={["fas", "user-xmark"]} size="3x" />
                    }
                    description="El usuario ya tiene un turno pendiente"
                    title="Usuario con turno"
                    color="warning"
                  />
                )}
                <Form
                  setUserFound={setUserFound}
                  setUserHasTurn={setUserHasTurn}
                  setTurnResponse={setTurnResponse}
                  onSubmitAction={handleFormSubmit}
                />
              </div>
            ) : (
              <Card
                turnResponse={turnResponse!}
                setTurnResponse={setTurnResponse}
                onSubmitAction={handleFormSubmit}
              />
            )}
          </div>
        </div>
      }
    ></Layout>
  );
};

export default FormShift;
