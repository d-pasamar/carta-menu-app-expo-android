// app/components/menu/MenuStyles.js

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Reemplaza main
  menuContainer: {
    marginBottom: 25, // margin-bottom: 25px
    // Se usa ScrollView en el JSX.
  },

  // Base para .btn-agregar-categoria
  baseButton: {
    // display: block; width: 200px;
    width: 200,

    // margin-left: auto; margin-right: auto;
    // Se reemplaza por alignSelf: 'center'
    alignSelf: "center",

    // margin-top: 1.5rem; margin-bottom: 1.5rem;
    marginVertical: 24, // 1.5rem * 16px/rem = 24px (típico)

    // background-color: burlywood;
    backgroundColor: "burlywood",

    // border: 2px solid #8b5e3c; border-radius: 6px;
    borderWidth: 2,
    borderColor: "#8b5e3c",
    borderRadius: 6,

    // padding: 0.4rem 0.8rem; -> Usaremos padding horizontal y vertical
    paddingVertical: 6, // ~ 0.4rem
    paddingHorizontal: 13, // ~ 0.8rem

    // box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    // RN usa elevation para Android y shadow* para iOS.
    // Usaremos elevation para un efecto simple en Android.
    elevation: 3,
  },

  // Estilos de texto dentro del botón
  buttonText: {
    // font-size: 0.85rem;
    fontSize: 13.6, // 0.85rem * 16px/rem
    // font-weight: bold;
    fontWeight: "bold",
    // color: #4e342e;
    color: "#4e342e",
    textAlign: "center",
  },

  // Estilo para el estado :hover
  // Este estilo será usado en la función de estilo del Pressable
  buttonHover: {
    backgroundColor: "#b2dfdb", // background-color: #b2dfdb;
    // La transformación (scale) se aplica en el Pressable
  },
});
