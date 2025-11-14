// app/components/modoEdicion/ModoEdicionToggle.js

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Reemplaza .modo-edicion-toggle
  toggleButton: {
    position: "absolute", // position: absolute;
    top: 70, // top: 20px;
    right: 10, // right: 20px;
    zIndex: 10, // z-index: 10;

    backgroundColor: "burlywood",
    borderWidth: 2,
    borderColor: "#8b5e3c",
    borderRadius: 6,

    paddingVertical: 4, // ~ 0.4rem
    paddingHorizontal: 8, // ~ 0.9rem

    alignItems: 'center',
    justifyContent: 'center',

    //maxWidth: 120,
    //overflow: "hidden", // No necesario en RN, pero buena práctica
  },

  // Estilos de texto
  toggleText: {
    fontSize: 11, // ~ 0.8rem
    fontWeight: "bold",
    textAlign: "center",
    color: "#4e342e", // Color de texto base
  },

  // Estilos de hover (usados para el estado 'pressed' en RN)

  // .modo-edicion-toggle:hover
  hover: {
    backgroundColor: "#ffe0b2",
  },

  // .modo-edicion-toggle:hover y :active
  hoverText: {
    color: "#d35400",
  },

  // .modo-edicion-toggle:active (simulado con pressed)
  active: {
    backgroundColor: "#ffcc80",
  },
});
