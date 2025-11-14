// MenuAppStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda la pantalla
    // backgroundImage no existe en RN, se hace con <ImageBackground>
    // fontFamily se aplica en cada <Text>, no en el body
    padding: 20,
  },
  menuContainer: {
    position: "relative",
    width: "80%",
    backgroundColor: "burlywood",
    //margin-left: "auto",    // RN no soporta auto, se usa alignSelf
    //margin-right: "auto",
    padding: 20,
    maxWidth: 500, // RN soporta valores numéricos en px
    alignSelf: "center", // reemplazo de margin auto
  },
});
