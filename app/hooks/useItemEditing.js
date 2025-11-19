// app/hooks/useItemEditing.js

import { useState } from "react";

export default function useItemEditing(
  id,
  name,
  price,
  onEditarItem,
  imageUri
) {
  // ===== ESTADO LOCAL =====
  const [isEditing, setIsEditing] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(name);
  const [nuevoPrecio, setNuevoPrecio] = useState(price);

  // ===== HANDLERS =====

  /**
   * Handler que guarda los estados del ítem.
   * Llama a la función onEditarItem con los valores actualizados.
   *
   * @returns {void} - Actualiza estado de edición, no devuelve valor.
   */
  const handleSave = () => {
    if (nuevoNombre.trim() && !isNaN(parseFloat(nuevoPrecio))) {
      // Llamada a la función del hook usando el ID
      onEditarItem(
        id, // Usamos el ID del ítem
        nuevoNombre,
        parseFloat(nuevoPrecio),
        imageUri // Pasamos la imageUri para evitar que se borre al editar
      );
      setIsEditing(false);
    }
  };

  /**
   * Manejador que activa el modo edición del ítem.
   * @returns {void} - Activa el modo edición.
   */
  const handleEditClick = () => {
    setIsEditing(true);
  };

  /**
   * Manejador que alterna entre los modos 'Editar' y 'Guardar' el ítem.
   */
  const handleCRUDBtnClick = isEditing ? handleSave : handleEditClick;

  // ===== RETORNO DEL HOOK =====
  return {
    isEditing,
    setIsEditing,
    nuevoNombre,
    setNuevoNombre,
    nuevoPrecio,
    setNuevoPrecio,
    handleSave,
    handleEditClick,
    handleCRUDBtnClick,
  };
}
