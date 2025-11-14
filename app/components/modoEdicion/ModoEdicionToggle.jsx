// app/components/modoEdicion/ModoEdicionToggle.jsx
// Botón que permite activar o desactivar el modo edición.
// Cambia el estado y la funcionalidad según el estado.

import { Pressable, Text } from "react-native";
import ModoEdicionToggleStyles from "./ModoEdicionToggleStyles"; //Importamos los estilos

/**
 * Componente ModoEdicionToggle.jsx
 * Botón que permite activar o desactivar el modo edición.
 * Cambia el estado y la funcionalidad según el estado.
 *
 * @param {boolean} props.modoEdicion - Estado actual del modo edición.
 * @param {Function} props.setModoEdicion - Función para cambiar el estado.
 * @returns {JSX.Element} - Elemento JSX con el botón flotante.
 */
export default function ModoEdicionToggle({ modoEdicion, setModoEdicion }) {
  // Función para manejar el toque y cambiar el estado
  const handleToggle = () => {
    setModoEdicion(!modoEdicion);
  };

  return (
    // Reemplazamos <button> por <Pressable>
    <Pressable
      onPress={handleToggle}
      // Aplicamos estilos base y efectos de hover/active
      style={({ pressed }) => [
        ModoEdicionToggleStyles.toggleButton,
        // Al estar presionado, aplicamos el estilo 'active' (simula :active)
        pressed && ModoEdicionToggleStyles.active,
        // También aplicamos una transformación de escala para simular el :active
        { transform: [{ scale: pressed ? 0.98 : 1 }] },
      ]}
      hitSlop={10} // Mejora la zona de toque
    >
      <Text
        // Aplicamos el estilo de texto base y el estilo de hover/active condicional
        style={({ pressed }) => [
          ModoEdicionToggleStyles.toggleText,
          // Aplicamos el color de hover al estar presionado
          pressed && ModoEdicionToggleStyles.hoverText,
          // También podemos cambiar el color de texto si está en modo Edición
          modoEdicion && { color: "#4e342e" },
        ]}
      >
        {modoEdicion ? "🔒 Salir" : "🛠 Editar"}
      </Text>
    </Pressable>
  );
}
