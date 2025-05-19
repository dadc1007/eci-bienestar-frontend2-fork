import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../../assets/images/recreational-rooms.jpg";

interface CardPageComponentProps {
    to: string;
    icon: string;
    label: string;
    description: string;
}

const RoomActions: React.FC = () => {
    const navigate = useNavigate();

    const roomImage =
        "https://images.unsplash.com/photo-1503011510-c0e00592713b?q=80&w=500&auto=format";
    const reservationImage =
        "https://images.unsplash.com/photo-1503011510-c0e00592713b?q=80&w=500&auto=format";
    const itemsImage =
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=500&auto=format";

    /**
     * Array of card objects representing different administrative actions
     * available in the recreational rooms module. Each card contains:
     * - `icon`: The image/icon associated with the action.
     * - `label`: The display name of the action.
     * - `description`: A brief explanation of the action.
     * - `to`: The route path to navigate for the action.
     */
    const cards = [
        {
            icon: roomImage,
            label: "Salas",
            description: "Administrar salas recreativas disponibles en el campus",
            to: "/modules/recreation/rooms",
        },
        {
            icon: reservationImage,
            label: "Reservas",
            description: "Administrar reservas de salas y elementos recreativos",
            to: "/modules/recreation/reservations",
        },
        {
            icon: itemsImage,
            label: "Elementos",
            description:
                "Administrar elementos recreativos disponibles para préstamo",
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
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end justify-start p-6 md:p-16">
            <h1 className="text-3xl md:text-5xl font-bold text-white text-left">
                Bienvenido al módulo de
                <br />
                salas recreativas
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
     * CardPageComponent renders a clickable card with an image, label, and description.
     * 
     * @param props - The properties for the component.
     * @param props.to - The navigation path to redirect to when the card is clicked.
     * @param props.icon - The URL of the icon/image to display at the top of the card.
     * @param props.label - The main label text displayed on the card.
     * @param props.description - The description text displayed below the card.
     * 
     * @returns A styled card component that navigates to the specified path on click.
     */
    const CardPageComponent: React.FC<CardPageComponentProps> = ({ to, icon, label, description }) => (
        <div className="flex flex-col items-center">
            <button
                onClick={() => navigate(to)}
                className="w-full bg-[#0E7029] rounded-xl overflow-hidden shadow-md hover:bg-green-800 transition-all group"
            >
                <div className="w-full h-40 overflow-hidden">
                    <img
                        src={icon}
                        alt={label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                </div>
                <div className="py-3">
                    <span className="block text-center text-lg font-semibold text-white">
                        {label}
                    </span>
                </div>
            </button>
            <p className="mt-2 text-center text-sm text-gray-600">
                {description}
            </p>
        </div>
    );

    return (
        <div className="w-full h-screen flex flex-col">
            <div
                className="relative w-full h-64 md:h-80 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <Title />
            </div>

            <div className="flex-1 overflow-y-auto px-6 md:px-16 py-8 w-full">
                <Description />

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cards.map(({ icon, label, description, to }) => (
                        <CardPageComponent
                            key={label}
                            to={to}
                            icon={icon}
                            label={label}
                            description={description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoomActions;
