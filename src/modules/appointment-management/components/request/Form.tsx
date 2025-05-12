import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  Form as FormHero,
  SelectItem,
  CheckboxGroup,
  Checkbox,
  Button,
} from "@heroui/react";
import { useState } from "react";
import { specialties } from "../../../appointment-management/data/specialties";

interface FormProps {
  onSubmitAction?: () => void;
}

const Form: React.FC<FormProps> = ({ onSubmitAction }) => {
  const [isInvalidRole, setIsInvalidRole] = useState(false);

  return (
    <Card className="p-5">
      <CardHeader className="flex flex-col items-start gap-2">
        <h1 className="text-3xl font-bold max-sm:text-2xl">
          Registro de usuario
        </h1>
        <p className="text-xs font-normal">
          Ingrese sus datos para obtener un turno de atencion
        </p>
      </CardHeader>
      <CardBody>
        <FormHero
          className="flexx flex-col gap-8"
          onSubmit={(e) => {
            e.preventDefault();
            if (onSubmitAction) onSubmitAction(); // Ejecuta la acción proporcionada por el prop
          }}
        >
          <Input
            isRequired
            label="Nombre completo"
            labelPlacement="outside"
            placeholder="Ingrese su nombre"
            type="text"
            validate={(value) => {
              if (value.length === 0) {
                return "Ingrese su nombre completo";
              }
            }}
          />
          <Input
            isRequired
            label="Documento de identidad"
            labelPlacement="outside"
            placeholder="Ingrese su numero de documento"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            onKeyDown={(e) => {
              const key = e.key;
              if (!/^\d$/.test(key)) e.preventDefault();
            }}
            validate={(value) => {
              if (value.length !== 10) {
                return "El numero de documento debe contener 10 digitos";
              }
            }}
          />
          <CheckboxGroup
            isRequired
            description="Selecciona un rol"
            isInvalid={isInvalidRole}
            label="Rol en la institucion"
            onValueChange={(value) => {
              setIsInvalidRole(value.length !== 1);
            }}
            classNames={{
              wrapper: "flex flex-row gap-8 max-md:!flex-col max-md:!gap-4",
            }}
          >
            <Checkbox value="student">Estudiante</Checkbox>
            <Checkbox value="teacher">docente</Checkbox>
            <Checkbox value="admin">administrativo</Checkbox>
            <Checkbox value="general services">servicios generales</Checkbox>
          </CheckboxGroup>
          <Select
            isRequired
            errorMessage="Seleccione una especialidad"
            label="Especialidad"
            labelPlacement="outside"
            placeholder="Seleccione una especialidad"
          >
            {specialties.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>
          <CheckboxGroup
            description="Seleccione si aplica alguna condicion especial"
            label="Prioridad especial"
            radius="none"
            classNames={{
              wrapper: "flex flex-row gap-8 max-sm:!flex-col max-sm:!gap-4",
            }}
          >
            <Checkbox value="student">Discapacidad</Checkbox>
            <Checkbox value="teacher">Embarazo</Checkbox>
          </CheckboxGroup>
          <Button
            className="bg-health-primary text-white w-full"
            type="submit"
          >
            Solicitar turno
          </Button>
        </FormHero>
      </CardBody>
    </Card>
  );
};

export default Form;
