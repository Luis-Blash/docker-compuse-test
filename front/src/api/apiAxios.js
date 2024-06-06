import axios from "axios";

//* Cambiar el nombre de la api
const apiExampleName = axios.create({
	// baseURL: process.env.REACT_APP_BACK,
	baseURL: "http://localhost:5000/api/",
	// baseURL: "https://rickandmortyapi.com/api/",
});

apiExampleName.interceptors.request.use((config) => {
	config.headers = {
		usertoken: localStorage.getItem("usertoken"),
	};
	return config;
});

export { apiExampleName };
