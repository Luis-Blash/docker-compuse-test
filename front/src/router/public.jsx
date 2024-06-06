import { LayoutExample } from "../Layout/LayoutExample";
import { publicRoutes } from "./routesEndpoints";

export const routerPublic = {
	element: <LayoutExample></LayoutExample>,
	path: publicRoutes.auth,
	children: [
		{
			index: true,
			element: <>auth</>,
		},
		{
			path: publicRoutes.register,
			element: <>registro</>,
		},
	],
};
