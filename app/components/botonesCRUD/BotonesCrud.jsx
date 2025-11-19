// app/components/botonesCRUD/BotonesCRUD.jsx
// Componente de botones CRUD para edición.

import { Pressable, Text, View } from "react-native";
import BotonesCRUDStyles from "./BotonesCRUDStyles"; //Importamos los estilos

/**
 * Componente BotonesCRUD.jsx
 * Componente de botones CRUD para edición.
 *
 * @param {Function} props.onEditar - Callback para Editar o Guardar.
 * @param {Function} props.onEliminar - Callback para Eliminar.
 * @param {boolean} props.isEditing - Indica si el modo 'Guardar' está activo.
 * @returns {JSX.Element} - Elemento JSX con los botones.
 */
export default function BotonesCRUD({
  onEditar,
  onEliminar,
  isEditing,
  itemId,
  onOpenCamera,
}) {
  // Si estamos en edición -> guardar, si no -> Editar
  const buttonText = isEditing ? "💾 Guardar" : "✏️ Editar";

  // Determina el estilo base y de hover/pressed para el botón principal (Editar/Guardar)
  const mainButtonHoverStyle = isEditing
    ? BotonesCRUDStyles.hoverGuardar
    : BotonesCRUDStyles.hoverEditar;

  const isItemContext = itemId !== undefined && onOpenCamera !== undefined;

  return (
    // Reemplaza <div className="botones-crud"> por <View style={BotonesCRUDStyles.crudContainer}>
    <View style={BotonesCRUDStyles.crudContainer}>
      {/* Botón de CÁMARA (Solo visible si estamos editando) */}
      {isItemContext && isEditing && (
        <Pressable
          onPress={() => onOpenCamera(itemId)} // Llama a la función del padre con el ID del ítem
          style={({ pressed }) => [
            BotonesCRUDStyles.baseButton,
            BotonesCRUDStyles.cameraButton, // Estilo específico para el botón de foto
            { transform: [{ scale: pressed ? 1.05 : 1 }] },
          ]}
          hitSlop={10}
        >
          <Text style={BotonesCRUDStyles.buttonText}>📸 Foto</Text>
        </Pressable>
      )}

      {/* Botón Guardar / Editar */}
      <Pressable
        onPress={onEditar}
        // Aplicamos estilos base, estilo de hover/pressed condicional, y la transformación de escala
        style={({ pressed }) => [
          BotonesCRUDStyles.baseButton,
          pressed && mainButtonHoverStyle,
          { transform: [{ scale: pressed ? 1.05 : 1 }] }, // Efecto de escala
        ]}
        hitSlop={10} // Mejora la zona de toque en móviles
      >
        <Text style={BotonesCRUDStyles.buttonText}>{buttonText}</Text>
      </Pressable>

      {/* Botón Eliminar (Solo visible si NO estamos en modo edición) */}
      {!isEditing && (
        <Pressable
          onPress={onEliminar}
          // Aplicamos estilos base, estilo de hover/pressed para eliminar, y la transformación de escala
          style={({ pressed }) => [
            BotonesCRUDStyles.baseButton,
            pressed && BotonesCRUDStyles.hoverEliminar,
            { transform: [{ scale: pressed ? 1.05 : 1 }] }, // Efecto de escala
          ]}
          hitSlop={10}
        >
          <Text style={BotonesCRUDStyles.buttonText}>🗑️ Eliminar</Text>
        </Pressable>
      )}
    </View>
  );
}
