import React, { useState, useEffect } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
import axios from "axios";

const Header = () => {

  const PROFILE = "https://static.vecteezy.com/system/resources/thumbnails/021/548/095/small/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"

  // global state
  let isLogin = useSelector((state) => state.isLogin);

  isLogin = isLogin || localStorage.getItem("userId");
  let userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState('')

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/api/v1/user/get-user/${isLogin}`);
      if (data?.success) {
        console.log(data?.user?.username);
        setUser(data?.user?.username);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-fluid bg-dark">
        <nav className="navbar navbar-expand-lg bg-dark px-3">
          <Link className="navbar-brand text-light logo" to="/">MyBlogApp</Link>
          <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon text-light"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {
                isLogin && (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link active text-white" activeClassName="nav-bar-link" aria-current="page" to="/blogs">Blogs</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link active text-white" activeClassName="nav-bar-link" aria-current="page" to={`/my-blogs/${userId}`}>My Blogs</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link active text-white" activeClassName="nav-bar-link" aria-current="page" to="/create-blog">Create Blog</NavLink>
                    </li>
                  </>
                )
              }

            </ul>
            <form className="d-flex gap-3" role="search">
              {!isLogin && (
                <>
                  <div class="dropstart">
                    <img src={PROFILE} className="profile dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" alt="profile for login-register" />
                    <ul class="dropdown-menu p-0">
                      <div class="card card-body bg-light d-flex gap-2">
                        <Link to="/login" className="btn btn-success fw-bold text-white">
                          Login
                        </Link>
                        <Link to="/register" className="btn btn-warning fw-bold">
                          Register
                        </Link>
                      </div>
                    </ul>
                  </div>
                </>
              )}
              {isLogin && (
                <>
                  <div class="dropdown-center ">
                    <button class="btn text-light border-0 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Welcome {user}
                    </button>
                    <ul class="dropdown-menu w-100 mt-2">
                      <div className="text-center justify-content-center w-100">
                        <li>
                          <button type="button" className="btn btn-outline-danger fw-bold m-0" onClick={handleLogout}>
                            <i class="bi bi-power fw-bold"></i> Logout
                          </button>
                        </li>
                      </div>
                    </ul>
                  </div>
                </>
              )}
            </form>
          </div>
        </nav >
      </div >
    </>
  );
};

export default Header;

