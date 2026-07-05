import api from "../../../services/api";
import { apiRequest } from "../../../utils/apiRequest";

export const getDashboard = () =>
    apiRequest(async () => {
        const response = await api.get("/dashboard");
        return response.data;
    });