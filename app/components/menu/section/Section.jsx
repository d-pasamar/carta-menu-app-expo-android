// src/components/Menu/section/Section.jsx

import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"; // Importaciones Nativas

import useItems from "../../../hooks/useItems";
// Asume que esta ruta se ajusta a la ubicación de tu imagen
import defaultImage from "../../../../img/Meal.png";
import BotonesCRUD from "../../botonesCRUD/BotonesCRUD";
import Item from "./item/Item";
import SectionStyles from "./SectionStyles"; // Importamos los estilos

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
  abrirCamaraParaItem,

  capturedImageData, // Recibe datos de imagen capturada
  onImageProcessed, // Callback para limpiar
}) {
  const {
    items,
    isLoading,
    error,
    crearItem,
    eliminarItem,
    editarItem,
    actualizarImageUriLocal,
  } = useItems(id);

  // ===== ESTADO LOCAL =====
  const [isEditing, setIsEditing] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState(title);

  // Efecto para procesar la imagen capturada
  useEffect(() => {
    // console.log(" -> Section recibió capturedImageData:", capturedImageData);
    if (capturedImageData && capturedImageData.itemId) {
      // Buscar si el ítem pertenece a esta sección
      const itemExiste = items.find(
        (item) => item.id === capturedImageData.itemId
      );

      if (itemExiste) {
        console.log(
          `Section ${id}: Actualizando ítem ${capturedImageData.itemId} con URI:`,
          capturedImageData.uri
        );

        // Actualizar el ítem con la nueva URI
        actualizarImageUriLocal(
          capturedImageData.itemId,
          capturedImageData.uri
        );

        // Notificar al padre que ya procesamos la imagen
        if (onImageProcessed) {
          onImageProcessed();
        }
      }
    }
  }, [capturedImageData, items, actualizarImageUriLocal, onImageProcessed, id]);

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
      // Reemplaza <div className="section-header"> por <View style={SectionStyles.sectionHeader}>
      <View style={SectionStyles.sectionHeader}>
        {isEditing ? (
          // Reemplaza <input> por <TextInput>
          <TextInput
            style={SectionStyles.titleEditableInput}
            value={nuevoTitulo}
            onChangeText={setNuevoTitulo} // Usar onChangeText en RN
            onSubmitEditing={handleSave} // Reemplaza onKeyDown (Enter) por onSubmitEditing
          />
        ) : (
          // Reemplaza <h2 onClick> por <Text style={...} onPress>
          <Text style={SectionStyles.titleEditable} onPress={handleEditClick}>
            {title}
          </Text>
        )}
        <BotonesCRUD
          isEditing={isEditing}
          onEliminar={() => onEliminarCategoria(id)}
          onEditar={handleCRUDBtnClick}
        />
      </View>
    );
  } else {
    // Reemplaza <h2> por <Text>
    tituloContent = <Text style={SectionStyles.titleCentered}>{title}</Text>;
  }

  // Funcion para el renderizado de la lista de items, estados de carga y error.
  const renderItemList = () => {
    // Caso de Carga
    if (isLoading) {
      return (
        <Text style={SectionStyles.sectionInfoText}>Cargando ítems...</Text>
      );
    }

    // Caso de Error
    if (error) {
      return (
        <Text
          style={StyleSheet.compose(SectionStyles.sectionInfoText, {
            color: "red",
          })}
        >
          Error al cargar: {error}
        </Text>
      );
    }

    // Caso Sin Ítems (y no estamos editando)
    if (items.length === 0 && !modoEdicion) {
      return (
        <Text style={SectionStyles.sectionInfoText}>
          No hay ítems en esta sección.
        </Text>
      );
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
        // Enviamos nueva PROP al Item
        imageUri={item.imageUri}
        abrirCamaraParaItem={abrirCamaraParaItem}
        actualizarImageUriLocal={actualizarImageUriLocal}
      />
    ));
  };

  // Reemplaza <button className="btn-agregar-item"> por <Pressable>
  const agregarItemBoton = modoEdicion && (
    <Pressable
      style={({ pressed }) => [
        SectionStyles.baseAddItemButton,
        pressed && SectionStyles.addItemButtonHover,
        { transform: [{ scale: pressed ? 1.05 : 1 }] }, // Simula transform: scale(1.05);
      ]}
      onPress={handleAddItem}
      hitSlop={10}
    >
      <Text style={SectionStyles.addItemButtonText}>Añadir Ítem</Text>
    </Pressable>
  );

  // ===== RETURN =====

  // Reemplaza <section> por <View>
  return (
    <View style={SectionStyles.sectionContainer}>
      {tituloContent}

      {/* Imagen de Categoría (opcional) */}
      {/* Reemplazamos <img> por <Image> y usamos onError nativo */}
      {image && !modoEdicion && (
        <Image
          // source espera un objeto { uri: string } para URLs
          source={{ uri: image }}
          // defaultImage (asumiendo que es una imagen local)
          defaultSource={defaultImage}
          style={SectionStyles.sectionImage}
          // El onError de RN es más limitado; defaultSource maneja mejor el fallback
        />
      )}

      {/* Reemplaza <div className="items-list"> por <View style={SectionStyles.itemsList}> */}
      <View style={SectionStyles.itemsList}>
        {renderItemList()}
        {agregarItemBoton}
      </View>
    </View>
  );
}
