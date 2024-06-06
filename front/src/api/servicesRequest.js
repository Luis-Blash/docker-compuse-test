
import { apiBack } from "./apiAxios";

const getMethod = async (url) => {
    const { data } = await apiBack.get(url);
    return data
}

const postMethod = async (url, form) => {
    const { data } = await apiBack.post(url,form);
    return data
}

const deleteMethod = async (url, form) => {
    const { data } = await apiBack.delete(url,form);
    return data
}

export{
    getMethod,
    postMethod,
    deleteMethod
}