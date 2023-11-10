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
                setError(error.response.data.message);
            } else {
                setError("Network error. Please check your internet connection.");
            }
        }
    }




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
                                onSubmit={formik.handleSubmit}
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
