import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  NavbarItem,
} from "@heroui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell } from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

interface LayoutProps {
  header: React.ReactNode;
  body: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ header, body }) => {
  return (
    <div className="w-full flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      <Navbar 
      isBordered maxWidth="full" 
      position="static"
      style={{ backgroundColor: "#0078B4" }}>
        <NavbarBrand className="font-bold text-xl tracking-tight text-white dark:text-white">
          ECI Bienestar
        </NavbarBrand>

        <NavbarContent as="div" justify="end" className="gap-6">
          <NavbarItem className="cursor-pointer hover:text-blue-600 transition-colors">
            <FontAwesomeIcon icon={faBell} size="lg" color="white"/>
          </NavbarItem>

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <button className="hover:text-blue-600 transition-colors">
                <FontAwesomeIcon icon={faUser} size="lg" color="white"/>
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Sesión iniciada como</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">zoey@example.com</p>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          
          <NavbarItem className="cursor-pointer hover:text-red-500 transition-colors">
            <FontAwesomeIcon icon={faRightFromBracket} size="lg" color="white"/>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <header className="w-full">
        {header}
      </header>

      <main className="w-full">
        {body}
      </main>
    </div>
  );
};

export default Layout;
