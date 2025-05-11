import { useState } from "react";
import {
  PencilSquareIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

type Session = {
  label: string;
  day: string;
  time: string;
};

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const hours = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

export default function GymSchedule() {
  const [sessions, setSessions] = useState<Session[]>([
    { label: "Sesion gimnasio", day: "Lunes", time: "10:00 AM" },
    { label: "Sesion gimnasio", day: "Miércoles", time: "10:00 AM" },
    { label: "Sesion gimnasio", day: "Viernes", time: "10:00 AM" },
    { label: "Sesion gimnasio", day: "Lunes", time: "1:00 PM" },
  ]);

  const [selected, setSelected] = useState<Session | null>(null);
  const [editing, setEditing] = useState<Session | null>(null);
  const [creating, setCreating] = useState<boolean>(false);

  const handleUpdate = (updated: Session) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.day === editing?.day && s.time === editing?.time ? updated : s
      )
    );
    setEditing(null);
  };

  const handleCreate = (newSession: Session) => {
    const exists = sessions.some(
      (s) => s.day === newSession.day && s.time === newSession.time
    );
    if (!exists) {
      setSessions((prev) => [...prev, newSession]);
    } else {
      alert("Ya existe una sesión en ese día y hora.");
    }
  };

  return (
    <div className="p-4">
      <div className="bg-black text-white p-4 rounded-t-lg flex justify-between items-center">
        <h2 className="text-lg font-semibold">Sesiones creadas</h2>
        <button
          onClick={() => setCreating(true)}
          className="bg-white text-black rounded-full p-1 hover:bg-gray-200"
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="overflow-x-auto border rounded-b-lg">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-gray-100 text-left text-sm">
              <th className="p-2 border">Hora</th>
              {days.map((day) => (
                <th key={day} className="p-2 border">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour} className="text-sm">
                <td className="p-2 border">{hour}</td>
                {days.map((day) => {
                  const session = sessions.find(
                    (s) => s.day === day && s.time === hour
                  );
                  return (
                    <td key={`${day}-${hour}`} className="p-2 border h-16">
                      {session && (
                        <div
                          onClick={() => setSelected(session)}
                          className="bg-black text-white rounded-lg p-2 relative cursor-pointer"
                        >
                          {session.label}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditing(session);
                            }}
                            className="absolute bottom-1 right-1"
                          >
                            <PencilSquareIcon className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ver detalle */}
      {selected && (
        <SessionDetailModal session={selected} onClose={() => setSelected(null)} />
      )}

      {/* Editar y Eliminar*/}
      {editing && (
        <SessionEditModal
          session={editing}
          onClose={() => setEditing(null)}
          onSave={handleUpdate}
          onDelete={(sessionToDelete) => {
            setSessions((prev) =>
              prev.filter(
                (s) => !(s.day === sessionToDelete.day && s.time === sessionToDelete.time)
              )
            );
            setEditing(null);
          }}
        />
      )}

      {/* Crear */}
      {creating && (
        <CreateSessionModal
          onClose={() => setCreating(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}

// Modal para ver sesión
function SessionDetailModal({
  session,
  onClose,
}: {
  session: Session;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-black">
          <XMarkIcon className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold mb-4">Detalle de la sesión</h2>
        <p><strong>Nombre:</strong> {session.label}</p>
        <p><strong>Día:</strong> {session.day}</p>
        <p><strong>Hora:</strong> {session.time}</p>
      </div>
    </div>
  );
}

// Modal para editar y eliminar la sesión
function SessionEditModal({
  session,
  onClose,
  onSave,
  onDelete,
}: {
  session: Session;
  onClose: () => void;
  onSave: (s: Session) => void;
  onDelete: (s: Session) => void;
}) {
  const [formData, setFormData] = useState(session);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  const handleDelete = () => {
    if (confirm("¿Estás seguro de eliminar esta sesión?")) {
      onDelete(session);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-black">
          <XMarkIcon className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold mb-4">Editar sesión</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-medium">Nombre</label>
            <input
              name="label"
              value={formData.label}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Día</label>
            <select
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              {days.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium">Hora</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              {hours.map((h) => (
                <option key={h}>{h}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handleSubmit}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Guardar cambios
            </button>

            <button
              onClick={handleDelete}
              className="text-red-600 hover:underline"
            >
              Eliminar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal para crear nueva sesión
function CreateSessionModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (session: Session) => void;
}) {
  const [formData, setFormData] = useState<Session>({
    label: "",
    day: "Lunes",
    time: "08:00 AM",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onCreate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-black">
          <XMarkIcon className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold mb-4">Crear nueva sesión</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-medium">Nombre</label>
            <input
              name="label"
              value={formData.label}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Día</label>
            <select
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              {days.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium">Hora</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              {hours.map((h) => (
                <option key={h}>{h}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Crear sesión
          </button>
        </div>
      </div>
    </div>
  );
}