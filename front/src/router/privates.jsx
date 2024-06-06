import { LayoutExample } from "../Layout/LayoutExample";
import { Example } from "../pages/Examples/Example";
import { Example3D } from "../pages/Examples/Example3D";
import { privateRoutes } from "./routesEndpoints";

const getRequestPrivateRoute = async () => {
	// console.log(localStorage.getItem("token"), data);
	// const { status, payload } = await getDataExample();
	// if (status > 0) {
	// 	return redirect("auth");
	// }
	return "data";
};

export const routerPrivate = {
	element: <LayoutExample></LayoutExample>,
	loader: getRequestPrivateRoute,
	path: privateRoutes.root,
	children: [
		{
			index: true,
			element: <Example></Example>,
		},
	],
};
