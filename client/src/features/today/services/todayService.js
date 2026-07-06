import api from "../../../services/api";

export async function getToday() {

    const response = await api.get("/today");

    return response.data;

}

export async function saveQuest(id, value) {

    const response = await api.post(

        `/today/quest/${id}`,

        {

            value,

        }

    );

    return response.data;

}