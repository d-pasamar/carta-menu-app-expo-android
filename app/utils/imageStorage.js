// app/utils/imageStorage.js (versión con legacy)

import * as FileSystem from "expo-file-system/legacy";

export const saveImagePermanently = async (tempUri, itemId) => {
  try {
    const docDir = FileSystem.documentDirectory;
    const permanentDir = docDir + "product_images";
    const fileName = `item_${itemId}_${Date.now()}.jpg`;
    const permanentFilePath = `${permanentDir}/${fileName}`;

    // Crear carpeta si no existe
    await FileSystem.makeDirectoryAsync(permanentDir, { intermediates: true });

    // Copiar archivo
    await FileSystem.copyAsync({
      from: tempUri,
      to: permanentFilePath,
    });

    return permanentFilePath;
  } catch (error) {
    console.error("❌ Error guardando imagen (legacy):", error);
    throw error;
  }
};

export const deleteImagePermanently = async (uri) => {
  try {
    if (uri && uri.includes("product_images/")) {
      await FileSystem.deleteAsync(uri, { idempotent: true });
    }
  } catch (error) {
    console.error("❌ Error eliminando imagen (legacy):", error);
  }
};
