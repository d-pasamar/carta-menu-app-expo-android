🍽️ [NOMBRE DEL PROYECTO] - Menú Digital Interactivo

Esta es una aplicación de menú digital interactivo, diseñada para ser utilizada en tabletas o dispositivos Android a través de Expo. Permite a los dueños de negocios gestionar y actualizar su carta en tiempo real mediante un modo de edición integrado.

El proyecto está desarrollado en React Native (Expo) y utiliza componentes funcionales y hooks para una gestión de estado eficiente.

🌟 Características Principales

Modo Lectura: Vista limpia y optimizada del menú para el usuario final.

Modo Edición (CRUD): Un modo protegido que permite:

Crear, Editar y Eliminar categorías del menú.

Crear, Editar y Eliminar ítems dentro de cada categoría.

Cambio de nombre de ítems y categorías en línea (inline editing).

Diseño Responsivo: Adaptado para una visualización óptima en dispositivos móviles y tabletas.

Componentes Modulares: Estructura de componentes reutilizables (Section, Item, BotonesCRUD, etc.) para facilitar el mantenimiento.

🚀 Tecnologías Utilizadas

React Native

Expo (para el desarrollo y la construcción)

JavaScript (ES6+)

@expo/vector-icons (para la iconografía)

📁 Estructura del Proyecto

La estructura sigue una organización clara por funcionalidades y componentes:

carta-menu-app-expo-android/
├── App.jsx # Componente principal de la aplicación.
├── app/
│ └── components/ # Componentes reutilizables y la estructura del Menú.
│ ├── botonesCRUD/
│ ├── menu/
│ │ ├── Menu.jsx
│ │ ├── MenuStyles.js
│ │ └── section/
│ │ ├── Section.jsx
│ │ ├── SectionStyles.js
│ │ └── item/
│ │ ├── Item.jsx
│ │ └── ItemStyles.js
│ └── ...
├── assets/ # Recursos (imágenes, fuentes, etc.)
├── package.json
└── README.md

⚙️ Instalación y Ejecución

Sigue estos pasos para poner en marcha el proyecto:

1. Clonar el Repositorio

git clone [https://github.com/d-pasamar/carta-menu-app-expo-android.git](https://github.com/d-pasamar/carta-menu-app-expo-android.git)
cd carta-menu-app-expo-android

2. Instalar Dependencias

Asegúrate de tener Node.js y el CLI de Expo instalados globalmente.

npm install

# o

yarn install

3. Ejecutar la Aplicación

Inicia el servidor de desarrollo de Expo:

npx expo start

Escanea el código QR desde la aplicación Expo Go en tu dispositivo móvil o emulador Android.

📝 Próximos Pasos (Pendientes)

[ ] Implementar persistencia de datos (Firestore o AsyncStorage).

[ ] Mejorar la experiencia de usuario en la creación de nuevos ítems/categorías.

[ ] Añadir transiciones y animaciones más fluidas.

[ ] Optimización para el modo oscuro (Dark Mode).
