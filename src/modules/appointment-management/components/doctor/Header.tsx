import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardBody, User } from "@heroui/react";

function Header() {
  return (
    <Card>
      <CardBody>
        <div className="flex flex-row items-center justify-between py-5 px-7 max-md:px-2 max-[450px]:flex-col max-[450px]:gap-5 max-[450px]:py-2">
          <User description="Medico general" name="Daniel Diaz" />
          <Button className="bg-health-primary text-white" type="button">
            <FontAwesomeIcon icon={faPlus} /> Pedir turno
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default Header;
