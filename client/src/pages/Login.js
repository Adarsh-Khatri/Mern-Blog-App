import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { postApi } from "../services/httpServices";
import { setUser } from "../services/storageServices";


const Login = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // ---------------------------------------------------------------------------------- LOGIN CREDENTIALS

  const inputs = { email: "", password: "" };

  // ------------------------------------------------------------------------------------------- HANDLING SUBMIT


  const handleSubmit = async (values) => {
    try {
      const data = await postApi("/api/v1/user/login", { ...values });
      if (data?.success) {
        setUser(data?.user._id)
        dispatch(authActions.login());
        toast.success(data.message);
        navigate("/blogs");
      }
    } catch (error) {
      let { response } = error;
      toast.error(response.data.message)
    }
  };


  // ------------------------------------------------------------------------------------------- FORMIK 

  const formik = useFormik({
    initialValues: inputs,
    onSubmit: handleSubmit
  })


  return (
    <div className="container">
      <div className="row">
        <form className="my-5 w-50 mx-auto" onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="border p-5 shadow-lg rounded rounded-5">
              <div className="row">
                <h1 className="text-center">Login</h1>
              </div>
              <div className="row">
                <div className="form-group my-3">
                  <label htmlFor="email" className="form-label lead fw-bold">Email</label>
                  <input type="email" id="email" className="form-control py-3" name="email" value={formik.values.email} placeholder="Email" onChange={formik.handleChange} />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="password" className="form-label lead fw-bold">Password</label>
                  <input type="password" id="password" className="form-control py-3" name="password" value={formik.values.password} placeholder="Password" onChange={formik.handleChange} />
                </div>

              </div>
              <div className="row">
                <div className="text-center my-2">
                  <button type="submit" className="btn btn-primary rounded-3">Submit</button>
                </div>
              </div>
              <div className="row">
                <div className="text-center mt-4">
                  <button type="button" className="btn text-primary btn-sm border-0" onClick={() => navigate("/register")}>
                    Not a user ? Please Register
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


