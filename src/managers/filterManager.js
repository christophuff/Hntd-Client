const API_URL = process.env.REACT_APP_API_URL;

export const getLocationTypes = async () => {
    const response = await fetch(`${API_URL}/locationtypes`, {
        credentials: "include",
    });
    if (!response.ok) {
        return [];
    }
    return response.json();
};

export const getActivityLevels = async () => {
    const response = await fetch(`${API_URL}/activitylevels`, {
        credentials: "include",        
    });
    if (!response.ok) {
        return [];
    }
    return response.json();
};

export const getParanormalActivities = async () => {
    const response = await fetch(`${API_URL}/activities`, {
        credentials: "include",
    });
    if (!response.ok) {
        return [];
    }
    return response.json();
};