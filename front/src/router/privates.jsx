import { redirect } from "react-router-dom";
import { LayoutExample } from "../Layout/LayoutExample";
import { Example } from "../pages/Examples/Example";
import { privateRoutes } from "./routesEndpoints";
import { getLogin } from "../api";

const getRequestPrivateRoute = async () => {
	const token = localStorage.getItem("token")
	if(!token){
		return redirect("auth");
	}
	const { status } = await getLogin(token);
	if (status > 0) {
		return redirect("auth");
	}
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
