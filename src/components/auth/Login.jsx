import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../managers/authManager";
import "./Auth.css";

export default function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const user = await login(email, password);

        if  (user) {
            setUser(user);
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="auth-container">
            <h1>
                <img src="/hntd-ghost.png" alt="HNTD" height="80" width="80" />
                <span className="brand-logo">HNTD</span>
            </h1>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}
