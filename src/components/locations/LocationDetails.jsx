import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getLocationById, deleteLocation } from "../../managers/locationManager";
import { getMyFavorites, addFavorite, removeFavorite } from "../../managers/favoritesManager";
import "./LocationDetails.css";

export default function LocationDetails({user}) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [location, setLocation] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true);

    const isOwner = location?.userId === user?.id;

    useEffect(() => {
        getLocationById(id).then((data) => {
            setLocation(data);
            setLoading(false);
        });

        getMyFavorites().then((favorites) =>  {
            const favorited = favorites.some(fav => fav.hauntedLocationId === parseInt(id));
            setIsFavorite(favorited);
        });
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this location?")) {
            const success = await deleteLocation(id);
            if (success) {
                navigate("/");
            }
        }
    };

    const handleFavoriteToggle = async () => {
        if (isFavorite) {
            const success = await removeFavorite(id);
            if (success) {
                setIsFavorite(false);
            }
        } else {
            const success = await addFavorite(parseInt(id));
            if (success) {
                setIsFavorite(true);
            }
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>
    }

    if (!location) {
        return <div className="not-found">Location not found.</div>
    }

    return (
        <div className="location-details-container">
            <div className="details-grid">
                <div className="left-content">
                    <div className="top-section">
                        <div className="image-card">
                            {location.imageUrl && (
                                <img
                                    src={location.imageUrl}
                                    alt={location.name}
                                    className="location-hero-image"
                                />
                            )}
                        </div>
                        <div className="title-section">
                            <h1>{location.name}</h1>
                            <p className="location-address">
                                {location.address}, {location.city}, {location.state}
                            </p>
                            <button
                                onClick={handleFavoriteToggle}
                                className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
                            >
                                {isFavorite ? "★ Remove From Favorites" : "☆ Add To Favorites"}
                            </button>
                            {isOwner && (
                                <div className="owner-actions">
                                    <Link to={`/locations/${id}/edit`} className="edit-btn">
                                        Edit
                                    </Link>
                                    <button onClick={handleDelete} className="delete-btn">
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bottom-section">
                        <div className="activities-card">
                            <h3>Reported Paranormal Activity</h3>
                            {location.paranormalActivities?.length > 0 ? (
                                <ul>
                                    {location.paranormalActivities.map((activity) => (
                                        <li key={activity.id}>{activity.name}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No activities reported</p>
                            )}
                        </div>

                        <div className="info-column">
                            <div className="info-card">
                                <h3>Location Info</h3>
                                <p><strong>Type:</strong> {location.locationType?.name}</p>
                                <p><strong>Activity Level:</strong> {location.activityLevel?.name}</p>
                            </div>
                            <div className="submission-card">
                                <h3>Submission Details</h3>
                                <p><strong>Added by:</strong> {location.user?.username}</p>
                                <p><strong>Date Added:</strong> {new Date(location.dateAdded).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="right-column">
                    <div className="description-card">
                        <h3>Description</h3>
                        <p>{location.description}</p>
                    </div>
                    {location.history && (
                        <div className="history-card">
                            <h3>History</h3>
                            <p>{location.history}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
