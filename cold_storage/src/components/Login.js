import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {

    const [formData, setFormData] = useState({ email: "", password: ""});

    const handleFormData = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
          await axios.post("http://localhost:9193/user/login", {
              email: formData.email,
              password: formData.password,
          }).then(resp => {
            console.log("Response:", resp);
            const token = resp.data.token;

            if (token) {
                localStorage.setItem("jwt", token);
            }
            if (resp.data) {
              navigate("/homepage");
            } else {
              navigate("/login")
            }
          });
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
              name="email" 
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
              onChange={handleFormData}
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