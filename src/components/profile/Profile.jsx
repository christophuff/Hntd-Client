import { Link } from "react-router-dom";
import "./Profile.css";

export default function Profile({ user }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-avatar">
                    {user.imageUrl ? (
                        <img src={user.imageUrl} alt="Profile" className="user-photo" />
                    ) : (
                        <img src="/hntd-ghost.png" alt="Profile" className="default-photo" />
                    )}
                </div>
                <h2 className="profile-username">{user.username}</h2>
                <p className="profile-email">{user.email}</p>
                <p className="profile-date">Member Since: {formatDate(user.dateCreated)}</p>
                <Link to="/profile/edit" className="edit-profile-btn">
                    Edit Profile
                </Link>
            </div>
        </div>
    );
}
