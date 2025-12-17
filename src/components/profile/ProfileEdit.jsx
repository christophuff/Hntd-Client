import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../managers/authManager";
import { uploadImage } from "../../managers/imageManager";
import "./Profile.css"

export default function ProfileEdit({ user, setUser }) {
    const [username, setUsername] = useState(user.username);
    const [imageUrl, setImageUrl] = useState(user.imageUrl || "");
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleImageClick = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setError("");

        const url = await uploadImage(file);
        if (url) {
            setImageUrl(url);
        } else {
            setError("Failed to upload image");
        }
        setUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const updatedUser = await updateProfile({
            username,
            imageUrl
        });

        if (updatedUser) {
            setUser({ ...user, username: updatedUser.username, imageUrl: updatedUser.imageUrl });
            navigate("/profile");
        } else {
            setError("Failed to update profile");
        }
    };


    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1>Edit Profile</h1>
                <form onSubmit={handleSubmit}>
                    <div className="profile-avatar editable" onClick={handleImageClick}>
                        {imageUrl ? (
                            <img src={imageUrl} alt="Profile" className="user-photo" />
                        ) : (
                            <img src="/hntd-ghost.png" alt="Profile" className="default-photo" />
                        )}
                        <div className="avatar-overlay">
                            {uploading ? "Uploading..." : "Change Photo"}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            hidden
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <p className="profile-email">{user.email}</p>

                    {error && <p className="error">{error}</p>}

                    <div className="form-actions">
                        <button type="button" onClick={() => navigate("/profile")} className="cancel-btn">
                            Cancel
                        </button>
                        <button type="submit" className="save-btn" disabled={uploading}>
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
