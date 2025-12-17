const API_URL = process.env.REACT_APP_API_URL;

export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            Authorization: "Basic " + btoa(`${email}:${password}`),
        },
    });
    if(!response.ok){
        return null;
    }
    return response.json();
};

export const logout = async () => {
    await fetch(`${API_URL}/auth/logout`, {
        credentials: "include",
    });
};

export const getMe = async() => {
    const response = await fetch(`${API_URL}/auth/me`, {
        credentials: "include",
    });
    if (!response.ok){
        return null;
    }
    return response.json();
};

export const register = async (username, email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, email, password}),        
    });
    if (!response.ok){
        return null;
    }
    return response.json();
};

export const updateProfile = async (profileData) => {
    const response = await fetch(`${API_URL}/auth/profile`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
    });
    if (!response.ok) {
        return null;
    }
    return response.json();
};