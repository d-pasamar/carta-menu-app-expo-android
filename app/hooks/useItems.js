// app/hooks/useItems.js

import { useEffect, useState } from "react";
import itemsAPI from "../services/itemsAPI";

const USER_ID = 7032; // ID de usuario

/**
 * Hook para obtener, crear, editar y eliminar ítems (productos)
 * de una categoría específica.
 * @param {number} categoriaId - El ID de la categoría a la que pertenecen los ítems.
 * @returns {Object} - Objeto con el estado (items, isLoading, error) y las funciones CRUD.
 */
export default function useItems(categoriaId) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ===== Petición GET para obtener ítems =====
  const fetchItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await itemsAPI.getItems(categoriaId, USER_ID);
      const itemsAPIData = response.data;
      if (Array.isArray(itemsAPIData)) {
        // Mapeo y transformación de datos para el frontend
        const transformados = itemsAPIData.map((item) => ({
          id: item.id,
          name: item.nombre, // Cambia 'nombre' a 'name'
          price: parseFloat(item.precio), // Asegura que el precio es un número
        }));

        setItems(transformados);
      } else {
        // Si no es un array, se considera vacío para evitar el error .map is not a function
        setItems([]);
      }
    } catch (e) {
      console.error("Error fetching items:", e);
      setError(e.message || "Fallo al cargar ítems.");
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (categoriaId) {
      fetchItems();
    }
  }, []); // Solo se ejecuta si cambia el ID de la categoría

  // ===== Petición POST para añadir items =====
  const crearItem = async (itemData) => {
    try {
      // Llamar a la API para crear el ítem
      await itemsAPI.createItem(categoriaId, itemData);
      // Recargar la lista completa desde la API
      await fetchItems();
    } catch (e) {
      console.error("Error creando ítem:", e);
      setError(e.message || "Error al crear ítem");
      await fetchItems();
    }
  };

  // ===== Petición DELETE para eliminar items =====
  const eliminarItem = async (itemId) => {
    try {
      await itemsAPI.deleteItem(itemId);
      // Recargamos la lista para reflejar el ítem eliminado.
      fetchItems();
    } catch (e) {
      console.error("Error eliminando ítem:", e);
      etError(e.message || "Error al eliminar ítem");
    }
  };

  // ===== Petición PUT para editar items =====
  const editarItem = async (itemId, nuevoNombre, nuevoPrecio) => {
    try {
      await itemsAPI.updateItem(itemId, {
        name: nuevoNombre,
        price: nuevoPrecio,
      });

      // Recargar la lista completa desde la API
      await fetchItems();

      // El componente Item.jsx gestiona la actualización visual, no forzamos re-fetch.
    } catch (e) {
      console.error("Error editando ítem:", e);
      setError(e.message || "Error al editar ítem");
      // En caso de error, también recargamos
      await fetchItems();
    }
  };

  return {
    items,
    isLoading,
    error,
    crearItem,
    eliminarItem,
    editarItem,
  };
}
