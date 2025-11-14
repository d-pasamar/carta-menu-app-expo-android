// app/components/header/Header.jsx

import { Text, View } from "react-native";
import HeaderStyles from "./HeaderStyles";

export default function Header() {
  // <header> se convierte en <View style={HeaderStyles.headerContainer}>
  return (
    <View style={HeaderStyles.headerContainer}>
      {/* <h1> se convierte en <Text style={HeaderStyles.title}> */}
      <Text style={HeaderStyles.title}>CAMPER CAFE</Text>

      {/* <p className="established"> se convierte en <Text style={HeaderStyles.establishedText}> */}
      <Text style={HeaderStyles.establishedText}>Est. 2020</Text>
    </View>
  );
}
