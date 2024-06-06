import { LayoutAuth } from "../Layout/LayoutAuth";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { publicRoutes } from "./routesEndpoints";

export const routerPublic = {
	element: <LayoutAuth></LayoutAuth>,
	path: publicRoutes.auth,
	children: [
		{
			index: true,
			element: <Login></Login>,
		},
		{
			path: publicRoutes.register,
			element: <Register></Register>,
		},
	],
};
