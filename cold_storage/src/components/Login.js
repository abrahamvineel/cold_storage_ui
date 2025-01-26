import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";

const Login = () => {

    const [formData, setFormData] = useState({ email: "", password: ""});

    const handleFormData = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(formData.password, salt);

        try {
          const response = await axios.post("http://localhost:9193/user/login", {
              email: formData.email,
              password: hashedPassword,
          });
          console.log("Response:", response.data);
          navigate("/homepage");
      } catch (error) {
          console.error("Error during signup:", error.response?.data || error.message);
      }
    }

    return (
        <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={formData.email} 
              onChange={handleFormData}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password" 
              value={formData.password} 
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} style={{ cursor: "pointer", color: "blue" }}>
            Sign Up
          </span>
        </p>
      </div> 
    );
};

export default Login;