// app/components/botonPermisosCamara/BotonPermisosCamaraStyles.js

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Cargando
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  // Permisos
  grantedContainer: {
    flex: 1,
    justifyContent: "center",
  },
  grantedText: {
    marginTop: 10,
    fontSize: 16,
  },
  // Camara
  camaraContainer: {
    flex: 1,
  },
  camaraVista: {
    flex: 1,
  },
  controles: {
    position: "absolute", // Fija los controles encima de la vista de la cámara
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row", // Organiza los botones en una fila
    justifyContent: "space-around", // Espacio uniforme entre los botones
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Fondo semitransparente para legibilidad
  },
  textoBoton: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },
});
