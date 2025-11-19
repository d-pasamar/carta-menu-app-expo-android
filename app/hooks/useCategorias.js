// app/hooks/useCategorias.js

// Hook para gestión de las categorías del menú.
import { useCallback, useEffect, useState } from "react";
import categoriasAPI from "../services/categoriasAPI"; // Importa API

import { defaultImage } from "../../img/Meal.png";

export default function useCategorias(usuario_id) {
  const [categorias, setCategorias] = useState([]); // Lista de categorías cargados desde la Base de Datos
  const [isLoading, setIsLoading] = useState(true); // Esta cargando?
  const [error, setError] = useState(null); // Mensaje de error si algo falla

  // Petición GET para obtener categorías

  // ESTABILIZAMOS LA FUNCIÓN DE FETCH CON useCallback
  // Esto le dice a React que esta función es la misma a menos que sus dependencias cambien.
  const fetchCategorias = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Llama al Modelo (API)
      const response = await categoriasAPI.getCategorias(usuario_id);
      // Manejamos la posibilidad de que la respuesta sea nula
      const categoriasAPIData = response?.data || [];

      // Adaptación (Frontend / Vista)
      const transformadas = categoriasAPIData.map((cat) => ({
        id: cat.id,
        title: cat.nombre,
        image: defaultImage, // Usamos la constante definida arriba
        items: [],
      }));

      // Actualiza el estado (lo que dispara un render FINAL y deseado)
      setCategorias(transformadas);
    } catch (err) {
      // Este catch atrapará el TypeError: Failed to fetch (CORS)
      setError(err.message || "Error al cargar categorías");
      console.error("Error al cargar categorías:", err);
      // Si hay un error, el estado de categorías se mantiene vacío o como estaba.
    } finally {
      // El finally siempre se ejecuta, garantizando que el loading termine
      setIsLoading(false);
    }
  }, [usuario_id, setCategorias, setIsLoading, setError]); // Dependencias del useCallback

  // Esto garantiza que el fetch se ejecute solo cuando el componente se monta
  // O cuando fetchCategorias cambie (lo cual es casi nunca).
  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]); // Depende de la función estable

  // Petición POST para añadir categorías
  const agregarCategoria = async () => {
    try {
      const nuevaCategoria = {
        nombre: "Nueva categoría",
        usuario_id,
        orden: null,
      };

      await categoriasAPI.createCategoria(nuevaCategoria);
      await fetchCategorias(); // Recarga desde la API
    } catch (err) {
      console.error("Error al agregar categoría:", err);
    }
  };

  // Petición DELETE para eliminar categorías
  const eliminarCategoria = async (id) => {
    try {
      await categoriasAPI.deleteCategoria(id, usuario_id);
      await fetchCategorias(); // Recarga desde la API
    } catch (err) {
      console.error("Error al eliminar categoría:", err);
    }
  };

  // Petición PUT para editar categorías
  const editarCategoria = async (id, nuevoNombre) => {
    try {
      const datosActualizados = {
        usuario_id,
        nombre: nuevoNombre,
        orden: null,
      };

      await categoriasAPI.updateCategoria(id, datosActualizados);
      await fetchCategorias(); // Recarga desde la API
    } catch (err) {
      console.error("Error al editar categoría:", err);
    }
  };

  // Actualiza la imagen del ÍTEM LOCALMENTE (en memoria)
  const actualizarItemLocal = (itemId, updatedFields) => {
    // Utilizamos el setter para actualizar el estado
    setCategorias((prevCategorias) =>
      prevCategorias.map((categoria) => ({
        ...categoria,
        // 1. Mapeamos sobre los ítems dentro de cada categoría
        items: categoria.items.map((item) => {
          // 2. Si el ID del ítem coincide, actualizamos sus campos (imageUri)
          if (item.id === itemId) {
            return { ...item, ...updatedFields };
          }
          // 3. Si no coincide, devolvemos el ítem sin cambios
          return item;
        }),
      }))
    );
  };

  // Devuelve estado y funciones para que el componente los use
  return {
    categorias,
    isLoading,
    error,
    fetchCategorias,
    agregarCategoria,
    eliminarCategoria,
    editarCategoria,
    actualizarItemLocal,
  };
}
