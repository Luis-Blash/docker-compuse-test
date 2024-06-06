import axios from "axios";

//* Cambiar el nombre de la api
const apiBack = axios.create({
	// baseURL: process.env.REACT_APP_BACK,
	baseURL: "http://localhost:5000/api",
	// baseURL: "https://rickandmortyapi.com/api/",
});

apiBack.interceptors.request.use((config) => {
	config.headers = {
		token: localStorage.getItem("token"),
	};
	return config;
});

export { apiBack };
