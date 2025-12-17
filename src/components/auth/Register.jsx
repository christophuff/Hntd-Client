import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../managers/authManager";
import "./Auth.css";

export default function Register({ setUser }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const user = await register(username, email, password);

        if (user){
            setUser(user);
            navigate("/");
        } else {
            setError("Registration failed");
        }
    };

    return (
        <div className="auth-container">
            <h1>
                <img src="/hntd-ghost.png" alt="HNTD" height="80" width="80" />
                <span className="brand-logo">HNTD</span>
            </h1>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input 
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/">Login</Link>
            </p>
        </div>
    );
}
