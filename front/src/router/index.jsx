import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import { NotFound } from "../pages/Shared";

import { Versioner } from "../components/helpers/Versioner";

// Importaciones de las configuraciones de rutas públicas y privadas
import { routerPublic } from "./public";
import { routerPrivate } from "./privates";

const router = createBrowserRouter([
	{
		// Define el componente a renderizar en caso de error de ruta
		errorElement: <NotFound />,

		// Define el contenedor principal que envuelve las rutas
		element: (
			<>
				{/* 
          Define un contenedor fijo que ocupa toda la pantalla y está posicionado en la parte superior.
          Este contenedor actúa como un "layout" para las rutas de la aplicación.
        */}
				<main className="fixed top-0 w-full h-full">
					<Outlet /> {/* Punto de salida para las rutas secundarias */}
					<Versioner /> {/* Componente Versioner */}
				</main>
			</>
		),

		// Define las rutas secundarias agrupadas en routerPrivate y routerPublic
		children: [routerPrivate, routerPublic],
	},
]);

export const RouterApp = () => {
	return <RouterProvider router={router} />;
};
