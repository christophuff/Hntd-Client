const API_URL = process.env.REACT_APP_API_URL;

export const getMyFavorites = async () => {
    const response = await fetch(`${API_URL}/favorites`, {
        credentials: "include",
    });
    if (!response.ok) {
        return [];
    }
    return response.json();
};

export const addFavorite = async (hauntedLocationId) => {
    const response = await fetch(`${API_URL}/favorites`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({hauntedLocationId}),
    });
    return response.ok;
};

export const removeFavorite = async (locationId) => {
    const response = await fetch(`${API_URL}/favorites/${locationId}`, {
        method: "DELETE",
        credentials: "include",
    });
    return response.ok;
};