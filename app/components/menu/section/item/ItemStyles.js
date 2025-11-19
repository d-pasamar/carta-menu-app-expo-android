// app/components/menu/section/item/ItemStyles.js

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Estilo BASE para <Text> (reemplaza .item p)
  baseText: {
    // display: inline-block; ya no existe, se logra con flexDirection: 'row' en el padre.
    marginVertical: 5, // margin-top: 5px; margin-bottom: 5px;
    fontSize: 18,
  },

  // Estilo para el Nombre del Ítem (reemplaza .flavor)
  flavor: {
    textAlign: "left",
    width: "75%", // width: 75%;
  },

  // Estilo para el Precio del Ítem (reemplaza .price)
  price: {
    textAlign: "right",
    width: "25%", // width: 25%;
  },

  // Contenedor principal para MODO VISUALIZACIÓN
  itemContainer: {
    flexDirection: "column", // Coloca imagen, detalles y botones apilados verticalmente
    alignItems: "flex-start", // Alinea horizontalmente los elementos a la izquierda
  },

  // Contenedor principal para MODO EDICIÓN (reemplaza .item-editable)
  itemEditableContainer: {
    flexDirection: "column", // display: flex
    alignItems: "center", // align-items: center
    justifyContent: "space-between", // justify-content: space-between
    paddingVertical: 12,
    paddingHorizontal: 15,

    transition: "background-color 0.3s ease", // No funciona en RN, pero se incluye como nota.
  },

  // Contenedor de Detalles del Ítem (reemplaza .item-details)
  itemDetails: {
    flexDirection: "row", // Para alinear nombre y precio horizontalmente
    flexGrow: 1, // flex-grow: 1;
    alignItems: "center",
    marginRight: 15, // Espacio antes de los botones CRUD
  },

  // Contenedor de Detalles en MODO EDICIÓN (para alinear inputs)
  itemDetailsEditing: {
    flexDirection: "row", // Alineación horizontal de inputs
    flexGrow: 1,
    alignItems: "center",
    marginRight: 15,
  },

  // Estilos para los Inputs de Edición (reemplaza .item-name-input)
  itemNameInput: {
    flexGrow: 1, // flex-grow: 1;
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginRight: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Fondo claro para resaltar edición
    fontSize: 18, // Asegura que el texto sea legible
  },

  // Estilos para el Input de Precio (reemplaza .item-price-input)
  itemPriceInput: {
    width: 80, // Ancho fijo y legible
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    textAlign: "right",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Fondo claro para resaltar edición
    fontSize: 18, // Asegura que el texto sea legible
  },

  // Contenedor de la imagen
  imageContainer: {
    width: "100%",
    height: 100,
    borderRadius: 6,
    //backgroundColor: "#f0f0f0",
    //borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },

  // Thumbnail de la imagen
  itemImageThumbnail: {
    width: 100, // ANCHO
    height: 100, // ALTO
    borderRadius: 8, // Esquinas redondeadas
  },
});
