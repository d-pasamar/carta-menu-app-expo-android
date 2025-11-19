// app/hooks/useImagePicker.js

import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";

export default function useImagePicker() {
  // ===== ESTADO LOCAL =====
  const [editingItemId, setEditingItemId] = useState(null);

  /**
   * FUNCIÓN: Abre la galería para seleccionar una imagen.
   */
  const pickImage = async (itemId) => {
    try {
      // Solicitar los permisos de la galería
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permiso Requerido",
          "Necesitamos el permiso para acceder a su galería."
        );
        return null;
      }

      // Abrir la galería (Solo si el permiso fue 'granted')
      let result = await ImagePicker.launchImageLibraryAsync({
        // Usamos la sintaxis estándar de Expo
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        return {
          uri: result.assets[0].uri,
          itemId: itemId,
        };
      }
    } catch (error) {
      console.error("Error al seleccionar la imagen de la galería:", error);
      Alert.alert(
        "Error",
        "No se pudo acceder a la galería. Verifique los permisos."
      );
    }
    return null; // Retorna null si se cancela o hay error
  };

  /**
   * FUNCIÓN: Muestra la alerta para elegir entre Cámara o Galería.
   * Retorna una Promesa con los datos de la imagen (URI y ID) o null.
   */
  const seleccionarImagenParaItem = (itemId, onCameraOpen) => {
    // Guarda el ID del ítem.
    setEditingItemId(itemId);

    return new Promise((resolve) => {
      Alert.alert(
        "Seleccionar Imagen",
        "¿Cómo quieres añadir la foto del producto?",
        [
          {
            text: "Galería",
            onPress: async () => {
              const data = await pickImage(itemId);
              resolve(data);
            },
          },
          {
            text: "Cámara",
            onPress: () => {
              // Notificamos al padre para que cambie al renderizado de cámara
              onCameraOpen(true);
              resolve({ itemId: itemId, fromCamera: true });
            },
          },
          { text: "Cancelar", style: "cancel", onPress: () => resolve(null) },
        ],
        { cancelable: true }
      );
    });
  };

  return {
    seleccionarImagenParaItem,
    editingItemId,
    setEditingItemId,
  };
}
