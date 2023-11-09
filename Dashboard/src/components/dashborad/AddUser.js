import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const validationSchema = yup.object({
  FullName: yup.string().min(3, "Please enter your real name").required('FullName is required'),
  Email: yup.string().email("Please enter a valid email").required("Email is required"),
  Password: yup.string().matches(PASS_REGEX, "Please enter a strong password").required("Password is required"),
  RepeatPassword: yup.string().oneOf([yup.ref('Password'), null], 'Passwords must match').required('Repeat Password is required'),
});

const AddUser = () => {
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    const { RepeatPassword, ...data } = values;
    const response = await axios.post('https://ncittasks.onrender.com/admin/add', data).catch((err) => {
      if (err && err.response) {
        setError(err.response.data.message);
      }
    });

    if (response && response.data) {
      console.log(response.data.data);
      navigate('/dashboard');
      formik.resetForm();
    }
  };

  const formik = useFormik({
    initialValues: {
      FullName: '',
      Email: '',
      Password: '',
      RepeatPassword: '',
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  const handleInputChange = (event) => {
    setError(null);
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="form-body">
        <div className="row">
          <div className="form-holder">
            <div className="form-content">
              <div className="form-items">
                <h3>Add user</h3>
                <span className={error ? 'error' : ''}>{error ? error : ''}</span>
                <form
                  className="requires-validation"
                  onSubmit={formik.handleSubmit}
                  noValidate
                >
                  <div className="col-md-12">
                    <input
                      onBlur={formik.handleBlur}
                      onChange={(event) => {
                        formik.handleChange(event);
                        handleInputChange(event);
                      }}
                      value={formik.values.FullName}
                      className="form-control"
                      type="text"
                      name="FullName"
                      placeholder="FullName"
                      required
                    />
                    <span className={formik.touched.FullName && formik.errors.FullName ? "invalid-feedback" : "valid-feedback"}>
                      {formik.touched.FullName && formik.errors.FullName ? formik.errors.FullName : ""}
                    </span>
                  </div>
                  <div className="col-md-12">
                    <input
                      onBlur={formik.handleBlur}
                      onChange={(event) => {
                        formik.handleChange(event);
                        handleInputChange(event);
                      }}
                      value={formik.values.Email}
                      className="form-control"
                      type="email"
                      name="Email"
                      placeholder="E-mail Address"
                      required
                    />
                    <span className={formik.touched.Email && formik.errors.Email ? "invalid-feedback" : "valid-feedback"}>
                      {formik.touched.Email && formik.errors.Email ? formik.errors.Email : ""}
                    </span>
                  </div>
                  <div className="col-md-12">
                    <input
                      onBlur={formik.handleBlur}
                      onChange={(event) => {
                        formik.handleChange(event);
                        handleInputChange(event);
                      }}
                      value={formik.values.Password}
                      className="form-control"
                      type="password"
                      name="Password"
                      placeholder="Password"
                      required
                    />
                    <span className={formik.touched.Password && formik.errors.Password ? "invalid-feedback" : "valid-feedback"}>
                      {formik.touched.Password && formik.errors.Password ? formik.errors.Password : ""}
                    </span>
                  </div>
                  <div className="col-md-12">
                    <input
                      onBlur={formik.handleBlur}
                      onChange={(event) => {
                        formik.handleChange(event);
                        handleInputChange(event);
                      }}
                      value={formik.values.RepeatPassword}
                      className="form-control"
                      type="password"
                      name="RepeatPassword"
                      placeholder="Repeat Password"
                      required
                    />
                    <span className={formik.touched.RepeatPassword && formik.errors.RepeatPassword ? "invalid-feedback" : "valid-feedback"}>
                      {formik.touched.RepeatPassword && formik.errors.RepeatPassword ? formik.errors.RepeatPassword : ""}
                    </span>
                  </div>
                  <div className="form-button mt-3 d-flex justify-content-between">
                    <button id="submit" type="submit" className="btn ">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
