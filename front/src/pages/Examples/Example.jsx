import { useNavigate } from "react-router-dom";
import { privateRoutes } from "../../router/routesEndpoints";

export const Example = () => {
	const navigation = useNavigate();

	const goTo = (url = privateRoutes.root) => {
		navigation(url);
	};
	return (
		<div className="flex items-center gap-4 m-2">
			<p>hola</p>
		</div>
	);
};
