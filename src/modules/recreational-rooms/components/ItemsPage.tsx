import type React from 'react';
import { useState, useEffect } from 'react';
import { itemsApi, hallsApi, type ItemEntity, type HallEntity, type ItemEntityRequest } from '../services/api';

// Definición del tipo para un elemento recreativo
interface RecreationalItem {
  id: string;
  name: string;
  category: string;
  totalQuantity: number;
  availableQuantity: number;
  condition: 'Nuevo' | 'Buen estado' | 'Regular' | 'Requiere mantenimiento';
  location: string;
  description?: string;
  lastMaintenance?: string;
  image?: string;
  hallId?: number;
}

const ItemsPage: React.FC = () => {
  // Categorías de ejemplo para los elementos
  const categories = [
    'Juegos de Mesa',
    'Consolas y Videojuegos',
    'Equipos Deportivos',
    'Instrumentos Musicales',
    'Equipos Electrónicos',
    'Otros'
  ];

  // Estados para los datos
  const [items, setItems] = useState<RecreationalItem[]>([]);
  const [halls, setHalls] = useState<HallEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para el formulario
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState<Partial<RecreationalItem>>({
    name: '',
    category: '',
    totalQuantity: 1,
    availableQuantity: 1,
    condition: 'Nuevo',
    location: '',
    description: ''
  });
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // Cargar salas y elementos desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Obtener salas
        const hallsResponse = await hallsApi.getAllHalls();
        setHalls(hallsResponse);
        
        const itemsResponse = await itemsApi.getAllItems();
        
        const transformedItems: RecreationalItem[] = itemsResponse.map((item: ItemEntity) => ({
          id: item.id?.toString() || "",
          name: item.name,
          category: item.category,
          totalQuantity: item.quantity,
          availableQuantity: item.quantityAvailable || 0,
          condition: mapConditionFromStatus(item.status),
          location: typeof item.hall === 'object' ? item.hall.name : 'Desconocido',
          description: item.description,
          hallId: typeof item.hall === 'object' ? item.hall.id : 
                 typeof item.hall === 'number' ? item.hall : undefined
        }));
        
        setItems(transformedItems);
        setError(null);
      } catch (err) {
        console.error("Error al cargar los datos:", err);
        setError("Hubo un problema al cargar los datos. Por favor, intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const mapConditionFromStatus = (status: string): 'Nuevo' | 'Buen estado' | 'Regular' | 'Requiere mantenimiento' => {
    switch (status) {
      case 'N': return 'Nuevo';
      case 'B': return 'Buen estado';
      case 'R': return 'Regular';
      case 'M': return 'Requiere mantenimiento';
      default: return 'Buen estado';
    }
  };

  const mapConditionToStatus = (condition: string): string => {
    switch (condition) {
      case 'Nuevo': return 'N';
      case 'Buen estado': return 'B';
      case 'Regular': return 'R';
      case 'Requiere mantenimiento': return 'M';
      default: return 'B';
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory ? item.category === filterCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddItem = async () => {
    if (newItem.name && newItem.category && newItem.location && newItem.hallId) {
      try {
        setLoading(true);
        
        const itemToAdd: ItemEntityRequest = {
          name: newItem.name,
          description: newItem.description || '',
          status: mapConditionToStatus(newItem.condition || 'Buen estado'),
          category: newItem.category,
          quantity: newItem.totalQuantity || 1,
          available: true,
          hall: newItem.hallId
        };
        
        const response = await itemsApi.addItem(itemToAdd);
        
        const hall = halls.find(h => h.id === newItem.hallId);
        
        const newItemWithId: RecreationalItem = {
          ...newItem as RecreationalItem,
          id: response.id?.toString() || Math.random().toString(),
          location: hall?.name || newItem.location,
          availableQuantity: newItem.totalQuantity || 1
        };
        
        setItems([...items, newItemWithId]);
        resetForm();
        setError(null);
      } catch (err) {
        console.error("Error al añadir el elemento:", err);
        setError("Hubo un problema al añadir el elemento. Por favor, intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Por favor, completa todos los campos obligatorios.");
    }
  };

  const handleEditItem = (itemId: string) => {
    const itemToEdit = items.find(item => item.id === itemId);
    if (itemToEdit) {
      setNewItem(itemToEdit);
      setEditingItemId(itemId);
      setShowAddForm(true);
    }
  };

  const handleSaveEdit = async () => {
    if (editingItemId && newItem.name && newItem.category && newItem.location && newItem.hallId) {
      try {
        setLoading(true);
        
        const itemToUpdate: ItemEntity = {
          id: Number.parseInt(editingItemId),
          name: newItem.name,
          description: newItem.description || '',
          status: mapConditionToStatus(newItem.condition || 'Buen estado'),
          category: newItem.category,          quantity: newItem.totalQuantity || 1,
          quantityAvailable: newItem.availableQuantity,
          available: (newItem.availableQuantity || 0) > 0,
          hall: newItem.hallId
        };
        
        await itemsApi.updateItem(Number.parseInt(editingItemId), itemToUpdate);
        
        const hall = halls.find(h => h.id === newItem.hallId);
        
        setItems(items.map(item => 
          item.id === editingItemId 
            ? { 
                ...item,
                name: newItem.name || item.name,
                category: newItem.category || item.category,
                totalQuantity: newItem.totalQuantity || item.totalQuantity,
                availableQuantity: newItem.availableQuantity !== undefined ? newItem.availableQuantity : item.availableQuantity,
                condition: newItem.condition || item.condition,
                location: hall?.name || newItem.location || item.location,
                description: newItem.description || item.description,
                hallId: newItem.hallId
              } 
            : item
        ));
        
        resetForm();
        setError(null);
      } catch (err) {
        console.error("Error al actualizar el elemento:", err);
        setError("Hubo un problema al actualizar el elemento. Por favor, intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Por favor, completa todos los campos obligatorios.");
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este elemento?")) {
      try {
        setLoading(true);
        
        await itemsApi.deleteItem(Number.parseInt(itemId));
        
        setItems(items.filter(item => item.id !== itemId));
        setError(null);
      } catch (err) {
        console.error("Error al eliminar el elemento:", err);
        setError("Hubo un problema al eliminar el elemento. Por favor, intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setNewItem({
      name: '',
      category: '',
      totalQuantity: 1,
      availableQuantity: 1,
      condition: 'Nuevo',
      location: '',
      description: ''
    });
    setEditingItemId(null);
    setShowAddForm(false);
  };

  const handleUpdateAvailability = async (itemId: string, available: number) => {
    try {
      setLoading(true);
      
      const item = items.find(i => i.id === itemId);
      if (!item) return;
      
      const itemToUpdate: ItemEntity = {
        id: Number.parseInt(itemId),
        name: item.name,
        description: item.description || '',
        status: mapConditionToStatus(item.condition),
        category: item.category,
        quantity: item.totalQuantity,
        quantityAvailable: available,
        available: available > 0,
        hall: item.hallId || 0
      };
      
      await itemsApi.updateItem(parseInt(itemId), itemToUpdate);
      
      setItems(items.map(i => 
        i.id === itemId 
          ? { ...i, availableQuantity: available } 
          : i
      ));
      
      setError(null);
    } catch (err) {
      console.error("Error al actualizar la disponibilidad:", err);
      setError("Hubo un problema al actualizar la disponibilidad. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterMaintenance = async (itemId: string) => {
    try {
      setLoading(true);
      
      const today = new Date().toISOString().split('T')[0];
      const item = items.find(i => i.id === itemId);
      if (!item) return;
      
      const itemToUpdate: ItemEntity = {
        id: parseInt(itemId),
        name: item.name,
        description: item.description || '',
        status: 'B',
        category: item.category,
        quantity: item.totalQuantity,
        quantityAvailable: item.availableQuantity,
        available: item.availableQuantity > 0,
        hall: item.hallId || 0
      };
      
      await itemsApi.updateItem(parseInt(itemId), itemToUpdate);
      
      setItems(items.map(i => 
        i.id === itemId 
          ? { ...i, lastMaintenance: today, condition: 'Buen estado' } 
          : i
      ));
      
      setError(null);
    } catch (err) {
      console.error("Error al registrar el mantenimiento:", err);
      setError("Hubo un problema al registrar el mantenimiento. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Elementos Recreativos</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar elementos..."
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
          <select
            className="border rounded-lg px-4 py-2"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            {showAddForm ? "Cancelar" : "Añadir Elemento"}
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
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-green-600 border-r-transparent" role="status">
            <span className="sr-only">Cargando...</span>
          </div>
          <span className="ml-2">Cargando...</span>
        </div>
      )}

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">
            {editingItemId ? "Editar Elemento" : "Añadir Nuevo Elemento"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Elemento
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                required
              >
                <option value="">Selecciona una categoría</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cantidad Total
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={newItem.totalQuantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1;
                  setNewItem({ 
                    ...newItem, 
                    totalQuantity: value,
                    availableQuantity: editingItemId ? newItem.availableQuantity : value
                  });
                }}
                min="1"
                required
              />
            </div>
            {editingItemId && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cantidad Disponible
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newItem.availableQuantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setNewItem({ 
                      ...newItem, 
                      availableQuantity: Math.min(value, newItem.totalQuantity || 1) 
                    });
                  }}
                  min="0"
                  max={newItem.totalQuantity}
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ubicación
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={newItem.location}
                onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={newItem.condition}
                onChange={(e) => setNewItem({ ...newItem, condition: e.target.value as any })}
                required
              >
                <option value="Nuevo">Nuevo</option>
                <option value="Buen estado">Buen estado</option>
                <option value="Regular">Regular</option>
                <option value="Requiere mantenimiento">Requiere mantenimiento</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Último Mantenimiento
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={newItem.lastMaintenance}
                onChange={(e) => setNewItem({ ...newItem, lastMaintenance: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sala
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={newItem.hallId}
                onChange={(e) => setNewItem({ ...newItem, hallId: parseInt(e.target.value) })}
                required
              >
                <option value="">Selecciona una sala</option>
                {halls.map(hall => (
                  <option key={hall.id} value={hall.id}>
                    {hall.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              rows={3}
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={editingItemId ? handleSaveEdit : handleAddItem}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {editingItemId ? "Guardar Cambios" : "Añadir Elemento"}
            </button>
          </div>
        </div>
      )}

      {/* Tabla de elementos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Elemento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cantidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ubicación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sala
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    {item.description && (
                      <p className="text-xs text-gray-400 truncate max-w-xs">
                        {item.description}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>
                    <p>Disponible: {item.availableQuantity}</p>
                    <p className="text-xs text-gray-400">Total: {item.totalQuantity}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.condition === 'Nuevo'
                        ? 'bg-green-100 text-green-800'
                        : item.condition === 'Buen estado'
                        ? 'bg-blue-100 text-blue-800'
                        : item.condition === 'Regular'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.condition}
                  </span>
                  {item.lastMaintenance && (
                    <p className="text-xs text-gray-400 mt-1">
                      Mant.: {new Date(item.lastMaintenance).toLocaleDateString()}
                    </p>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.hallId ? halls.find(hall => hall.id === item.hallId)?.name : 'Sin sala'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEditItem(item.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Editar
                    </button>
                    <div className="relative group">
                      <button className="text-gray-600 hover:text-gray-900">
                        Más ▼
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-10">
                        <div className="py-1">
                          <button
                            onClick={() => handleUpdateAvailability(item.id, item.totalQuantity)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Restablecer Disponibilidad
                          </button>
                          <button
                            onClick={() => handleRegisterMaintenance(item.id)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Registrar Mantenimiento
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            {filteredItems.length === 0 && (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                  No se encontraron elementos con los criterios de búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemsPage;
