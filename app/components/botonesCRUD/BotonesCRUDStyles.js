// app/components/botonesCRUD/BotonesCRUDStyles.js

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Reemplaza .botones-crud
  crudContainer: {
    flexDirection: "row", // display: flex
    gap: 6, // gap: 0.5rem (aprox. 8px)
    marginTop: 6, // margin-top: 0.5rem
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },

  // Base para todos los botones: .btn-editar, .btn-eliminar, .btn-guardar
  baseButton: {
    backgroundColor: "burlywood",
    borderWidth: 1,
    borderColor: "#8b5e3c",
    borderRadius: 5,
    paddingVertical: 6.4, // ~ 0.4rem
    paddingHorizontal: 8, // ~ 0.8rem
    elevation: 2, // box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2)
  },

  // Estilo de texto común
  buttonText: {
    fontSize: 12, // ~ 0.85rem
    fontWeight: "bold",
    color: "#4e342e",
    textAlign: "center",
  },

  // Estilos de hover (usados para el estado 'pressed' en RN)

  // .btn-editar:hover
  hoverEditar: {
    backgroundColor: "#ffcc80",
  },

  // .btn-eliminar:hover
  hoverEliminar: {
    backgroundColor: "#ef9a9a",
  },

  // .btn-guardar:hover
  hoverGuardar: {
    backgroundColor: "#c8e6c9",
  },

  // NUEVO ESTILO PARA EL BOTÓN DE FOTO
  cameraButton: {
    backgroundColor: "burlywood",
    marginRight: 8, // Pequeña separación del botón Guardar/Editar
  },
});
