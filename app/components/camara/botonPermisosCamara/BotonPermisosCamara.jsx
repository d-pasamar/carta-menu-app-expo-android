// app/components/camara/botonPermisosCamara/BotonPermisosCamara.jsx

import { Button, Text, View } from "react-native";
import useCamaraConfig from "../../../hooks/useCamaraConfig";
import BotonPermisosCamaraStyles from "./BotonPermisosCamaraStyles";

/**
 * Componente que al pulsar solicita los permisos de uso de la cámara
 */

export default function BotonPermisosCamara() {
  // 1. Llamar al hook para obtener la lógica
  const { permission, requestPermission, facing, toggleCameraFacing } =
    useCamaraConfig();

  // Lógica de permisos
  if (!permission) {
    // Camera permissions are still loading.
    return (
      <View style={BotonPermisosCamaraStyles.loadingContainer}>
        <Text style={BotonPermisosCamaraStyles.loadingText}>
          Verificando permisos de cámara...
        </Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={BotonPermisosCamaraStyles.grantedContainer}>
        <Text style={BotonPermisosCamaraStyles.grantedText}>
          Necesitamos permisos para mostrar la cámara...
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
}
