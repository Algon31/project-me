import api from "../../../services/api";

export const getMetrics = async () => {
    const response = await api.get("/metrics");
    return response.data;
};

export const createMetric = async (metric) => {
    const response = await api.post("/metrics", metric);
    return response.data;
};

export const updateMetric = async (id, metric) => {
    const response = await api.put(`/metrics/${id}`, metric);
    return response.data;
};

export const deleteMetric = async (id) => {
    const response = await api.delete(`/metrics/${id}`);
    return response.data;
};