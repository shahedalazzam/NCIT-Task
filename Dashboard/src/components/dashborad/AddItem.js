import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
// import { Link } from 'react-router-dom'
import * as yup from "yup";

const validationSchema = yup.object({
  Name: yup
    .string()
    .min(3, "enter product Name")
    .required("productName is required"),
    PassMark: yup.string().required("PassMark is required"),
});

const AddItem = () => {
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log("object");
    const response = await axios
      .post("https://ncittasks.onrender.com/admin/item/add", values)
      .catch((err) => {
        if (err && err.response) {
          // console.log("Error: ", err.response.data.message)
          setError(err.response.data.message);
          // setSuccess(null)
        }
      });
    if (response && response.data) {
      console.log(response.data.data);
      // localStorage.setItem('token', JSON.stringify(response.data.token));   //store the token in local session
      // setError(null)
      // setSuccess(response.data.message)
      navigate("/dashboard/items"); //redirect to the profile page
      formik.resetForm();
    }
  };

  const formik = useFormik({
    initialValues: {
      Name: "",
      Subject: "",
      PassMark: "",
      ObtainedMark: "",
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
                <h3>Add Subject</h3>
                <span className={error ? "error" : ""}>
                  {error ? error : ""}
                </span>
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
                      value={formik.values.Name}
                      className="form-control"
                      type="text"
                      name="Name"
                      placeholder="Subject Name"
                      required
                    />
                    <span
                      className={
                        formik.touched.Name && formik.errors.Name
                          ? "invalid-feedback"
                          : "valid-feedback"
                      }
                    >
                      {formik.touched.Name && formik.errors.Name
                        ? formik.errors.Name
                        : ""}
                    </span>
                  </div>
                  <div className="col-md-12">
                    <input
                      onBlur={formik.handleBlur}
                      onChange={(event) => {
                        formik.handleChange(event);
                        handleInputChange(event);
                      }}
                      value={formik.values.PassMark}
                      className="form-control"
                      type="text"
                      name="PassMark"
                      placeholder="Pass Mark"
                      required
                    />
                    <span
                      className={
                        formik.touched.PassMark && formik.errors.PassMark
                          ? "invalid-feedback"
                          : "valid-feedback"
                      }
                    >
                      {formik.touched.PassMark && formik.errors.PassMark
                        ? formik.errors.PassMark
                        : ""}
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

export default AddItem;
