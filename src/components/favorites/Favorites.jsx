import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyFavorites, removeFavorite } from "../../managers/favoritesManager";
import "./Favorites.css";

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyFavorites().then((data) => {
            setFavorites(data);
            setLoading(false);
        });
    }, []);

    const handleRemove = async (locationId) => {
        const success = await removeFavorite(locationId);
        if (success) {
            setFavorites(favorites.filter(fav => fav.hauntedLocationId !== locationId));
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="favorites-container">
            <h1>My Favorites</h1>
            {favorites.length === 0 ? (
                <p className="no-favorites">You haven't favorited any locations yet.</p>
            ) : (
                <div className="favorites-grid">
                    {favorites.map((fav) => (
                        <div key={fav.id} className="favorite-card">
                            {fav.hauntedLocation.imageUrl && (
                                <img 
                                    src={fav.hauntedLocation.imageUrl} 
                                    alt={fav.hauntedLocation.name}
                                    className="favorite-image" 
                                />
                            )}
                            <div className="favorite-info">
                                <h3>{fav.hauntedLocation.name}</h3>
                                <p className="favorite-address">
                                    {fav.hauntedLocation.city}, {fav.hauntedLocation.state}
                                </p>
                                <p className="favorite-level">
                                    {fav.hauntedLocation.activityLevel?.name}
                                </p>
                                <div className="favorite-actions">
                                    <Link to={`/locations/${fav.hauntedLocationId}`} className="view-btn">
                                        View
                                    </Link>
                                    <button onClick={() => handleRemove(fav.hauntedLocationId)} className="remove-btn">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
