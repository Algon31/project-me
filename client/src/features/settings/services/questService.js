import api from "../../../services/api";

export const getQuests = async () => {
    const response = await api.get("/quests");
    return response.data;
};

export const createQuest = async (quest) => {
    const response = await api.post("/quests", quest);
    return response.data;
};

export const updateQuest = async (id, quest) => {
    const response = await api.put(`/quests/${id}`, quest);
    return response.data;
};

export const deleteQuest = async (id) => {
    const response = await api.delete(`/quests/${id}`);
    return response.data;
};