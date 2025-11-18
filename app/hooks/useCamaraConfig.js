// app/hooks/useCamaraConfig.js

import { useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";

/**
 * Custom hook: Encapsula la lógica de configuración (permisos y orientación) de la cámara.
 */

export default function useCamaraConfig() {
  // 1. Permisos
  const [permission, requestPermission] = useCameraPermissions();

  // 2. Orientación (frontal/trasera)
  const [facing, setFacing] = useState("back");

  // 3. Lógica para cambiar de cámara

  /**
   * Cambia la orientación de la cámara activa de frontal a trasera, o viceversa.
   * Modifica el estado 'facing'.
   * @returns {void}
   */
  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const cameraRef = useRef(null);

  // 4. Lógica para tomar una foto

  /**
 * Captura una foto usando la cámara activa y devuelve la URI local del archivo.
 * @param {function(string): void} onCapture - Función callback que recibe la URI (ruta local) de la foto capturada.
 * @returns {void}
 */
  const takePicture = async (onCapture) => {
    // 1. Verificar que la referencia de la cámara existe
    if (cameraRef.current) {
      // 2. Llamar al método de captura de la CameraView
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        exif: false,
      });

      // 3.Deolver la URI al componente padre
      onCapture(photo.uri);
    }
  };

  return {
    permission,
    requestPermission,
    facing,
    toggleCameraFacing,
    cameraRef,
    takePicture,
  };
}
