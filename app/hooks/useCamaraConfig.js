// app/hooks/useCamaraConfig.js

import { useCameraPermissions } from "expo-camera";
import { useState } from "react";

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

  return {
    permission,
    requestPermission,
    facing,
    toggleCameraFacing,
  };
}
