import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const [storedEmail, setUser] = useState(null);

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        console.log("storedEmail" , storedEmail)
        if (storedEmail) {
            setUser(JSON.parse(storedEmail));
        } else {
            navigate("/login"); 
        }
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("token"); 
        sessionStorage.removeItem("token"); 
        navigate("/login"); 
    };

    return (
        <div>
            <h1>Welcome {storedEmail?.email || "User"}</h1> <button onClick={logout}>Logout</button>

            <div className="button-container">
                <button >Upload</button>
                <button >Download</button>

            </div>
        </div>
    );
};

export default HomePage;