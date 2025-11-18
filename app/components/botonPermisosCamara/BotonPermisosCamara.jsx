// app/components/botonPermisosCamara/BotonPermisosCamara.jsx

import { CameraView } from "expo-camera";
import { Button, Text, TouchableOpacity, View } from "react-native";
import useCamaraConfig from "../../hooks/useCamaraConfig";
import BotonPermisosCamaraStyles from "./BotonPermisosCamaraStyles";

/**
 * Componente que al pulsar solicita los permisos de uso de la cámara
 */

export default function BotonPermisosCamara({ onPhotoCaptured, onCancel }) {
  // 1. Llamar al hook para obtener la lógica
  const {
    permission,
    requestPermission,
    facing,
    toggleCameraFacing,
    cameraRef,
    takePicture,
  } = useCamaraConfig();

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

  // Si se dan los permisos, renderizamos la cámara

  return (
    <View style={BotonPermisosCamaraStyles.camaraContainer}>
      <CameraView
        style={BotonPermisosCamaraStyles.camaraVista}
        // 1. Conecta la orientación (frontal/trasera)
        facing={facing}
        // 2. Conecta la referencia para poder capturar
        ref={cameraRef}
      />

      {/* AÑADIR CONTENEDOR DE BOTONES 🛑 */}
      <View style={BotonPermisosCamaraStyles.controles}>
        {/* 1. Botón Voltear */}
        <TouchableOpacity onPress={toggleCameraFacing}>
          <Text style={BotonPermisosCamaraStyles.textoBoton}>Voltear 🔄</Text>
        </TouchableOpacity>

        {/* 2. Botón Capturar */}
        <TouchableOpacity
          // Llama a takePicture, pasándole el callback del padre (onPhotoCaptured)
          onPress={() => takePicture(onPhotoCaptured)}
        >
          <Text style={BotonPermisosCamaraStyles.textoBoton}>Capturar 📸</Text>
        </TouchableOpacity>

        {/* 3. Botón Cancelar */}
        <TouchableOpacity
          // Llama al callback onCancel del padre (MenuApp) para cerrar la cámara
          onPress={onCancel}
        >
          <Text style={BotonPermisosCamaraStyles.textoBoton}>Cancelar ❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
