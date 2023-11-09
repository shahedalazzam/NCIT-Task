import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './formStyle.css'
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



const Loginform = (props) => {
    const [error, setError] = useState(null)
    // const [user_id, setUserId] = useState('')
    const [username, setUsername] = useState('')
    let navigate = useNavigate();
    const onSubmit = async (values) => {

        try {
            const response = await axios.post(
                "https://ncittasks.onrender.com/admin/login",
                values
            );

            if (response && response.data) {
                console.log(response.data.data)
                localStorage.setItem("username", response.data.data.FullName);
                if (response.data.data.Role === "admin") {
                    navigate("/dashboard");
                } else {
                    setError("Please login with Admin Email.");
                }
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message); // Display the error message from the server
            } else {
                setError("Network error. Please check your internet connection.");
            }
        }
    }




    // const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    const validationSchema = yup.object({
        Email: yup.string().required("Email is required"),
        Password: yup.string().required("Password is required"),
    })

    const formik = useFormik({
        initialValues: { Email: '', Password: '' },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema
    })

    // const sendDataToParent = () => {
    // console.log("nothing", user_id)
    // props.myFunc(user_id)
    // props.myUsername(username)
    // console.log("username in login", username)
    // }


    // useEffect(() => {
    //     console.log("nothing", user_id);
    //     props.myFunc(user_id);
    // }, [user_id, props]);


    const handleInputChange = (event) => {
        setError(null)
    };
    return (
        <div className="form-body">
            <div className="row">
                <div className="form-holder">
                    <div className="form-content">
                        <div className="form-items">
                            <h3>Welcome Back!</h3>
                            <span className={error ? 'error' : ''}>{error ? error : ''}</span>
                            <form
                                className="requires-validation"
                                onSubmit={formik.handleSubmit} // to prevent submit
                                noValidate
                            >
                                <div className="col-md-12">
                                    <input onBlur={formik.handleBlur} onChange={(event) => {
                                        formik.handleChange(event);
                                        handleInputChange(event);
                                    }} value={formik.values.Email} className="form-control" type="email" name="Email" placeholder="E-mail Address" required />
                                    <span className={formik.touched.Email && formik.errors.Email ? "invalid-feedback" : "valid-feedback"}>{formik.touched.Email && formik.errors.Email ? formik.errors.Email : ""}</span>
                                </div>
                                <div className="col-md-12">
                                    <input onBlur={formik.handleBlur} onChange={(event) => {
                                        formik.handleChange(event);
                                        handleInputChange(event);
                                    }} value={formik.values.Password} className="form-control" type="password" name="Password" placeholder="Password" required />
                                    <span className={formik.touched.Password && formik.errors.Password ? "invalid-feedback" : "valid-feedback"}>{formik.touched.Password && formik.errors.Password ? formik.errors.Password : ""}</span>
                                </div>
                                <div className="form-button mt-3 d-flex justify-content-between">
                                    <button
                                        id="submit" type="submit" className="btn">Get In</button>
                                    {/* <p>New here? Let's get you <Link className='login_link' to={'/'}>registered!</Link></p> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loginform
