import { useEffect, useState } from "react";
import LoanDetailsModal from "../components/LoanDetailModal";
import { getActiveLoansByUser } from "../services/loanService";

interface Loan {
    id: string;
    usuario: string;
    nombreArticulo: string;
    estado: string;
    fechaPrestamo: string;
    horaInicio: string;
    horaFin: string;
    descripcion: string;
    imagen?: string;
}

const ActiveLoans = () => {
    const [loans, setLoans] = useState<Loan[]>([]);
    const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLoans = async () => {
            setLoading(true);
            try {
                const data = await getActiveLoansByUser("123");

                const mappedLoans: Loan[] = data.map((item: any) => {
                    const loanDate = new Date(item.dateAndTimeLoan);
                    const returnDate = new Date(item.dateAndTimeScheduleReturn);

                    return {
                        id: item.id,
                        usuario: item.userName,
                        nombreArticulo: item.equipmentId,
                        estado: item.loanStatus,
                        fechaPrestamo: loanDate.toISOString().split("T")[0],
                        horaInicio: loanDate.toTimeString().slice(0, 5),
                        horaFin: returnDate.toTimeString().slice(0, 5),
                        descripcion: `Duración: ${item.duration || "N/A"}`
                    };
                });

                setLoans(mappedLoans);
            } catch (err) {
                console.error("Error fetching loans:", err);
                setLoans([]);
            } finally {
                setLoading(false);
            }
        };

        fetchLoans();
    }, []);

    const openModal = (loan: Loan) => {
        setSelectedLoan(loan);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedLoan(null);
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Tus Reservas Activas</h2>

            {loading ? (
                <p>Cargando reservas...</p>
            ) : loans.length === 0 ? (
                <p>No tienes reservas activas por el momento.</p>
            ) : (
                <ul className="space-y-3">
                    {loans.map((loan) => (
                        <li
                            key={loan.id}
                            onClick={() => openModal(loan)}
                            className="cursor-pointer bg-white shadow hover:shadow-md border border-gray-200 rounded p-4"
                        >
                            <p className="font-semibold">{loan.nombreArticulo}</p>
                            <p className="text-sm text-gray-600">
                                {loan.fechaPrestamo} | {loan.horaInicio} - {loan.horaFin}
                            </p>
                            <p className="text-sm text-gray-500">{loan.descripcion}</p>
                        </li>
                    ))}
                </ul>
            )}

            <LoanDetailsModal isOpen={modalOpen} onClose={closeModal} data={selectedLoan} />
        </div>
    );
};

export default ActiveLoans;
