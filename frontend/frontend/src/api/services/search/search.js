import api from "../../axios";

export const searchContent = async (query) => {
    const response = await api.get(`/search?q=?${encodeURIComponent(query)}`);
    return response.data;
}