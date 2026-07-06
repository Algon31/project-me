import api from "../../../services/api";

export async function getGoals() {

    const response =
    await api.get("/goals");

    return response.data;

}