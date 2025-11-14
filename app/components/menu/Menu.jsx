// app/components/menu/Menu.jsx

import { Pressable, ScrollView, Text } from "react-native";
import MenuStyles from "./MenuStyles";
import Section from "./section/Section";

/**
 * Componente Menu.jsx
 * Renderiza la lista de categorías (sections) recibida de App.jsx.
 * Pasa las funciones de CRUD de CATEGORÍA a Section.jsx.
 * Maneja el botón global para añadir una nueva categoría (en modo edición).
 *
 * @param {Object[]} props.data - Array de categorías con sus ítems.
 * @param {boolean} props.modoEdicion - Indica si está en modo edición.
 * @param {Function} props.onAgregarCategoria - Callback para añadir categoría.
 * @param {Function} props.onEliminarCategoria - Callback para eliminar categoría.
 * @param {Function} props.onEditarCategoria - Callback para editar categoría.
 * @returns {JSX.Element} - Elemento JSX que representa el menú completo.
 */

export default function Menu({
  data,
  modoEdicion,
  // Props CRUD de Categoría
  onAgregarCategoria,
  onEliminarCategoria,
  onEditarCategoria,
}) {
  // ===== LOGICA =====

  // Renderizado condicional de las secciones
  const secciones = Array.isArray(data)
    ? data.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          image={section.image}
          // Section.jsx se encarga de cargar sus propios ítems internamente.
          modoEdicion={modoEdicion}
          // Funciones CRUD de Categoría
          onEliminarCategoria={onEliminarCategoria}
          onEditarCategoria={onEditarCategoria}
        />
      ))
    : null;

  // Botón para añadir categoría (solo en modo edición)
  // Reemplazamos <button> por <Pressable>
  const agregarCategoriaBoton = modoEdicion && (
    <Pressable
      // Usamos una función de estilo que detecta si está 'pressed'
      style={({ pressed }) => [
        MenuStyles.baseButton,
        // Simula el :hover/:active con un cambio de color y escala
        pressed && MenuStyles.buttonHover,
        { transform: [{ scale: pressed ? 1.05 : 1 }] }, // Simula transform: scale(1.05);
      ]}
      onPress={onAgregarCategoria}
      // Aseguramos que el área de toque sea accesible (hitSlop)
      hitSlop={10}
    >
      <Text style={MenuStyles.buttonText}>➕ Agregar Categoría</Text>
    </Pressable>
  );

  // ===== RETURN =====
  // Reemplazamos <main> por <ScrollView> para permitir el desplazamiento
  return (
    <ScrollView style={MenuStyles.menuContainer}>
      {secciones}
      {agregarCategoriaBoton}
    </ScrollView>
  );
}
