// app/components/menu/section/item/Item.jsx

import { Image, StyleSheet, Text, TextInput, View } from "react-native"; // Importaciones Nativas

// Asume que BotonesCRUD.jsx será migrado después
import defaultImage from "../../../../../img/sin_foto.png"; // Imagen por defecto del producto
import useItemEditing from "../../../../hooks/useItemEditing"; // Hook con los handlers
import BotonesCRUD from "../../../botonesCRUD/BotonesCRUD";
import ItemStyles from "./ItemStyles"; // Importamos los estilos

/**
 * Componente Item.jsx
 * Renderiza un ítem de la carta con su nombre y precio.
 * Permite edición o eliminación según el modo actual.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {number} props.id - ID único del ítem.
 * @param {string} props.name - Nombre del ítem (ej. "Pizza Margarita").
 * @param {number} props.price - Precio del ítem en la carta.
 * @param {boolean} props.modoEdicion - Indica si el componente está en modo edición.
 * @param {Function} props.onEliminarItem - Callback para eliminar el ítem.
 * @param {Function} props.onEditarItem - Callback para editar el ítem.
 * @returns {JSX.Element} - Elemento JSX que representa el ítem.
 */

export default function Item({
  id, // Id del item: Reemplaza al anterior tituloCategoria
  name,
  price,
  modoEdicion,
  onEliminarItem,
  onEditarItem,
  abrirCamaraParaItem,
  imageUri, // recibe desde el estado
}) {
  // ===== ESTADO LOCAL =====
  //const [isEditing, setIsEditing] = useState(false);
  //const [nuevoNombre, setNuevoNombre] = useState(name);
  //const [nuevoPrecio, setNuevoPrecio] = useState(price);

  // ===== LLAMADA AL HOOK useItemEditing.js ( Lógica de Estado y Handlers) =====
  const {
    isEditing,
    nuevoNombre,
    setNuevoNombre,
    nuevoPrecio,
    setNuevoPrecio,
    handleSave,
    handleEditClick,
    handleCRUDBtnClick,
  } = useItemEditing(id, name, price, onEditarItem, imageUri);

  // Convierte el precio a un formato con dos decimales para el input
  const precioDisplay = typeof price === "number" ? price.toFixed(2) : price;

  // ===== LÓGICA DE RENDERIZADO =====

  // Renderizado condicional de los detalles del ítem
  const itemDetails =
    isEditing && modoEdicion ? (
      <>
        {/* Reemplazamos <input> por <TextInput> */}
        <TextInput
          style={ItemStyles.itemNameInput}
          value={nuevoNombre}
          onChangeText={setNuevoNombre} // Usar onChangeText
        />
        <TextInput
          style={ItemStyles.itemPriceInput}
          keyboardType="numeric" // Teclado numérico para precios
          value={String(nuevoPrecio)} // Asegurar que el valor sea un string
          onChangeText={setNuevoPrecio}
          onSubmitEditing={handleSave} // Guardar al presionar Enter/Done
        />
      </>
    ) : (
      <>
        {/* Reemplazamos <p> por <Text> y usamos onPress para editar */}
        <Text
          style={StyleSheet.compose(ItemStyles.baseText, ItemStyles.flavor)}
          onPress={modoEdicion ? handleEditClick : null} // onPress en lugar de onClick
        >
          {name}
        </Text>
        <Text style={StyleSheet.compose(ItemStyles.baseText, ItemStyles.price)}>
          ${precioDisplay}
        </Text>
      </>
    );

  // Renderizado condicional de los botones CRUD
  const botonesCRUD = modoEdicion && (
    <BotonesCRUD
      isEditing={isEditing}
      onEliminar={() => onEliminarItem(id)}
      onEditar={handleCRUDBtnClick}
      itemId={id}
      onOpenCamera={abrirCamaraParaItem}
    />
  );

  // Determinar el estilo de los detalles (normal o editable)
  const detailsContainerStyle =
    isEditing && modoEdicion
      ? ItemStyles.itemDetailsEditing
      : ItemStyles.itemDetails;

  // ===== RETURN =====

  // Reemplazamos <article> por <View> y aplicamos el estilo condicional
  return (
    <View
      style={
        modoEdicion
          ? ItemStyles.itemEditableContainer
          : ItemStyles.itemContainer
      }
    >
      {/* Muestra una imagen */}
      <View style={ItemStyles.imageContainer}>
        <Image
          // 💡 Vamos a intentar que se le pase alguna imagen
          source={imageUri ? { uri: imageUri } : defaultImage}
          style={ItemStyles.itemImageThumbnail}
          resizeMode="cover"
        />
      </View>
      {/* Contenedor de Detalles (Alineación horizontal de Nombre/Precio o Inputs) */}
      <View style={detailsContainerStyle}>{itemDetails}</View>
      {/* Botones de CRUD (Solo en modo edición) */}
      {botonesCRUD}
    </View>
  );
}
