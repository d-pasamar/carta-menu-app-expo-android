// src/components/Menu/section/Section.jsx

import { useState } from "react";
import useItems from "../../../hooks/useItems"; // Importar el hook de ítems
import defaultImage from "../../../img/Meal.png";
import BotonesCRUD from "../../botonesCRUD/BotonesCrud";
import Item from "./item/Item";
import "./section.css";

/**
 * Componente Section.jsx
 * Representa una categoría del menú con su título, imagen e ítems.
 * Permite edición del título y operaciones CRUD sobre la categoría y sus ítems.
 *
 * @param {string|number} props.id - Identificador único de la categoría.
 * @param {string} props.title - Título de la categoría.
 * @param {string} props.image - Imagen asociada a la categoría.
 * @param {boolean} props.modoEdicion - Indica si está en modo edición.
 * @param {Function} props.onEliminarCategoria - Callback para eliminar categoría.
 * @param {Function} props.onEditarCategoria - Callback para editar categoría.
 * @returns {JSX.Element} - Elemento JSX que representa una sección del menú.
 */

export default function Section({
  id,
  title,
  image,
  modoEdicion,
  onEliminarCategoria,
  onEditarCategoria,
}) {
  const {
    items,
    isLoading,
    error,
    crearItem, // Función POST (crea y recarga)
    eliminarItem, // Función DELETE (elimina y recarga)
    editarItem, // Función PUT (edita)
  } = useItems(id); // Llama al hook unificado pasándole el ID de la categoría

  // ===== ESTADO LOCAL =====
  const [isEditing, setIsEditing] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState(title);

  // Sincroniza el título
  useState(() => {
    setNuevoTitulo(title);
  }, [title]);

  // ===== MANEJADORES (CRUD de Categoría) =====

  /**
   * Manejador que activa el modo edición de la categoría.
   *
   * @returns {void} - No devuelve valor.
   */
  const handleEditClick = () => {
    setIsEditing(true);
  };

  /**
   * Manejador que guarda los cambios de la categoría.
   * Llama a la función onEditarCategoria con los valores actualizados,
   * y desactiva el modo edición.
   *
   * @returns {void} - Actualiza estado de edición, no devuelve valor.
   */
  const handleSave = () => {
    if (nuevoTitulo.trim()) {
      onEditarCategoria(id, nuevoTitulo);
      setIsEditing(false);
    }
  };

  /**
   * Manejador que alterna entre edición y guardado.
   *
   * @returns {void} - No devuelve valor.
   */
  const handleCRUDBtnClick = isEditing ? handleSave : handleEditClick;

  /**
   * Manejador para crear un nuevo item.
   * Llama a crearItem() pasando unos datos por defecto.
   *
   * @returns {void} - No devuelve valor.
   */

  const handleAddItem = () => {
    // Llama directamente a la función del hook
    crearItem({
      nombre: "Nuevo Ítem",
      precio: 0.1,
    });
  };

  // ===== LOGICA (Renderizado de Categoría) =====

  let tituloContent;
  if (modoEdicion) {
    tituloContent = (
      <div className="section-header">
        {isEditing ? (
          <input
            className="titulo-editable-input"
            type="text"
            value={nuevoTitulo}
            onChange={(e) => setNuevoTitulo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
        ) : (
          <h2 className="titulo-editable" onClick={handleEditClick}>
            {title}
          </h2>
        )}
        <BotonesCRUD
          isEditing={isEditing}
          onEliminar={() => onEliminarCategoria(id)}
          onEditar={handleCRUDBtnClick}
        />
      </div>
    );
  } else {
    tituloContent = <h2 className="titulo-centrado">{title}</h2>;
  }

  // Funcion para el renderizado de la lista de items, estados de carga y error.
  const renderItemList = () => {
    // Caso de Carga
    if (isLoading) {
      return <p className="section-loading">Cargando ítems...</p>;
    }

    // Caso de Error
    if (error) {
      return <p className="section-error">Error al cargar: {error}</p>;
    }

    // Caso Sin Ítems (y no estamos editando)
    if (items.length === 0 && !modoEdicion) {
      return <p className="section-loading">No hay ítems en esta sección.</p>;
    }

    // Renderizar la Lista
    return items.map((item) => (
      <Item
        key={item.id}
        id={item.id}
        name={item.name}
        price={item.price}
        modoEdicion={modoEdicion}
        onEliminarItem={eliminarItem}
        onEditarItem={editarItem}
      />
    ));
  };

  const agregarItemBoton = modoEdicion && (
    <button className="btn-agregar-item" onClick={handleAddItem}>
      Añadir Ítem
    </button>
  );

  // ===== RETURN =====

  return (
    <section className="section">
      {tituloContent}
      {/* Imagen de Categoría (opcional) */}
      {image && !modoEdicion && (
        <img
          src={image}
          alt={title}
          className="section-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />
      )}
      <div className="items-list">
        {renderItemList()}
        {agregarItemBoton}
      </div>
    </section>
  );
}
