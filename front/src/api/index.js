import { apiExampleName } from "./apiAxios";
import { Endpoints } from "./endpoints";

const responseAxios = (status = 0, msg = "", payload = null) => {
	return {
		status,
		msg,
		payload,
	};
};

export const getExampleEndpoints = async (value = 1) => {
	try {
		const { data } = await apiExampleName.get(`${Endpoints.episodieExample}/${value.toString()}`);
		return responseAxios(0, "example", data);
	} catch (error) {
		console.log("error", error.response);
		return responseAxios(1, "Error al obtener");
	}
};
