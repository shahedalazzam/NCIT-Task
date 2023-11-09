import 'bootstrap/dist/css/bootstrap.css';
import './formStyle.css'
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

const validationSchema = yup.object({
    username: yup.string().min(3, "Please enter your real name").required('Username is required'),
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    password: yup.string().matches(PASS_REGEX, "Please enter a strong password").required("Password is required"),
    confirm_password: yup.string().required('Please confirm your password').oneOf([yup.ref('password')], "Password does not match"),
    secret_key: yup.string(),

})


const RegisterForm = () => {
    // const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [role, setRole] = useState('')
    const [secretKey, setSecretKey] = useState('')
    let navigate = useNavigate();

    const onSubmit = async (values) => {
        const { confirm_password, ...data } = values //destructure the values to exclude confirm_password , we dont need to send it to the API
        const response = await axios.post('http://localhost:8080/users/register', data).catch((err) => {
            if (err && err.response) {
                // console.log("Error: ", err.response.data.message)
                setError(err.response.data.message)
                // setSuccess(null)
            }

        })
        if (response && response.data) {
            localStorage.setItem('token', JSON.stringify(response.data.token));   //store the token in local session 
            // setError(null)
            // setSuccess(response.data.message)
            navigate('/login'); //redirect to the profile page
            formik.resetForm()
        }
    }

    const formik = useFormik({
        initialValues: { username: '', email: '', password: '', confirm_password: '', role: '', secret_key: '' },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema
    })


    const handleInputChange = (event) => {
        setError(null)
    };
    const handleRole = (e) => {
        formik.handleChange(e);
        setRole(e.target.value)
    }
    const handleSecretKey = (e) => {
        setSecretKey(e.target.value)
    }
    return (
        <div className="form-body">
            <div className="row">
                <div className="form-holder">
                    <div className="form-content">
                        <div className="form-items">
                            <h3>Register Today</h3>
                            <p>Fill in the data below.</p>
                            <span className={error ? 'error' : ''}>{error ? error : ''}</span>
                            <form
                                className="requires-validation"
                                onSubmit={formik.handleSubmit}
                                noValidate>
                                <div>
                                    <h5 >Register as :</h5>
                                    <div className="form-check">
                                        <input onChange={handleRole} value="admin" className="form-check-input" type="radio" name="role" id="admin_rb" />
                                        <label className="form-check-label" htmlFor="admin_rb">
                                            Admin
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input onChange={handleRole} value="super admin" className="form-check-input" type="radio" name="role" id="super_admin_rb" />
                                        <label className="form-check-label" htmlFor="super_admin_rb">
                                            Super Admin
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input onChange={handleRole} value="user" className="form-check-input" type="radio" name="role" id="user_rb" />
                                        <label className="form-check-label" htmlFor="user_rb">
                                            User
                                        </label>
                                    </div>
                                </div>
                                {role === "admin" || role === "super admin" ? <div className="col-md-12">
                                    <input onBlur={formik.handleBlur} onChange={(event) => {
                                        formik.handleChange(event);
                                        handleSecretKey(event);
                                    }} value={formik.values.secret_key} className="form-control" type="password" name="secret_key" placeholder="Secret Key" required />
                                    <span className={formik.touched.secret_key && formik.errors.secret_key ? "invalid-feedback" : "valid-feedback"}>{formik.touched.secret_key && formik.errors.secret_key ? formik.errors.secret_key : ""}</span>
                                </div> : null}
                                <div className="col-md-12">
                                    <input onBlur={formik.handleBlur} onChange={(event) => {
                                        formik.handleChange(event);
                                        handleInputChange(event);
                                    }} value={formik.values.username} className="form-control" type="text" name="username" placeholder="Username" required />
                                    <span className={formik.touched.username && formik.errors.username ? "invalid-feedback" : "valid-feedback"}>{formik.touched.username && formik.errors.username ? formik.errors.username : ""}</span>
                                </div>
                                <div className="col-md-12">
                                    <input onBlur={formik.handleBlur} onChange={(event) => {
                                        formik.handleChange(event);
                                        handleInputChange(event);
                                    }} value={formik.values.email} className="form-control" type="email" name="email" placeholder="E-mail Address" required />
                                    <span className={formik.touched.email && formik.errors.email ? "invalid-feedback" : "valid-feedback"}>{formik.touched.email && formik.errors.email ? formik.errors.email : ""}</span>
                                </div>
                                <div className="col-md-12">
                                    <input onBlur={formik.handleBlur} onChange={(event) => {
                                        formik.handleChange(event);
                                        handleInputChange(event);
                                    }} value={formik.values.password} className="form-control" type="password" name="password" placeholder="Password" required />
                                    <span className={formik.touched.password && formik.errors.password ? "invalid-feedback" : "valid-feedback"}>{formik.touched.password && formik.errors.password ? formik.errors.password : ""}</span>
                                </div>
                                <div className="col-md-12">
                                    <input onBlur={formik.handleBlur} onChange={(event) => {
                                        formik.handleChange(event);
                                        handleInputChange(event);
                                    }} value={formik.values.confirm_password} className="form-control" type="password" name="confirm_password" placeholder="confirm Password" required />
                                    <span className={formik.touched.confirm_password && formik.errors.confirm_password ? "invalid-feedback" : "valid-feedback"}>{formik.touched.confirm_password && formik.errors.confirm_password ? formik.errors.confirm_password : ""}</span>
                                </div>
                                <div className="form-button mt-3 d-flex justify-content-between">
                                    <button id="submit" type="submit" className="btn ">Register</button>
                                    <p>Already a member?  <Link className='login_link' to={'/login'}>Get in!</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm
