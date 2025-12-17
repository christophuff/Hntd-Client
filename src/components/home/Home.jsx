import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllLocations } from "../../managers/locationManager";
import { getLocationTypes, getActivityLevels, getParanormalActivities } from "../../managers/filterManager";
import "./Home.css";

export default function Home() {
    const [allLocations, setAllLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [locationTypes, setLocationTypes] = useState([]);
    const [activityLevels, setActivityLevels] = useState([]);
    const [paranormalActivities, setParanormalActivities] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [selectedActivity, setSelectedActivity] = useState("");

    useEffect(() => {
        Promise.all([
            getAllLocations(),
            getLocationTypes(),
            getActivityLevels(),
            getParanormalActivities()
        ]).then(([locations, types, levels, activities]) => {
            setAllLocations(locations);
            setFilteredLocations(locations);
            setLocationTypes(types);
            setActivityLevels(levels);
            setParanormalActivities(activities);
            setLoading(false);
        });
    }, []);

    const applyFilters = () => {
        let results = allLocations;

        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            results = results.filter(location => 
                location.name.toLowerCase().includes(search) ||
                location.city.toLowerCase().includes(search) ||
                location.state.toLowerCase().includes(search)
            );
        }

        if (selectedType) {
            results = results.filter(location => location.locationTypeId === parseInt(selectedType));
        }

        if (selectedLevel) {
            results = results.filter(location => location.activityLevelId === parseInt(selectedLevel));
        }

        if (selectedActivity) {
            results = results.filter(location => location.paranormalActivities?.some(pa => pa.id === parseInt(selectedActivity))
            );
        }

        setFilteredLocations(results);
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="home-container">
            <section className="search">
                <div className="search-section">
                    <div className="search-bar">
                        <input 
                            type="text"
                            placeholder="Search by name or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} 
                        />
                    </div>
                    <button onClick={applyFilters} className="search-btn">
                        Find HNTD Places
                    </button>
                </div>
                <div className="filter-bar">
                    <span className="filter-label">Filter By:</span>
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="">Location Type</option>
                        {locationTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                    <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                    >
                        <option value="">Activity Level</option>
                        {activityLevels.map((level) => (
                            <option key={level.id} value={level.id}>
                                {level.name}
                            </option>
                        ))}
                    </select>
                    <select
                        value={selectedActivity}
                        onChange={(e) => setSelectedActivity(e.target.value)}
                    >
                        <option value="">Activity Type</option>
                        {paranormalActivities.map((activity) => (
                            <option key={activity.id} value={activity.id}>
                                {activity.name}
                            </option>
                        ))}
                    </select>
                </div>
            </section>
            <div className="locations-grid">
                {filteredLocations.length === 0 ? (
                    <p className="no-results">No Locations Found</p>
                ) : (
                    filteredLocations.map((location) => (
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
                                <Link to={`/locations/${location.id}`} className="view-details-btn">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
