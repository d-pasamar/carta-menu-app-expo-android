import { useState } from "react";
// IMPORTACIONES NATIVAS
import { ImageBackground, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Nuestros componentes
import Line from "./components/Line";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Menu from "./components/menu/Menu";
//import ModoEdicionToggle from "./components/modoEdicion/ModoEdicionToggle";

// HOOKS
//import useCategorias from "./hooks/useCategorias";

import styles from "./MenuAppStyles";

export default function MenuApp() {
  // ===== ESTADO DE LA INTERFAZ =====
  const [modoEdicion, setModoEdicion] = useState(false);

  // ===== GESTION DEL ESTADO Y CRUD DE CATEGORIAS (NIVEL SUPERIOR) =====
  // useCategorias se encarga de cargar las categorías desde la API
  //const { categorias, agregarCategoria, eliminarCategoria, editarCategoria } =
  //  useCategorias(7032); // Nuestro usuario_id

  // ===== RETURN =====
  return (
    <SafeAreaProvider>
      {/* Evita que el contenido quede tapado por la barra de estado, notch o gestos del sistema */}
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{
            uri: "https://cdn.freecodecamp.org/curriculum/css-cafe/beans.jpg",
          }}
          style={styles.imageBackground}
        >
          <View style={styles.menuContainer}>
            <Header />
            {/*
        <ModoEdicionToggle
          modoEdicion={modoEdicion}
          setModoEdicion={setModoEdicion}
        /> */}
            <Line />

            <Menu
              data={categorias}
              modoEdicion={modoEdicion}
              // Funciones CRUD de CATEGORÍA
              onAgregarCategoria={agregarCategoria}
              onEliminarCategoria={eliminarCategoria}
              onEditarCategoria={editarCategoria}
            />

            <Line />
            <Footer />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
