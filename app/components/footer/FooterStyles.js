import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Reemplaza footer {} y address {} (Estilos de contenedor/bloque)
  footerContainer: {
    // font-size en un contenedor no aplica en RN.
    // Se aplica directamente a los componentes <Text>.
    // address { font-style: normal; } se resuelve porque <Text> no es cursiva por defecto.
  },

  // Reemplaza .address (Estilo de texto específico)
  addressText: {
    // margin-bottom: 5px; -> se convierte en marginBottom: 5
    marginBottom: 5,
    textAlign: "center", // text-align: center;
    fontSize: 14, // font-size: 14px;
  },

  // Reemplaza p {} (Estilo de texto general)
  linkText: {
    textAlign: "center", // p { text-align: center; }
    fontSize: 14, // font-size: 14px;
    marginBottom: 5, // Un poco de espacio
  },

  // Reemplaza a {} y a:visited {} (Estilo del enlace)
  link: {
    color: "black", // color: black;

    // Los pseudo-selectores :hover, :active, y :visited NO existen en RN.
    // Para el efecto hover/active, podemos usar el componente <Pressable> o
    // gestionarel estado del color con un useState en el componente.
  },
});
