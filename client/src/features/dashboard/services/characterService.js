import api from "../../../services/api";
import { apiRequest } from "../../../utils/apiRequest";

export const getCharacter = () =>
    apiRequest(async () => {

        const response =
            await api.get("/character");

        return response.data;

    });