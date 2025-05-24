import {
  Form as FormHero,
  Input,
  Button,
  RadioGroup,
  Radio,
} from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { TypeEnum } from "@modules/appointment-management/types/enums";
import { useMultimedia } from "@modules/appointment-management/hooks";
import { CreateMultimediaRequest } from "@modules/appointment-management/types/dto";
import { typeLabels } from "@modules/appointment-management/constants";

const AddMediaForm = () => {
  const [selectedType, setSelectedType] = useState<TypeEnum | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [selectedDuration, setSelectedDuration] = useState<number>(5);
  const { mutate: uploadMutation, isPending } = useMultimedia();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const request: CreateMultimediaRequest = {
      name: title,
      file: file!,
      duration: selectedDuration,
      type: selectedType!,
    };

    uploadMutation(request, {
      onSuccess: () => {
        alert("Archivo multimedia subido correctamente");
        setSelectedType(null);
        setTitle("");
        setFile(null);
        setSelectedDuration(5);
      },
      onError: (error: any) => {
        alert("Error al subir archivo multimedia: " + error.message);
      },
    });
  };

  return (
    <FormHero onSubmit={handleSubmit} className="flex flex-col gap-8">
      <RadioGroup
        isRequired
        label="Tipo de contenido"
        value={selectedType ?? ""}
        onValueChange={(value) => setSelectedType(value as TypeEnum)}
        classNames={{
          label: "text-black text-sm",
          wrapper: "flex flex-row gap-8 max-md:!flex-col max-md:!gap-4",
        }}
      >
        {Object.values(TypeEnum).map((type) => (
          <Radio key={type} value={type}>
            {typeLabels[type]}
          </Radio>
        ))}
      </RadioGroup>
      <Input
        isRequired
        label="Título"
        labelPlacement="outside"
        placeholder="Título del contenido"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        isRequired
        label="Archivo multimedia"
        labelPlacement="outside"
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          setFile(file ?? null);
        }}
      />
      <Input
        isRequired
        label="Duración (segundos)"
        labelPlacement="outside"
        placeholder="Ingrese la duración en segundos"
        type="number"
        min={1}
        value={selectedDuration.toString()}
        onChange={(e) => setSelectedDuration(Number(e.target.value))}
      />
      <Button
        className="w-full my-2 bg-health-primary text-white"
        type="submit"
        disabled={isPending}
      >
        <FontAwesomeIcon icon={faUpload} />{" "}
        {isPending ? "Subiendo..." : "Agregar contenido"}
      </Button>
    </FormHero>
  );
};

export default AddMediaForm;
