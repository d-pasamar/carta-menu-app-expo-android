// app/components/menu/section/SectionStyles.js

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Reemplaza .section (contenedor principal de la categoría)
  sectionContainer: {
    // Agregamos un margen inferior mínimo.
    marginBottom: 20,
    paddingHorizontal: 5,
  },

  // Reemplaza .titulo-centrado (h2 sin modo edición)
  titleCentered: {
    fontFamily: "Impact",
    fontSize: 30,
    textAlign: "center",
  },

  // Reemplaza .titulo-editable (h2 en modo edición)
  titleEditable: {
    fontFamily: "Impact",
    fontSize: 30,
    // El margin-bottom: 1.4rem se aplica al section-header
  },

  // Reemplaza .section-header { display: flex; ... }
  sectionHeader: {
    flexDirection: "flex", // display: flex
    justifyContent: "space-between", // justify-content: space-between
    alignItems: "center", // align-items: center
    marginBottom: 22, // ~ 1.4rem * 16px/rem
    // El font-family y font-size para h2 se aplican directamente en .titleEditable
  },

  // Estilos para el <input> de edición
  titleEditableInput: {
    // Copia los estilos de .titulo-editable para que se vea similar al h2
    fontFamily: "Impact",
    fontSize: 30,
    padding: 0,
    //borderBottomWidth: 1, // Simular un foco
    //borderColor: "brown",
    flexGrow: 1, // Permite que el input crezca
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Fondo claro para resaltar edición
    marginRight: 10,
  },

  // Reemplaza img
  sectionImage: {
    // display: block;
    // margin-left: auto; margin-right: auto; -> se hace con alignSelf: 'center'
    alignSelf: "center",

    // margin-top: -25px;
    marginTop: -25,

    // Las imágenes en RN necesitan dimensiones fijas (o relativas al contenedor)
    width: 200, // Ajustar según necesidad
    height: 200, // Ajustar según necesidad
    resizeMode: "cover",
  },

  // Reemplaza .items-list
  itemsList: {
    // Un contenedor simple para la lista y el botón.
  },

  // Reemplaza .section-loading y .section-error
  sectionInfoText: {
    textAlign: "center",
    fontStyle: "italic",
    paddingVertical: 10,
  },

  // Base para .btn-agregar-item
  baseAddItemButton: {
    // width: 180px;
    width: 180,

    // margin-left: auto; margin-right: auto;
    alignSelf: "center",

    // margin-top: 1rem; margin-bottom: 2rem;
    marginTop: 16, // ~ 1rem
    marginBottom: 32, // ~ 2rem

    // Colores y Bordes
    backgroundColor: "burlywood",
    borderWidth: 2,
    borderColor: "#8b5e3c",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 13,

    // box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    elevation: 3,
  },

  // Estilos de texto dentro del botón
  addItemButtonText: {
    // font-size: 0.8rem; font-weight: bold; color: #4e342e;
    fontSize: 12.8,
    fontWeight: "bold",
    color: "#4e342e",
    textAlign: "center",
  },

  // Estilo para el estado :hover (simulado con Pressable)
  addItemButtonHover: {
    backgroundColor: "#b2dfdb",
  },
});
