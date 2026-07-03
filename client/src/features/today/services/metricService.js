import api from "../../../services/api";

export const getMetrics = async () => {
    const response = await api.get("/metrics");
    // console.log(response.data);
    return response.data;
};