import { useState } from "react";
// IMPORTACIONES NATIVAS
import { ImageBackground, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Nuestros componentes
import BotonPermisosCamara from "./components/botonPermisosCamara/BotonPermisosCamara";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Line from "./components/Line";
import Menu from "./components/menu/Menu";
import ModoEdicionToggle from "./components/modoEdicion/ModoEdicionToggle";

// HOOKS
import useCategorias from "./hooks/useCategorias";

import styles from "./MenuAppStyles";

export default function MenuApp() {
  // ===== ESTADO DE LA INTERFAZ =====
  const [modoEdicion, setModoEdicion] = useState(false);
  const [isCamaraActiva, setIsCamaraActiva] = useState(false);
  // NUEVO ESTADO: ID del ítem que se está editando, para la cámara
  const [editingItemId, setEditingItemId] = useState(null);

  // ===== GESTION DEL ESTADO Y CRUD DE CATEGORIAS (NIVEL SUPERIOR) =====
  // useCategorias se encarga de cargar las categorías desde la API
  const { categorias, agregarCategoria, eliminarCategoria, editarCategoria } =
    useCategorias(7032); // Nuestro usuario_id

  // FUNCIÓN QUE ACTIVA LA CÁMARA PARA UN ÍTEM ESPECÍFICO
  const abrirCamaraParaItem = (itemId) => {
    setEditingItemId(itemId); // 1. Guarda el ID del producto
    setIsCamaraActiva(true); // 2. Abre la cámara
  };

  // MODO FOTO
  // Función que se ejecuta cuando el usuario toma la foto
  const handlePhotoCaptured = (photoUri) => {
    console.log(`URI de foto capturada para ID ${editingItemId}: ${photoUri}`);
    // AQUÍ VA LA LÓGICA DE ASOCIAR photoUri CON editingItemId

    setIsCamaraActiva(false); // Cierra la cámara
    setEditingItemId(null); // Limpia el estado de edición
  };

  // ===== RETURN =====

  // 1. RENDERIZADO CONDICIONAL (Necesita ser ajustado)
  if (isCamaraActiva) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <BotonPermisosCamara
            onPhotoCaptured={handlePhotoCaptured}
            onCancel={() => {
              setIsCamaraActiva(false);
              setEditingItemId(null); // Asegura limpieza al cancelar
            }}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
  // 2. RENDERIZADO NORMAL DEL MENÚ
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

            <ModoEdicionToggle
              modoEdicion={modoEdicion}
              setModoEdicion={setModoEdicion}
            />

            <Line />

            <Menu
              data={categorias}
              modoEdicion={modoEdicion}
              // Funciones CRUD de CATEGORÍA
              onAgregarCategoria={agregarCategoria}
              onEliminarCategoria={eliminarCategoria}
              onEditarCategoria={editarCategoria}
              // NUEVA PROP PARA PASAR LA FUNCIÓN AL MENÚ
              abrirCamaraParaItem={abrirCamaraParaItem}
            />

            <Line />
            <Footer />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
