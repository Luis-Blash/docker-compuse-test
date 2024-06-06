import { Endpoints } from "./endpoints";
import { deleteMethod, getMethod, postMethod } from "./servicesRequest";

const responseAxios = (status = 0, msg = "", payload = null) => {
  return {
    status,
    msg,
    payload,
  };
};

export const getUsers = async () => {
  try {
    const { msg, payload } = await getMethod(Endpoints.users.root);
    return responseAxios(0, msg, payload.users);
  } catch (error) {
    console.log("error", error.response);
    return responseAxios(1, "Error al obtener");
  }
};

export const createUsers = async (form) => {
  try {
    const { payload } = await postMethod(Endpoints.users.root, form);
    return responseAxios(0, "example", payload);
  } catch (error) {
    console.log("error");
    console.log(error.response.data);
    return responseAxios(1, "Error al obtener");
  }
};

export const loginRequest = async (form) => {
  try {
    const { payload } = await postMethod(Endpoints.auth.login, form);
    return responseAxios(0, "example", payload);
  } catch (error) {
    console.log("error");
    console.log(error.response.data);
    return responseAxios(1, "Error al obtener");
  }
};


export const getLogin = async () => {
  try {
    const { payload } = await postMethod(`${Endpoints.auth.validate}`);
    return responseAxios(0, "example", payload);
  } catch (error) {
    console.log("error", error.response);
    return responseAxios(1, "Error al obtener");
  }
};

export const deleteLogin = async () => {
  try {
    const data = await deleteMethod(Endpoints.auth.logout);
    return responseAxios(0, "example", {data});
  } catch (error) {
    console.log("error", error.response);
    return responseAxios(1, "Error al obtener");
  }
};