import api from "../../../services/api";

export async function getAchievements() {

    const response =
        await api.get("/achievements");

    return response.data;

}