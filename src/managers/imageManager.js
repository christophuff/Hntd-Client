const API_URL = process.env.REACT_APP_API_URL;

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/image/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
    });

    if (!response.ok) {
        return null;
    }

    const data = await response.json();
    return data.url;
}