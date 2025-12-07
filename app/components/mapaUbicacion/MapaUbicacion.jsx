// app/components/mapaUbicacion/MapaUbicacion.jsx

import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapaUbicacion() {
  // Coordenadas de ejemplo (Las Palmas de Gran Canaria)
  const ubicacion = {
    latitude: 28.1235459,
    longitude: -15.4362574,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📍 Encuéntranos aquí</Text>
      <MapView style={styles.mapa} initialRegion={ubicacion}>
        <Marker
          coordinate={{
            latitude: ubicacion.latitude,
            longitude: ubicacion.longitude,
          }}
          title="Nuestra Cafetería"
          description="¡Ven a visitarnos!"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#4e342e",
  },
  mapa: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    overflow: "hidden",
  },
});
