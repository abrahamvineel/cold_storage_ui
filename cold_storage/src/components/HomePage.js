import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const HomePage = () => {
    const navigate = useNavigate();
    const [storedEmail, setUser] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

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

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("please select file");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        const metadata = {
            userEmail: storedEmail?.email,
            fileSizeInBytes: selectedFile.size,
            fileType: selectedFile.type
        }

        formData.append('metadata', JSON.stringify(metadata));

        try {
            const response = await axios.post("http://localhost:9194/files/upload",
                formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            alert("file uploaded successfully")
            setSelectedFile(null)
        }  catch(error) {
            console.error("upload failed", error);
        }
    }

    return (
        <div>
            <h1>Welcome {storedEmail?.email || "User"}</h1> <button onClick={logout}>Logout</button>
            <div className="button-container">
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>                
            <button> Download</button>
            </div>
    );
};

export default HomePage;