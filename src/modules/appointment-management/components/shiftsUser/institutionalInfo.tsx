import { useDisclosure } from "@heroui/react";
import { Card, CardHeader, CardBody, Modal, ModalContent } from "@heroui/react";
import Carrosel from "./carrosel/carrosel";
import { GestionMultimediaPanel } from "../gestionMultimediaPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { CarroselProps } from "../../types/carroselType";

const InstitutionalInfo = ({ items }: CarroselProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card>
        <CardHeader
          className="px-4 py-2 flex justify-between items-center text-white rounded-t-xl"
          style={{
            background: "linear-gradient(to right, #00BCFF, #0078B4)",
          }}
        >
          <h4 className="font-bold text-large">Información institucional</h4>
          <button
            className="hover:text-gray-200 transition-colors"
            aria-label="Editar información institucional"
            onClick={onOpen}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </CardHeader>

        <CardBody className="py-0 px-0 flex-col items-start h-[600px]">
          <Carrosel items={items} />
        </CardBody>
      </Card>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        placement="top-center"
        scrollBehavior="inside"
        className="max-h-[90vh] overflow-y-auto"
      >
        <ModalContent>{() => <GestionMultimediaPanel />}</ModalContent>
      </Modal>
    </>
  );
};

export default InstitutionalInfo;
