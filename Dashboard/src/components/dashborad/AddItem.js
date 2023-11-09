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
  Price: yup.string().required("Price is required"),
  Color: yup.string().required("Color is required"),
  Brand: yup.string().required("Brand is required"),
  Size: yup.string().required("Size is required"),
  Category: yup.string().required("Category is required"),
});

const AddItem = () => {
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log("object");
    const response = await axios
      .post("https://dream-wedding.onrender.com/admin/item/add", values)
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
      Size: "",
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
                <h3>Add Item</h3>
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
                      placeholder="Product Name"
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
                      value={formik.values.Size}
                      className="form-control"
                      type="text"
                      name="Size"
                      placeholder="Size"
                      required
                    />
                    <span
                      className={
                        formik.touched.Size && formik.errors.Size
                          ? "invalid-feedback"
                          : "valid-feedback"
                      }
                    >
                      {formik.touched.Size && formik.errors.Size
                        ? formik.errors.Size
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
