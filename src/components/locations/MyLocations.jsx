import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllLocations, deleteLocation } from "../../managers/locationManager";
import "./MyLocations.css";

export default function MyLocations({ user }) {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllLocations().then((data) => {
            const myLocations = data.filter(loc => loc.userId === user.id);
            setLocations(myLocations);
            setLoading(false);
        });
    }, [user.id]);

    const handleDelete = async (locationId) => {
            if (window.confirm("Are you sure you want to delete this location?")) {
                const success = await deleteLocation(locationId);
                if (success) {
                    setLocations(locations.filter(loc => loc.id !== locationId));
                }
            }
        };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="my-locations-container">
            <div className="my-locations-header">
                <h1>My Locations</h1>
                <Link to="/locations/new" className="add-btn">
                    Add New Location
                </Link>
            </div>
            {locations.length === 0 ? (
                <p className="no-locations">You haven't added any locations yet.</p>
            ) : (
                <div className="locations-grid">
                    {locations.map((location) => (
                        <div key={location.id} className="location-card">
                            {location.imageUrl && (
                                <img 
                                    src={location.imageUrl} 
                                    alt={location.name}
                                    className="location-image" 
                                />
                            )}
                            <div className="location-info">
                                <h3>{location.name}</h3>
                                <p className="location-address">
                                    {location.city}, {location.state}
                                </p>
                                <p className="activity-level">
                                    {location.activityLevel?.name}
                                </p>
                                <div className="card-actions">
                                    <Link to={`/locations/${location.id}`} className="view-btn">
                                        View
                                    </Link>
                                    <Link to={`/locations/${location.id}/edit`} className="edit-btn">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDelete(location.id)} className="delete-btn">
                                        Delete
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
