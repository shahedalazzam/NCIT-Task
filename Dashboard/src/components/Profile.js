import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import './formStyle.css'


const Profile = (props) => {
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    let navigate = useNavigate();
    let id = localStorage.getItem('id')
    let token = sessionStorage.getItem('token')
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users/profile/${id}`, {
                    headers: {
                        Authorization: `bearer ${token}`,
                    }
                }).catch((err) => {
                    if (err && err.response) {
                        console.log("Error: ", err.response.data.error)
                        navigate('/login');
                    }
                });
                if (response && response.data) {
                    setUserName(response.data.user.username);
                    setUserEmail(response.data.user.email);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    })
    const logout = () => {
        sessionStorage.clear();
        navigate('/login');
    }
    return (
        <div className="form-body">
            <div className="row">
                <div className="form-holder">
                    <div className="form-content">
                        <div className="form-items">
                            <h3>Welcome back!</h3>
                            <h1 style={{ color: "white" }}>
                                username: {userName}
                            </h1>
                            <h1 style={{ color: "white" }}>
                                email: {userEmail}
                            </h1>
                        </div>
                    </div>
                    <button className="btn" id="submit" onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Profile
