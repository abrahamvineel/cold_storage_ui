import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const HomePage = () => {
    const navigate = useNavigate();
    const [storedEmail, setUser] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); 
    const [filteredFiles, setFilteredFiles] = useState([]);

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (storedEmail) {
            const parsedEmail = JSON.parse(storedEmail);
            setUser(parsedEmail.email);
            fetchFiles(parsedEmail.email);
        } else {
            navigate("/login"); 
        }
    }, [navigate]);

    const fetchFiles = async (email) => {
        const token = localStorage.getItem("jwt"); 
        console.log('token ', token);
        try {
            const response = await fetch(`http://localhost:8081/files?email=${encodeURIComponent(email)}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            if (response.status === 401) {  
                logout();  
                throw new Error("Unauthorized: Invalid session");
            } else if (!response.ok) {
                throw new Error("Failed to fetch files");
            }
            const data = await response.json();
            setFiles(data);
            setFilteredFiles(data);
        } catch(error) {
            console.error("Error fetching files: ", error);
        }
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        filterFiles(event.target.value);
    };

    const logout = () => {
        localStorage.removeItem("token"); 
        sessionStorage.removeItem("token"); 
        navigate("/login"); 
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const filterFiles = (query) => {
        if (!query) {
            setFilteredFiles(files);
        } else {
            const filtered = files.filter(file => file.fileName.toLowerCase().includes(query.toLowerCase()));
            setFilteredFiles(filtered);
        }
    }

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("please select file");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        const storedEmail = localStorage.getItem("email");
        const parsedEmail = JSON.parse(storedEmail);
        const token = localStorage.getItem("jwt"); 
        const metadata = {
            userEmail: parsedEmail.email,
            fileSizeInBytes: selectedFile.size,
            fileType: selectedFile.type
        }

        formData.append('metadata', JSON.stringify(metadata));

        try {
            const response = await axios.post("http://localhost:8081/files/upload",
                formData, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            if (response.status === 401) {  
                logout();  
                throw new Error("Unauthorized: Invalid session");
            }
            else if (!response.ok) {
                throw new Error("Failed to fetch files");
            }
            alert("file uploaded successfully");
            setSelectedFile(null);
            fetchFiles(parsedEmail.email); 
        }  catch(error) {
            console.error("upload failed", error);
        }
    }

    const handleDownload = async (fileName) => {
        const token = localStorage.getItem("jwt"); 
        const storedEmail = JSON.parse(localStorage.getItem("email"));

        try {
            const response = await axios.get(`http://localhost:8081/files/download?fileName=${encodeURIComponent(fileName)}&email=${encodeURIComponent(storedEmail.email)}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
            if (response.status == 200) {
                const downloadUrl = response.data;
                window.open(downloadUrl, "_blank")
            } else if (response.status === 401) {  
                logout();  
                throw new Error("Unauthorized: Invalid session");
            } else {
                alert("failed ")
            }
        } catch (error) {
            console.log("download error" , error)
        }
    }

    return (
        <div>
            <div class="header">
                <h1>Welcome { JSON.parse(localStorage.getItem("email")).email || "User"}</h1>
                <button onClick={logout} >Logout</button>
            </div>
            <div className="file-container">
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>    

            <input 
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ margin: "10px", padding: "8px", width: "300px" }}
            />
            <h2>Files</h2>            
            <table className="file-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>File Name</th>
                        <th>Size (KB)</th>
                        <th>Upload Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFiles.map((file, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{file.fileName}</td>
                            <td>{(file.fileSizeInBytes / 1024).toFixed(2)}</td>
                            <td>{new Date(file.uploadDate).toLocaleString()}</td>
                            <td><button onClick={() => handleDownload(file.fileName)}>Download</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
    );
};

export default HomePage;