const TrainerMainPage = () => {
    const today = new Date().toLocaleDateString("es-ES", { weekday: "long" });

    const sessions = [
        {
            id: 1,
            name: "Sesión gimnasio",
            day: today,
            time: "10:00 AM",
            students: 5,
        },
        {
            id: 2,
            name: "Entrenamiento funcional",
            day: today,
            time: "12:00 PM",
            students: 8,
        },
        {
            id: 3,
            name: "Clase de spinning",
            day: today,
            time: "2:00 PM",
            students: 10,
        },
        {
            id: 4,
            name: "Yoga para principiantes",
            day: today,
            time: "4:00 PM",
            students: 6,
        },
        {
            id: 5,
            name: "Entrenamiento avanzado",
            day: today,
            time: "6:00 PM",
            students: 7,
        },
    ];

    return (
        <div className="pt-2 bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 space-y-6">
                {/* Título */}
                <div className="p-4 bg-black text-white rounded-lg">
                    <h1 className="text-xl font-bold">Mis Sesiones de Hoy</h1>
                </div>

                {/* Lista de sesiones */}
                <div className="space-y-4">
                    {sessions.map((session) => (
                        <div
                            key={session.id}
                            className="p-4 rounded-lg bg-black text-white shadow-md flex justify-between items-center"
                        >
                            <div>
                                <p className="text-sm font-semibold">📋 Nombre: {session.name}</p>
                                <p className="text-sm">📅 Día: {session.day}</p>
                                <p className="text-sm">⏰ Hora: {session.time}</p>
                                <p className="text-sm">👥 Estudiantes Inscritos: {session.students}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrainerMainPage;