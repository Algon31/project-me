export async function apiRequest(apiCall) {
    try {
        return await apiCall();
    } catch (error) {
        console.error(error);

        throw new Error(
            error.response?.data?.message ||
            "Something went wrong."
        );
    }
}