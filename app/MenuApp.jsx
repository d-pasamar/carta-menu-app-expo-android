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
import useImagePicker from "./hooks/useImagePicker";

import styles from "./MenuAppStyles";

export default function MenuApp() {
  // ===== ESTADO DE LA INTERFAZ =====
  const [modoEdicion, setModoEdicion] = useState(false);
  const [isCamaraActiva, setIsCamaraActiva] = useState(false);

  // Estado para pasar los datos de la imagen
  const [capturedImageData, setCapturedImageData] = useState(null);

  // ===== LLAMADA AL HOOK DE IMAGEN =====
  const { seleccionarImagenParaItem, editingItemId, setEditingItemId } =
    useImagePicker();

  // ===== GESTION DEL ESTADO Y CRUD DE CATEGORIAS (NIVEL SUPERIOR) =====
  // useCategorias se encarga de cargar las categorías desde la API
  const { categorias, agregarCategoria, eliminarCategoria, editarCategoria } =
    useCategorias(7032); // Nuestro usuario_id

  // Unifica Cámara y Galería
  const abrirCamaraParaItem = async (itemId) => {
    // Llamar al hook que maneja la alerta y la galería.
    const imageResult = await seleccionarImagenParaItem(
      itemId,
      setIsCamaraActiva
    );

    // Procesar el resultado
    if (imageResult) {
      if (imageResult.fromCamera) {
        // La cámara ya se abrió (setIsCamaraActiva(true) fue llamado en el hook)
        return; // Esperamos el resultado de BotonPermisosCamara
      }
      // Resultado de la Galería: El hook ya retornó la URI
      handlePhotoCaptured(imageResult.uri, imageResult.itemId);
    }
  };

  // --> FUNCIÓN: Guardado LOCAL (Única función de callback para Galería y Cámara)
  const handlePhotoCaptured = (photoUri, itemIdFromCamera = null) => {
    // Se usa el ID que viene del parámero 0 guardado en el hook useImagePicker.js

    const idToUpdate = itemIdFromCamera || editingItemId;
    if (!idToUpdate) {
      console.error("No hay ID de ítem");
      setIsCamaraActiva(false);
      return; // no guarda nada
    }

    // Guardamos la UIR y el ID para que Menu/Section/Item lo procesen
    setCapturedImageData({ itemId: idToUpdate, uri: photoUri });

    setIsCamaraActiva(false);
    setEditingItemId(null);
  };

  // ===== RETURN =====

  // 1. RENDERIZADO CONDICIONAL
  if (isCamaraActiva) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <BotonPermisosCamara
            onPhotoCaptured={handlePhotoCaptured}
            onCancel={() => {
              setIsCamaraActiva(false);
              setEditingItemId(null); // Se limpia al cancelar
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
              capturedImageData={capturedImageData}
              onImageProcessed={() => setCapturedImageData(null)}
            />

            <Line />
            <Footer />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
