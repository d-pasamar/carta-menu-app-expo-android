// app/hooks/useItems.js

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  deleteImagePermanently,
  saveImagePermanently,
} from "../utils/imageStorage";

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

  // ===== Estado separado para guardar solo las URIs locales (no vienen de la API) =====
  const [localImageUris, setLocalImageUris] = useState({});

  // ===== useEffect para cargar URIs al montar
  useEffect(() => {
    const cargarImagenesLocales = async () => {
      try {
        const key = `localImages_categoria_${categoriaId}`;
        const stored = await AsyncStorage.getItem(key);
        if (stored) {
          const parsed = JSON.parse(stored);
          console.log(
            `📦 Cargadas ${
              Object.keys(parsed).length
            } imágenes locales para categoría ${categoriaId}`
          );
          setLocalImageUris(parsed);
        }
      } catch (error) {
        console.error("Error cargando imágenes locales:", error);
      }
    };

    if (categoriaId) {
      cargarImagenesLocales();
    }
  }, [categoriaId]);

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
          // Preserva la imageUri local si existe
          imageUri: localImageUris[item.id] || null,
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
    // }, []); // Solo se ejecuta si cambia el ID de la categoría
    //}, [categoriaId, localImageUris]); // Re-fetch cuando cambien las URIs locales
  }, [categoriaId, localImageUris]);

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
      // Eliminar imagen permanente si existe
      if (localImageUris[itemId]) {
        await deleteImagePermanently(localImageUris[itemId]);
      }

      await itemsAPI.deleteItem(itemId);

      // Limpiar la URI local del ítem eliminado
      /*
      setLocalImageUris((prev) => {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      });
      */

      // Limpiar del estado y AsyncStorage
      const nuevasUris = { ...localImageUris };
      delete nuevasUris[itemId];
      setLocalImageUris(nuevasUris);

      const key = `localImages_categoria_${categoriaId}`;
      await AsyncStorage.setItem(key, JSON.stringify(nuevasUris));

      // Recargamos la lista para reflejar el ítem eliminado.
      fetchItems();
    } catch (e) {
      console.error("Error eliminando ítem:", e);
      setError(e.message || "Error al eliminar ítem");
    }
  };

  // ===== Petición PUT para editar items =====
  const editarItem = async (itemId, nuevoNombre, nuevoPrecio, imageUri) => {
    try {
      // Llamada a la API (solo name y price)
      await itemsAPI.updateItem(itemId, {
        name: nuevoNombre,
        price: nuevoPrecio,
      });

      // Actualizacion inmutable del estado local (items)
      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === itemId) {
            return {
              ...item,
              name: nuevoNombre,
              price: parseFloat(nuevoPrecio),
              imageUri: imageUri,
            };
          }
          return item;
        })
      );

      // Recargar la lista completa desde la API
      //await fetchItems();

      // El componente Item.jsx gestiona la actualización visual, no forzamos re-fetch.
    } catch (e) {
      console.error("Error editando ítem:", e);
      setError(e.message || "Error al editar ítem");
      // En caso de error, también recargamos
      await fetchItems();
    }
  };

  // ===== Actualiza la URI local y el estado (solo frontend) ======
  const actualizarImageUriLocal = async (itemId, nuevaUri) => {
    // console.log(`actualizarImageUriLocal: ID=${itemId}, URI=${nuevaUri}`); // Debug

    // Verificar que nuevaUri existe
    if (!nuevaUri) {
      console.error(
        "❌ Abortando: URI de imagen temporal es nula o indefinida."
      );
      return; // Detener la ejecución si no hay URI
    }

    try {
      let permanentUri = nuevaUri;

      // Solo copiar si es un archivo temporal de cámara
      if (nuevaUri.startsWith("file://")) {
        permanentUri = await saveImagePermanently(nuevaUri, itemId);

        // Borrar solo la foto anterior de este ítem si también era file://
        if (
          localImageUris[itemId] &&
          localImageUris[itemId].startsWith("file://")
        ) {
          await deleteImagePermanently(localImageUris[itemId]);
        }
      }

      // 1. Actualizar el estado local con la URI PERMANENTE
      const nuevasUris = { ...localImageUris, [itemId]: permanentUri };
      setLocalImageUris(nuevasUris);

      // 2. Guardar en AsyncStorage
      const key = `localImages_categoria_${categoriaId}`;
      await AsyncStorage.setItem(key, JSON.stringify(nuevasUris));

      console.log("✅ URI permanente guardada en AsyncStorage");

      // 3. Actualizar el estado de items
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, imageUri: permanentUri } : item
        )
      );

      
    } catch (error) {
      console.error("❌ Error en actualizarImageUriLocal:", error);
    }
  };

  return {
    items,
    isLoading,
    error,
    crearItem,
    eliminarItem,
    editarItem,
    actualizarImageUriLocal,
  };
}
