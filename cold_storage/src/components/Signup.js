import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        navigate("/login")
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Confirm Password: </label>
                    <input 
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <p> Already have an account? {" "}
                <span onClick={() => navigate("/login")}
                    style={{ cursor: "pointer", color: "blue"}}
                >Login</span>
            </p>
        </div>
    );
};

export default Signup;