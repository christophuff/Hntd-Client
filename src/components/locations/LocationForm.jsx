import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLocationById, createLocation, updateLocation } from "../../managers/locationManager";
import { getLocationTypes, getActivityLevels, getParanormalActivities } from "../../managers/filterManager";
import { uploadImage } from "../../managers/imageManager";
import "./LocationForm.css";

export default function LocationForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [loading, setLoading] = useState(true);
    const [locationTypes, setLocationTypes] = useState([]);
    const [activityLevels, setActivityLevels] = useState([]);
    const [paranormalActivities, setParanormalActivities] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        latitude: "",
        longitude: "",
        description: "",
        history: "",
        imageUrl: "",
        locationTypeId: "",
        activityLevelId: "",
        paranormalActivityIds: []
    });
    const fileInputRef = useRef(null);

    useEffect(() => {
        Promise.all([
            getLocationTypes(),
            getActivityLevels(),
            getParanormalActivities()
        ]).then(([types, levels, activities]) => {
            setLocationTypes(types);
            setActivityLevels(levels);
            setParanormalActivities(activities);

            if (isEdit) {
                getLocationById(id).then((location) => {
                    if (location) {
                        setFormData({
                            name: location.name,
                            address: location.address,
                            city: location.city,
                            state: location.state,
                            latitude: location.latitude || "",
                            longitude: location.longitude || "",
                            description: location.description,
                            history: location.history || "",
                            imageUrl: location.imageUrl || "",
                            locationTypeId: location.locationTypeId,
                            activityLevelId: location.activityLevelId,
                            paranormalActivityIds: location.paranormalActivities?.map(pa => pa.id) || []
                        });
                    }
                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
        });
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleActivityToggle = (activityId) => {
        setFormData(prev => {
            const current = prev.paranormalActivityIds;
            if (current.includes(activityId)) {
                return {
                    ...prev,
                    paranormalActivityIds: current.filter(id => id !== activityId)
                };
            } else {
                return {
                    ...prev,
                    paranormalActivityIds: [...current, activityId]
                };
            }
        });
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const url = await uploadImage(file);
        if (url) {
            setFormData(prev => ({
                ...prev,
                imageUrl: url
            }));
        }
        setUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const locationData = {
            ...formData,
            locationTypeId: parseInt(formData.locationTypeId),
            activityLevelId: parseInt(formData.activityLevelId),
            latitude: formData.latitude ? parseFloat(formData.latitude) : null,
            longitude: formData.longitude ? parseFloat(formData.longitude) : null
        };

        let result;
        if (isEdit) {
            result = await updateLocation(id, locationData);
        } else {
            result = await createLocation(locationData);
        }

        if (result) {
            navigate(`/locations/${result.id}`);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="location-form-container">
            <h1>{isEdit ? "Edit Location" : "Add New Location"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input 
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address *</label>
                    <input 
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="city">City *</label>
                        <input 
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State *</label>
                        <input 
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Location Image</label>
                        <div className="image-upload-area" onClick={handleImageClick}>
                            {formData.imageUrl ? (
                                <img src={formData.imageUrl} alt="Location preview" className="image-preview" />
                            ) : (
                                <div className="image-placeholder">
                                    {uploading ? "Uploading..." : "Click to upload image"}
                                </div>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                hidden
                            />
                        </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="locationTypeId">Location Type *</label>
                        <select 
                            id="locationTypeId"
                            name="locationTypeId"
                            value={formData.locationTypeId}
                            onChange={handleChange}
                            required 
                        >
                            <option value="">Select Type</option>
                            {locationTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="activityLevelId">Activity Level *</label>
                        <select 
                            id="activityLevelId"
                            name="activityLevelId"
                            value={formData.activityLevelId}
                            onChange={handleChange}
                            required 
                        >
                            <option value="">Select Level</option>
                            {activityLevels.map((level) => (
                                <option key={level.id} value={level.id}>
                                    {level.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description *</label>
                    <textarea 
                        name="description" 
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="history">History</label>
                    <textarea 
                        name="history" 
                        id="history"
                        value={formData.history}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>
                <div className="form-group">
                    <label>Paranormal Activities</label>
                    <div className="activities-checkboxes">
                        {paranormalActivities.map((activity) => (
                            <label key={activity.id} className="checkbox-label">
                                <input 
                                    type="checkbox"
                                    checked={formData.paranormalActivityIds.includes(activity.id)}
                                    onChange={() => handleActivityToggle(activity.id)}
                                />
                                {activity.name}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-btn">
                        {isEdit ? "Update Location" : "Create Location"}
                    </button>
                </div>
            </form>
        </div>
    );
}
