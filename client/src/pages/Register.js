import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from 'formik';
import { postApi } from "../services/httpServices";

const Login = () => {
  const navigate = useNavigate();


  // ------------------------------------------------------------------------------------------- REGISTER CREDENTIALS


  const inputs = { name: "", email: "", password: "" }


  // ------------------------------------------------------------------------------------------- HANDLING SUBMIT


  const onSubmit = async (values) => {

    let { name, email, password } = values;

    try {
      const data = await postApi("/api/v1/user/register", { username: name, email, password })
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      let { response } = error;
      toast.error(response.data.message);
    }
  };


  // ------------------------------------------------------------------------------------------- FORMIK


  const formik = useFormik({
    initialValues: inputs,
    onSubmit
  })


  return (
    <div className="container">
      <div className="row">
        <form className="my-5 w-50 mx-auto" onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="border p-5 shadow-lg rounded rounded-5">
              <div className="row">
                <h1 className="text-center">Register</h1>
              </div>
              <div className="row">
                <div className="form-group my-3">
                  <label htmlFor="name" className="form-label lead fw-bold">Name</label>
                  <input type="name" id="name" name="name" value={formik.values.name} className="form-control py-3" placeholder="Name" onChange={formik.handleChange} />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="email" className="form-label lead fw-bold">Email</label>
                  <input type="email" id="email" name="email" value={formik.values.email} className="form-control py-3" placeholder="Email" onChange={formik.handleChange} />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="password" className="form-label lead fw-bold">Password</label>
                  <input type="password" id="password" name="password" value={formik.values.password} className="form-control py-3" placeholder="Password" onChange={formik.handleChange} />
                </div>
              </div>
              <div className="row">
                <div className="text-center my-2">
                  <button type="submit" className="btn btn-primary rounded-3">Submit</button>
                </div>
              </div>
              <div className="row">
                <div className="text-center mt-4">
                  <button type="button" className="btn text-primary btn-sm border-0" onClick={() => navigate("/login")}>
                    Already Registerd ? Please Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;



// Warning: An unhandled error was caught from submitForm() TypeError: Cannot read properties of undefined(reading 'data') WHY I AM THIS ERROR??



