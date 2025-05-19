import React, { useEffect, useState } from "react";
import { getActiveLoansByUser } from "../services/loanService";

interface Reservation {
    id: string;
    nombreItem: string;
    fecha: string;
    horaInicio: string;
    horaFin: string;
}

const horas = Array.from({ length: 13 }, (_, i) => 7 + i);
const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const Loaned: React.FC = () => {
    const [reservas, setReservas] = useState<Reservation[]>([]);
    const [selectedReserva, setSelectedReserva] = useState<Reservation | null>(null);
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Lunes

    useEffect(() => {
        const loadReservations = async () => {
            try {
                const loans = await getActiveLoansByUser("123");
                const mapped = loans.map((loan: any) => {
                    const loanDate = new Date(loan.dateAndTimeLoan);
                    const returnDate = new Date(loan.dateAndTimeScheduleReturn);
                    return {
                        id: loan.id,
                        nombreItem: loan.equipmentName || "Equipo",
                        fecha: loanDate.toLocaleDateString("sv-SE"),
                        horaInicio: loanDate.toTimeString().slice(0, 5),
                        horaFin: returnDate.toTimeString().slice(0, 5),
                    };
                });

                setReservas(mapped);
            } catch (error) {
                console.error("Error cargando préstamos activos:", error);
            }
        };
        loadReservations();
    }, []);

    const getDayDate = (offset: number) => {
        const d = new Date(startOfWeek);
        d.setDate(d.getDate() + offset);
        return d.toLocaleDateString("sv-SE");
    };

    const isReserved = (day: string, hour: number) => {
        return reservas.find((res) => {
            const [startHour] = res.horaInicio.split(":").map(Number);
            const [endHour] = res.horaFin.split(":").map(Number);
            return res.fecha == day && hour >= startHour && hour < endHour;
        });
    };

    return (
        <div className="overflow-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Calendario de Préstamos</h2>
            <div className="grid grid-cols-8 border border-gray-300">
                <div className="bg-gray-100 p-2 font-semibold text-sm text-center">Hora</div>
                {dias.map((dia, i) => (
                    <div key={i} className="bg-gray-100 p-2 font-semibold text-sm text-center">
                        {dia}
                    </div>
                ))}

                {horas.map((hora) => (
                    <React.Fragment key={hora}>
                        <div className="border p-2 text-xs font-medium text-center bg-white">{hora}:00</div>
                        {dias.map((_, dayIndex) => {
                            const dateStr = getDayDate(dayIndex);
                            const reserva = isReserved(dateStr, hora);
                            return (
                                <div
                                    key={`${hora}-${dayIndex}`}
                                    className={`border h-16 text-xs p-1 flex items-center justify-center ${
                                        reserva ? "bg-green-200 text-green-900 font-semibold" : "bg-white"
                                    }`}
                                >
                                    {reserva ? (
                                        <div className="text-center text-[10px] leading-tight">
                                            <div className="font-bold">{reserva.nombreItem}</div>
                                            <div>{reserva.horaInicio} - {reserva.horaFin}</div>
                                        </div>
                                    ) : ""}

                                </div>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Loaned;
