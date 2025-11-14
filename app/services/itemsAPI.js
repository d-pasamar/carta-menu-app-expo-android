// app/services/itemsAPI.js

const BASE_URL = "https://jlorenzo.ddns.net/carta_restaurante/productos/";

// Id de usuario para la API
const USER_ID = 7032;

/**
 * (GET). Obtiene los ítems de una categoría para un usuario: 7032.
 * @param {number} categoriaId - ID de la categoría.
 * @param {number} usuario_id - ID del usuario.
 * @returns {Promise<Object[]>} Lista de ítems en formato JSON.
 */
const getItems = async (categoriaId, usuario_id) => {
  const res = await fetch(`${BASE_URL}${categoriaId}?usuario_id=${usuario_id}`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
};

/**
 * (POST). Crea un nuevo ítem, enviando la categoría ID en el endpoint (URL).
 * @param {number} categoriaId - ID de la categoría (se usa en la URL).
 * @param {Object} itemData - { nombre: string, precio: number, usuario_id: number }
 * @returns {Promise<Object>} El ítem creado.
 */
const createItem = async (categoriaId, itemData) => {
  // La URL debe incluir el categoriaId, igual que en Postman
  const POST_URL = `${BASE_URL}${categoriaId}`;

  // Payload idéntico a Postman
  const payload = {
    usuario_id: USER_ID,
    nombre: itemData.nombre,
    precio: itemData.precio,
    orden: 4,
  };

  const res = await fetch(POST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Error al crear ítem");
  return res.json();
};

/**
 * (PUT). Edita un ítem existente.
 * @param {number} itemId - ID del ítem a editar.
 * @param {Object} datosActualizados - { nombre: string, precio: number }
 * @returns {Promise<Object>} El resultado de la operación.
 */
const updateItem = async (itemId, datosActualizados) => {
  const PUT_URL = `${BASE_URL}${itemId}`;

  // Payload idéntico a Postman
  const payload = {
    usuario_id: USER_ID,
    nombre: datosActualizados.name,
    precio: parseFloat(datosActualizados.price), // Asegurar que sea número
  };

  const res = await fetch(PUT_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Error al editar ítem");
  return res.json();
};

/**
 * (DELETE). Elimina un ítem por ID.
 * @param {number} itemId - ID del ítem a eliminar.
 * @returns {Promise<Object>} El resultado de la operación.
 */
const deleteItem = async (itemId) => {
  const res = await fetch(`${BASE_URL}${itemId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario_id: USER_ID }),
  });
  if (!res.ok) throw new Error("Error al eliminar ítem");
  return res.json();
};

// Exporta todas las funciones como un objeto para uso externo
export default {
  getItems,
  createItem,
  updateItem,
  deleteItem,
};
