const API_URL = process.env.REACT_APP_API_URL;

export const getAllLocations = async () => {
    const response = await fetch(`${API_URL}/hauntedlocations`, {
        credentials: "include",
    });
    if (!response.ok) {
        return [];
    }
    return response.json();
};

export const getLocationById = async (id) => {
    const response = await fetch(`${API_URL}/hauntedlocations/${id}`, {
        credentials: "include",
    });
    if (!response.ok) {
        return null;
    }
    return response.json();
};

export const createLocation = async (location) => {
    const response = await fetch(`${API_URL}/hauntedlocations`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(location),
    });
    if(!response.ok) {
        return null;
    }
    return response.json();
};

export const updateLocation = async(id, location) => {
    const response = await fetch(`${API_URL}/hauntedlocations/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(location),
    });
    if (!response.ok) {
        return null;
    }
    return response.json();
};

export const deleteLocation = async (id) => {
    const response = await fetch(`${API_URL}/hauntedlocations/${id}`, {
        method: "DELETE",
        credentials: "include",
    });
    return response.ok;
}