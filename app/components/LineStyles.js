// app/components/LineStyles.js

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Mapeo de .line { height: 2px; background-color: brown; }
  line: {
    height: 2,
    backgroundColor: "brown",
    width: "100%", // imitar el comportamiento de <hr />
    marginVertical: 1, // Margen para separación
  },
});
