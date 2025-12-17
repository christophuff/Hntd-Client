import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getMe } from "./managers/authManager";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NavBar from "./components/nav/NavBar";
import Home from "./components/home/Home";
import LocationDetails from "./components/locations/LocationDetails";
import LocationForm from "./components/locations/LocationForm";
import MyLocations from "./components/locations/MyLocations";
import Favorites from "./components/favorites/Favorites";
import Profile from "./components/profile/Profile";
import ProfileEdit from "./components/profile/ProfileEdit";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe().then((userData) => {
      setUser(userData);
      setLoading(false);
    })
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register setUser={setUser}/>} />
          <Route path="*" element={<Login setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/locations/:id" element={<LocationDetails user={user}/>} />
          <Route path="/locations/new" element={<LocationForm />} />
          <Route path="/locations/:id/edit" element={<LocationForm />} />
          <Route path="/user-locations" element={<MyLocations user={user} />} /> 
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/profile/edit" element={<ProfileEdit user={user} setUser={setUser} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;