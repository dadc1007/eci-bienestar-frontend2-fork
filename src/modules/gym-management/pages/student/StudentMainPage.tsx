import { FaUser, FaRunning, FaDumbbell, FaHeartbeat } from "react-icons/fa";
const StudentMainPage = () => {
    const reservations = [
        {
            id: 1,
            timeRange: "10:00 AM - 11:00 AM",
            trainer: "Juan Pérez",
            status: "Confirmada",
        },
        {
            id: 2,
            timeRange: "2:00 PM - 3:00 PM",
            trainer: "María López",
            status: "Pendiente",
        },
        {
            id: 3,
            timeRange: "6:00 PM - 7:00 PM",
            trainer: "Carlos Gómez",
            status: "Cancelada",
        },
    ];

    const routines = [
        { id: 1, name: "Cardio", icon: <FaRunning className="text-lg" /> },
        { id: 2, name: "Pectorales", icon: <FaDumbbell className="text-lg" /> },
        { id: 3, name: "Salud cardiovascular", icon: <FaHeartbeat className="text-lg" /> },
    ];

    const measurements = {
        date: "2023-10-01",
        weight: "70 kg",
        height: "175 cm",
        waists: "80 cm",
        chest: "95 cm",
        arms: {
            right: "35 cm",
            left: "34 cm",
        },
        legs: {
            right: "55 cm",
            left: "54 cm",
        },
        shoulders: "110 cm",
    };

    const handleRoutineClick = (routineName: string) => {
        alert(`La funcionalidad para la rutina "${routineName}" aún no está implementada.`);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 space-y-6">
                {/* Sección de Reservas */}
                <div className="p-4 bg-black text-white rounded-lg">
                    <h1 className="text-xl font-bold">Reservas de Hoy</h1>
                </div>
                <div className="space-y-4">
                    {reservations.map((reservation) => (
                        <div
                            key={reservation.id}
                            className="p-4 rounded-lg bg-black text-white shadow-md flex justify-between items-center"
                        >
                            <div>
                                <p className="text-sm font-semibold">⏰ {reservation.timeRange}</p>
                                <p className="text-sm">👤 Entrenador: {reservation.trainer}</p>
                                <p
                                    className={`text-sm font-semibold ${
                                        reservation.status === "Confirmada"
                                            ? "text-green-400"
                                            : reservation.status === "Pendiente"
                                            ? "text-yellow-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    📌 Estado: {reservation.status}
                                </p>
                            </div>
                            <button
                                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center"
                                onClick={() => alert("Perfil del entrenador no implementado")}
                            >
                                <FaUser className="text-white text-lg" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Sección dividida en dos columnas */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Columna izquierda: Rutinas */}
                    <div className="p-4 bg-black text-white rounded-lg">
                        <h2 className="text-xl font-bold">Mis Rutinas</h2>
                        <div className="space-y-4 mt-4">
                            {routines.map((routine) => (
                                <div
                                    key={routine.id}
                                    className="p-4 rounded-lg bg-gray-800 text-white shadow-md flex justify-between items-center cursor-pointer hover:bg-gray-700"
                                    onClick={() => handleRoutineClick(routine.name)}
                                >
                                    <p className="text-sm font-semibold">{routine.name}</p>
                                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                                        {routine.icon}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Columna derecha: Últimas medidas */}
                    <div className="p-4 bg-black text-white rounded-lg">
                        <h2 className="text-xl font-bold">Mis Últimas Medidas</h2>
                        <div className="mt-4 space-y-2">
                            <p className="text-sm font-semibold">📅 Fecha: {measurements.date}</p>
                            <p className="text-sm font-semibold">⚖️ Peso: {measurements.weight}</p>
                            <p className="text-sm font-semibold">📏 Altura: {measurements.height}</p>
                            <p className="text-sm font-semibold">🪢 Cintura: {measurements.waists}</p>
                            <p className="text-sm font-semibold">💪 Pecho: {measurements.chest}</p>
                            <p className="text-sm font-semibold">💪 Brazo Derecho: {measurements.arms.right}</p>
                            <p className="text-sm font-semibold">💪 Brazo Izquierdo: {measurements.arms.left}</p>
                            <p className="text-sm font-semibold">🦵 Pierna Derecha: {measurements.legs.right}</p>
                            <p className="text-sm font-semibold">🦵 Pierna Izquierda: {measurements.legs.left}</p>
                            <p className="text-sm font-semibold">🏋️ Hombros: {measurements.shoulders}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentMainPage;