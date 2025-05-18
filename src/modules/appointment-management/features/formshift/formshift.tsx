import { useState } from "react";
import { Button } from "@heroui/react";
import Layout from "../../../appointment-management/layout/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Form from "../../components/request/Form"; // Importar el formulario
import { Card } from "../../../appointment-management/components/confirmation"; // Importar la tarjeta de confirmación
import { useNavigate } from "react-router-dom";

const FormShift = () => {
  const navigate = useNavigate();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Estado para controlar si el formulario fue enviado

  const handleFormSubmit = () => {
    setIsFormSubmitted(true); // Cambiar el estado cuando se envíe el formulario
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
              <Form onSubmitAction={handleFormSubmit} />
            ) : (
              <Card
                themeColor="medicine"
                patientName="John Doe"
                speciality="Medicina General"
                date="2023-10-01"
              />
            )}
          </div>
        </div>
      }
    ></Layout>
  );
};

export default FormShift;
