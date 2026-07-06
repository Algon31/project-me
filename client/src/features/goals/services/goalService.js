import api from "../../../services/api";

export async function getGoals() {

    const response =
        await api.get("/goals");

    return response.data;

}

export async function createGoal(goal) {

    const response =
        await api.post("/goals", goal);

    return response.data;

}

export async function updateGoal(id, goal) {

    const response =
        await api.put(`/goals/${id}`, goal);

    return response.data;

}