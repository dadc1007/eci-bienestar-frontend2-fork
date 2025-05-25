import {
  Form as FormHero,
  CheckboxGroup,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Button,
} from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const AddMediaForm = ({
  selectedDuration,
  setSelectedDuration,
}: {
  selectedDuration: string;
  setSelectedDuration: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <FormHero className="flex flex-col gap-8">
      <CheckboxGroup
        isRequired
        label="Tipo de contenido"
        classNames={{
          label: "text-black text-sm",
          wrapper: "flex flex-row gap-8 max-md:!flex-col max-md:!gap-4",
        }}
      >
        <Checkbox value="image">Imagen</Checkbox>
        <Checkbox value="video">Video</Checkbox>
      </CheckboxGroup>

      <Input
        isRequired
        label="Titulo"
        labelPlacement="outside"
        placeholder="Titulo del contenido"
        type="text"
      />
      <Input
        isRequired
        label="URL del contenido"
        labelPlacement="outside"
        placeholder="URL de la imagen o video"
        type="text"
      />

      <Select
        className="max-w"
        label="Duración (segundos)"
        labelPlacement="outside"
        placeholder="Seleccione la duración"
        value={selectedDuration}
        onChange={(e) => setSelectedDuration(e.target.value)}
      >
        {Array.from({ length: 7 }, (_, i) => (i + 1) * 2).map((item) => (
          <SelectItem
            key={item}
            textValue={item.toString() + " segundos"}
            id={item.toString()}
          >
            {item} segundos
          </SelectItem>
        ))}
      </Select>

      <Button
        className="w-full my-2 bg-health-primary text-white"
        type="submit"
      >
        <FontAwesomeIcon icon={faUpload} /> Agregar contenido
      </Button>
    </FormHero>
  );
};

export default AddMediaForm;
