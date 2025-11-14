import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Reemplaza <header>
  headerContainer: {
    // <header> suele ser un contenedor simple, no necesita estilos complejos aquí.
  },  
  // Reemplaza h1 {}
  title: {
    // h1 { font-family: Impact, serif; } 
    fontFamily: 'Impact',   
    fontSize: 40, // font-size: 40px 
    marginTop: 0, // margin-top: 0
    marginBottom: 15, // margin-bottom: 15px
    textAlign: 'center', // text-align: center    
    // Impact suele ser una fuente en mayúsculas y en negrita
    fontWeight: 'bold', 
  },

  // Reemplaza .established {}
  establishedText: {
    // .established { font-style: italic; }
    fontStyle: 'italic',    
    textAlign: 'center', 
  },
});