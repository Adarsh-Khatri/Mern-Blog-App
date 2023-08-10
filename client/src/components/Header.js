import React, { useState, useEffect } from "react";
import { useNavigate, Link, NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
import { getUser } from "../services/storageServices";
import { getApi } from "../services/httpServices";

const Header = () => {

  const PROFILE = "https://static.vecteezy.com/system/resources/thumbnails/021/548/095/small/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"

  // global state
  let isLogin = useSelector((state) => state.isLogin);

  isLogin = isLogin || localStorage.getItem("userId");
  let userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const [user, setUser] = useState('')

  const fetchData = async () => {
    try {
      const data = await getApi(`/api/v1/user/get-user/${isLogin}`);
      if (data?.success) {
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
        <nav className="navbar navbar-expand-sm">
          <Link className="navbar-brand text-light logo" to={getUser() ? "/blogs" : "/login"}>MyBlogApp</Link>
          <button className="navbar-toggler border-0 menu-hamburger" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end menu" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header border-bottom border-5 border-dark">
              <h2 className="offcanvas-title fw-bold display-3 mx-auto" id="offcanvasNavbarLabel">Dashboard</h2>
              <button type="button" className="btn-close border-0" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {
                  isLogin && (
                    <>
                      <li className="nav-item">
                        <div className="d-block d-sm-none text-light fs-3 fw-bold mb-5 bg-dark rounded shadow-lg text-center w-100" type="button">Welcome {user} !!!</div>
                      </li>
                      <li className="nav-item">
                        <button type="button" className={`nav-link px-5 px-sm-2 ${location.pathname == "/blogs" ? "text-primary fw-bold bg-light rounded" : "text-white"}`} activeClassName="nav-bar-link" aria-current="page" data-bs-dismiss="offcanvas" onClick={() => navigate('/blogs')}>Blogs</button>
                      </li>
                      <li className="nav-item">
                        <button type="button" className={`nav-link px-5 px-sm-2 ${location.pathname.startsWith("/my-blogs") ? "text-primary fw-bold bg-light rounded" : "text-white"}`} activeClassName="nav-bar-link" aria-current="page" data-bs-dismiss="offcanvas" onClick={() => navigate(`/my-blogs/${userId}`)}>My Blogs</button>
                      </li>
                      <li className="nav-item">
                        <button type="button" className={`nav-link px-5 px-sm-2 ${location.pathname == "/create-blog" ? "text-primary fw-bold bg-light rounded" : "text-white"}`} activeClassName="nav-bar-link" aria-current="page" data-bs-dismiss="offcanvas" onClick={() => navigate(`/create-blog`)}>Create Blog</button>
                      </li>
                    </>
                  )
                }

              </ul>
              <form className="d-flex gap-3">
                {!isLogin && (
                  <div>
                    <div className="d-flex flex-column flex-sm-row gap-2 px-3">
                      <button type="button" className="btn btn-success fw-bold text-white" data-bs-dismiss="offcanvas" onClick={() => navigate('/login')}>Login</button>
                      <button type="button" className="btn btn-warning fw-bold" data-bs-dismiss="offcanvas" onClick={() => navigate('/register')}>Register</button>
                    </div>
                  </div>
                )}
                {isLogin && (
                  <div className="d-flex gap-3 flex-column flex-sm-row align-items-center w-100">
                    <div className="d-flex flex-row justify-content-md-end justify-content-sm-start w-100">
                      <button type="button" className="btn btn-sm btn-outline-danger fw-bold m-0" data-bs-dismiss="offcanvas" onClick={handleLogout}>
                        <i className="bi bi-power fw-bold"></i> Logout
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div >
        </nav >
      </div >
    </>
  );
};

export default Header;


