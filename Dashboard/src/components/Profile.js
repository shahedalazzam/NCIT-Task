// import React from 'react'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import './formStyle.css'


const Profile = (props) => {
    // const id = props.id
    // const location = useLocation()
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    let navigate = useNavigate();
    // let id = location.state.id
    let id = localStorage.getItem('id')
    let token = sessionStorage.getItem('token')
    // if (!id) {
    //     id = "0"
    // }
    useEffect(() => {
        // const fetchUserData = async () => {
        //     try {
        //         const response = await axios.get(`http://localhost:8080/users/profile/${location.state.id}`, {
        //             headers: {
        //                 Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Yjk4ZTBlYzQ1MzEyMjAyYmNjYzA5NiIsImlhdCI6MTY4OTg4NDQ4OH0.E2HIQFkWHpmWs70VJe7IgnT9z554STsIBZm56oKBT0E',
        //             }
        //         });
        //         setUserName(response.data.user.username);
        //         setUserEmail(response.data.user.email);
        //         // console.log(response.data.data.username)
        //     } catch (error) {
        //         console.error('Error fetching user data:', error);
        //     }
        // };
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users/profile/${id}`, {
                    headers: {
                        Authorization: `bearer ${token}`,
                    }
                }).catch((err) => {
                    if (err && err.response) {
                        console.log("Error: ", err.response.data.error)
                        navigate('/login'); //redirect to the profile page
                    }
                });
                if (response && response.data) {
                    setUserName(response.data.user.username);
                    setUserEmail(response.data.user.email);
                    // console.log(typeof(response.data.userId))
                }
                // console.log(response.data.data.username)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    })
    const logout = () => {
        // localStorage.clear();
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
