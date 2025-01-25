import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Signup = () => {

    const [formData, setFormData] = useState({ email: "", password: "", confirmPassword:"" });

    const handleFormData = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const navigate = useNavigate();

    const handleSignup = async (e) => {       
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:9193/user", {
                email: formData.email,
                password: formData.password,
            });
            console.log("Response:", response.data);
            navigate("/login");
        } catch (error) {
            console.error("Error during signup:", error.response?.data || error.message);
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <div>
                    <label>Email:</label>
                    <input type="email"
                    name="email" 
                    value={formData.email} 
                    onChange={handleFormData}
                    required />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password"
                                name="password" 
                                value={formData.password} 
                    onChange={handleFormData} />
                </div>
                <div>
                    <label>Confirm Password: </label>
                    <input 
                        type="password"
                        name="confirmPassword" 
                        value={formData.confirmPassword} 
                        onChange={handleFormData}
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