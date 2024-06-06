# Skeleton web

> Creado con Node v20.11.0

Este proyecto combina Vite, React, Tailwind y Three.js para proporcionar una estructura base robusta.

## 📂 Descripción del Enrutador de React

Este proyecto hace uso de la biblioteca `react-router-dom` para gestionar la navegación en una aplicación React. Aquí se presenta una breve descripción del código principal:

### 🗂️ Estructura de Archivos

> Para aprender mas de como funciona el enrutador de React ir [aquí](https://reactrouter.com/en/main/start/tutorial)

-   `/src/router/index.js`: El enrutador global.
-   `/src/router/public.js`: Contiene la configuración de las rutas públicas.
-   `/src/router/privates.js`: Contiene la configuración de las rutas privadas.

## ⚛️ Estructura del Redux

Redux se emplea para la gestión del estado de la aplicación. A continuación, se presenta una breve descripción de la estructura de archivos en la carpeta `/src/redux/`.

### `/src/redux/store.js`

En este archivo, se configura y exporta la tienda Redux utilizando la función `configureStore` de `@reduxjs/toolkit`. Se importa el slice `isActiveSlice` desde el archivo `example.js` y se agrega al objeto `reducer` con el nombre de `exampleName`.

-   `/src/redux/slices/example/example.js`: Es un ejemplo que puedes copiar para uno nuevo

## ◀️▶️ Estructura de axios

-   `src/api/apiAxios.js` contiene la configuración de la API, estableciendo la conexión con la API objetivo.

-   `src/api/index.js`, se implementan todos los métodos necesarios para interactuar con la API, siendo el punto central para añadir, modificar o eliminar métodos según el proyecto.

-   `src/api/endpoints.js` almacena las rutas de los endpoints para peticiones a la API externa, facilitando la organización y mantenimiento al centralizarlas en un solo lugar.

## 🏠 Estructura de threejs

-   `src/api/app`: En esta ubicación, encontrarás la aplicación inicial básica junto con una escena que carga un modelo y un cubo.

-   `src/api/common`: Aquí se encuentran archivos esenciales al 100% para el desarrollo, como la configuración de la cámara y las acciones del mouse.

-   `src/api/helpers`: Contiene algunos helpers, como draco, y un objeto de dat.gui para facilitar tareas auxiliares.

-   `src/api/objects`: En este directorio, hallarás un cubo básico que se puede utilizar temporalmente cuando el modelo no está disponible, así como un modelo que ejemplifica el uso de animaciones.
