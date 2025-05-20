import React from "react";
import {useNavigate} from "react-router-dom";
import backgroundImage from "../../../assets/images/recreational-rooms.jpg";

interface ActionButtonProps {
    to: string;
    label: string;
    description: string;
}

const RoomActions: React.FC = () => {
    const navigate = useNavigate();

    /**
     * Array of navigation options representing different administrative actions
     * available in the recreational rooms module. Each option contains:
     * - `label`: The display name of the action.
     * - `description`: A brief explanation of the action.
     * - `to`: The route path to navigate for the action.
     */
    const navigationOptions = [
        {
            label: "Salas",
            description: "Administrar salas recreativas disponibles en el campus",
            to: "/modules/recreation/rooms",
        },
        {
            label: "Reservas",
            description: "Administrar reservas de salas y elementos recreativos",
            to: "/modules/recreation/reservations",
        },
        {
            label: "Elementos",
            description: "Administrar elementos recreativos disponibles para préstamo",
            to: "/modules/recreation/items",
        },
    ];

    /**
     * Renders a title overlay for the recreational rooms module.
     * Displays a semi-transparent black background with a welcoming message.
     *
     * @returns {JSX.Element} The title overlay component.
     */
    const Title = () => (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-start p-6 md:p-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white text-left leading-tight drop-shadow-lg">
                Bienvenido al módulo de<br/>salas recreativas
            </h1>
        </div>
    );

    /**
     * Renders a descriptive section for the recreational management options.
     *
     * Displays an introduction and overview of the features available for managing
     * recreational infrastructure, including room administration, reservation management,
     * and control of recreational items for loan within the institution.
     *
     * @returns {JSX.Element} A styled container with a heading and descriptive text.
     */
    const Description = () => (
        <div className="mb-8 mx-auto bg-gray-100 p-6 rounded-2xl shadow-md text-left">
            <h2 className="text-2xl font-semibold text-[#0E7029] mb-4">
                ¡Explora las opciones de gestión recreativa!
            </h2>
            <p className="text-gray-700 leading-relaxed">
                En esta sección podrás gestionar toda la infraestructura recreativa de
                la institución. Administra las salas disponibles, gestiona las reservas
                y controla los elementos recreativos disponibles para préstamo. Puedes
                verificar la disponibilidad en tiempo real, asignar espacios, registrar
                préstamos y devoluciones, todo desde un mismo lugar.
            </p>
        </div>
    );
    /**
     * ActionButton renders a clickable button for navigation with a label and optional tooltip.
     *
     * @param props - The properties for the component.
     * @param props.to - The navigation path to redirect to when the button is clicked.
     * @param props.label - The text displayed on the button.
     * @param props.description - The description text displayed as a tooltip.
     *
     * @returns A styled button component that navigates to the specified path on click.
     */
    const ActionButton: React.FC<ActionButtonProps> = ({to, label, description}) => (
        <div className="relative group mx-4">
            <button
                onClick={() => navigate(to)}
                className="text-[#0E7029] font-medium border-b-2 border-[#0E7029] pb-1 hover:border-b-4 hover:pb-0 transition-all duration-200"
                aria-label={description}
            >
                {label}
            </button>
            <div className="absolute left-0 top-full mt-2 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                {description}
            </div>
        </div>
    );

    return (
        <div className="w-full h-screen flex flex-col">
            {/* Barra de navegación minimalista en la parte superior */}
            <div className="w-full bg-white shadow-sm py-4 px-6 md:px-16">
                <div className="flex flex-wrap justify-center gap-8 border-b border-gray-200">
                    {navigationOptions.map(({label, description, to}) => (
                        <ActionButton
                            key={label}
                            to={to}
                            label={label}
                            description={description}
                        />
                    ))}
                </div>
            </div>

            <div
                className="relative w-full h-64 md:h-96 bg-cover bg-center"
                style={{backgroundImage: `url(${backgroundImage})`}}
            >
                <Title/>
            </div>

            {/* Resto del contenido sigue igual */}
            <div className="flex-1 overflow-y-auto px-6 md:px-16 py-8 w-full">
                <Description/>
                <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
                    <h3 className="text-xl font-medium text-gray-800 mb-4">Instrucciones</h3>
                    <p className="text-gray-600">
                        Selecciona una de las opciones de arriba para gestionar las salas recreativas,
                        reservas o elementos disponibles. Cada sección te permitirá realizar diferentes
                        acciones administrativas relacionadas con los espacios recreativos.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RoomActions;
