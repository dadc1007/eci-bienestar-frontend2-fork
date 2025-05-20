import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {hallsApi, HallEntity} from '../services/api';

interface Room {
    id: string;
    name: string;
    location: string;
    capacity: number;
    description: string;
    isAvailable: boolean;
    openingHours: string;
    closingHours: string;
    features: string[];
}

const RoomsPage: React.FC = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [showAddForm, setShowAddForm] = useState(false);
    const [newRoom, setNewRoom] = useState<Partial<Room>>({
        name: "",
        location: "",
        capacity: 0,
        description: "",
        isAvailable: true,
        openingHours: "08:00",
        closingHours: "20:00",
        features: []
    });
    const [newFeature, setNewFeature] = useState("");
    const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setLoading(true);
                const response = await hallsApi.getAllHalls();

                const transformedRooms: Room[] = response.map((hall: HallEntity) => ({
                    id: hall.id?.toString() || "",
                    name: hall.name,
                    location: hall.location,
                    capacity: hall.capacity,
                    description: hall.description,
                    isAvailable: hall.status === 'A',
                    openingHours: "08:00",
                    closingHours: "20:00",
                    features: hall.description.includes(',') ? hall.description.split(',').map(f => f.trim()) : []
                }));

                setRooms(transformedRooms);
                setError(null);
            } catch (err) {
                console.error("Error al cargar las salas:", err);
                setError("Hubo un problema al cargar las salas. Por favor, intenta de nuevo más tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    const filteredRooms = rooms.filter(room =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddRoom = async () => {
        if (newRoom.name && newRoom.location) {
            try {
                setLoading(true);

                const hallToAdd: HallEntity = {
                    name: newRoom.name,
                    location: newRoom.location,
                    capacity: newRoom.capacity || 0,
                    status: newRoom.isAvailable ? 'A' : 'I',
                    description: newRoom.features?.length
                        ? newRoom.features.join(', ') + (newRoom.description ? '. ' + newRoom.description : '')
                        : newRoom.description || ''
                };

                const response = await hallsApi.addHall(hallToAdd);

                const roomToAdd: Room = {
                    id: response.id?.toString() || "",
                    name: response.name,
                    location: response.location,
                    capacity: response.capacity,
                    description: response.description,
                    isAvailable: response.status === 'A',
                    openingHours: newRoom.openingHours || "08:00",
                    closingHours: newRoom.closingHours || "20:00",
                    features: newRoom.features || []
                };

                setRooms([...rooms, roomToAdd]);
                setNewRoom({
                    name: "",
                    location: "",
                    capacity: 0,
                    description: "",
                    isAvailable: true,
                    openingHours: "08:00",
                    closingHours: "20:00",
                    features: []
                });
                setShowAddForm(false);
                setError(null);
            } catch (err) {
                console.error("Error al añadir la sala:", err);
                setError("Hubo un problema al añadir la sala. Por favor, intenta de nuevo.");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleEditRoom = (roomId: string) => {
        const roomToEdit = rooms.find(room => room.id === roomId);
        if (roomToEdit) {
            setNewRoom(roomToEdit);
            setEditingRoomId(roomId);
            setShowAddForm(true);
        }
    };

    const handleSaveEdit = async () => {
        if (editingRoomId && newRoom.name && newRoom.location) {
            try {
                setLoading(true);

                const hallToUpdate: HallEntity = {
                    id: parseInt(editingRoomId),
                    name: newRoom.name,
                    location: newRoom.location,
                    capacity: newRoom.capacity || 0,
                    status: newRoom.isAvailable ? 'A' : 'I',
                    description: newRoom.features?.length
                        ? newRoom.features.join(', ') + (newRoom.description ? '. ' + newRoom.description : '')
                        : newRoom.description || ''
                };
                await hallsApi.addHall(hallToUpdate);

                setRooms(rooms.map(room =>
                    room.id === editingRoomId
                        ? {
                            ...room,
                            name: newRoom.name || room.name,
                            location: newRoom.location || room.location,
                            capacity: newRoom.capacity || room.capacity,
                            description: newRoom.description || room.description,
                            isAvailable: newRoom.isAvailable !== undefined ? newRoom.isAvailable : room.isAvailable,
                            openingHours: newRoom.openingHours || room.openingHours,
                            closingHours: newRoom.closingHours || room.closingHours,
                            features: newRoom.features || room.features
                        }
                        : room
                ));

                setNewRoom({
                    name: "",
                    location: "",
                    capacity: 0,
                    description: "",
                    isAvailable: true,
                    openingHours: "08:00",
                    closingHours: "20:00",
                    features: []
                });
                setEditingRoomId(null);
                setShowAddForm(false);
                setError(null);
            } catch (err) {
                console.error("Error al actualizar la sala:", err);
                setError("Hubo un problema al actualizar la sala. Por favor, intenta de nuevo.");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDeleteRoom = async (roomId: string) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta sala?")) {
            try {
                setLoading(true);

                await hallsApi.deleteHall(parseInt(roomId));

                setRooms(rooms.filter(room => room.id !== roomId));
                setError(null);
            } catch (err) {
                console.error("Error al eliminar la sala:", err);
                setError("Hubo un problema al eliminar la sala. Por favor, intenta de nuevo.");
            } finally {
                setLoading(false);
            }
        }
    };

    const addFeature = () => {
        if (newFeature.trim()) {
            setNewRoom({
                ...newRoom,
                features: [...(newRoom.features || []), newFeature.trim()]
            });
            setNewFeature("");
        }
    };

    const removeFeature = (index: number) => {
        const updatedFeatures = [...(newRoom.features || [])];
        updatedFeatures.splice(index, 1);
        setNewRoom({
            ...newRoom,
            features: updatedFeatures
        });
    };
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <button
                        onClick={() => navigate('/modules/recreation')}
                        className="mr-4 text-green-700 hover:text-green-900 flex items-center"
                        aria-label="Volver a opciones de salas recreativas"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                  clipRule="evenodd"/>
                        </svg>
                        Volver
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">Gestión de Salas</h1>
                </div>
                <div className="flex space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar salas..."
                            className="border rounded-lg px-4 py-2 w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <svg
                            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                    >
                        {showAddForm ? "Cancelar" : "Añadir Sala"}
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                    <p>{error}</p>
                </div>
            )}

            {loading && (
                <div className="flex justify-center my-8">
                    <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-green-600 border-r-transparent"
                        role="status">
                        <span className="sr-only">Cargando...</span>
                    </div>
                    <span className="ml-2">Cargando...</span>
                </div>
            )}

            {showAddForm && (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">
                        {editingRoomId ? "Editar Sala" : "Añadir Nueva Sala"}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre de la Sala
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={newRoom.name}
                                onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Ubicación
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={newRoom.location}
                                onChange={(e) => setNewRoom({...newRoom, location: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Capacidad
                            </label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={newRoom.capacity}
                                onChange={(e) => setNewRoom({...newRoom, capacity: parseInt(e.target.value) || 0})}
                                min="1"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Estado
                            </label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={newRoom.isAvailable ? "true" : "false"}
                                onChange={(e) => setNewRoom({...newRoom, isAvailable: e.target.value === "true"})}
                            >
                                <option value="true">Disponible</option>
                                <option value="false">No Disponible</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Hora de Apertura
                            </label>
                            <input
                                type="time"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={newRoom.openingHours}
                                onChange={(e) => setNewRoom({...newRoom, openingHours: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Hora de Cierre
                            </label>
                            <input
                                type="time"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={newRoom.closingHours}
                                onChange={(e) => setNewRoom({...newRoom, closingHours: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descripción
                        </label>
                        <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={newRoom.description}
                            onChange={(e) => setNewRoom({...newRoom, description: e.target.value})}
                            rows={3}
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Características
                        </label>
                        <div className="flex items-center space-x-2 mb-2">
                            <input
                                type="text"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                                value={newFeature}
                                onChange={(e) => setNewFeature(e.target.value)}
                                placeholder="Añadir característica"
                            />
                            <button
                                type="button"
                                onClick={addFeature}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                            >
                                Añadir
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {newRoom.features?.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
                                >
                                    <span>{feature}</span>
                                    <button
                                        onClick={() => removeFeature(index)}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={() => {
                                setShowAddForm(false);
                                setEditingRoomId(null);
                                setNewRoom({
                                    name: "",
                                    location: "",
                                    capacity: 0,
                                    description: "",
                                    isAvailable: true,
                                    openingHours: "08:00",
                                    closingHours: "20:00",
                                    features: []
                                });
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={editingRoomId ? handleSaveEdit : handleAddRoom}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            {editingRoomId ? "Guardar Cambios" : "Añadir Sala"}
                        </button>
                    </div>
                </div>
            )}

            {/* Tabla de salas */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ubicación
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Capacidad
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Horario
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRooms.map((room) => (
                        <tr key={room.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {room.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {room.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {room.location}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {room.capacity} personas
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          room.isAvailable
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                      }`}
                  >
                    {room.isAvailable ? "Disponible" : "No Disponible"}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {room.openingHours} - {room.closingHours}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => handleEditRoom(room.id)}
                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDeleteRoom(room.id)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    {filteredRooms.length === 0 && (
                        <tr>
                            <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                                No se encontraron salas con los criterios de búsqueda.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RoomsPage;
