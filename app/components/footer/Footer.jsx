// app/components/footer/Footer.jsx

import { Linking, Text, View } from "react-native";
import FooterStyles from "./FooterStyles";

export default function Footer() {
  const url = "https://www.freecodecamp.org";

  // Reemplazamos <footer>, <address>, y <p> por <View>
  return (
    <View style={FooterStyles.footerContainer}>
      {/* <address> es ahora un View */}
      <View>
        <Text style={FooterStyles.linkText}>
          {/* Reemplazamos <a> por <Text> y usamos Linking para la acción */}
          <Text onPress={() => Linking.openURL(url)} style={FooterStyles.link}>
            Visit our website
          </Text>
        </Text>

        {/* <p> es ahora un View */}
        <Text style={FooterStyles.addressText}>123 Free Code Camp Drive</Text>
      </View>
    </View>
  );
}
