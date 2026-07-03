import api from "../../../services/api";

export const getToday = async () => {
    const response = await api.get("/today");

    return response.data;
};

export const saveToday = async (values) => {
    const response = await api.post("/today", {
        values,
    });

    return response.data;
};