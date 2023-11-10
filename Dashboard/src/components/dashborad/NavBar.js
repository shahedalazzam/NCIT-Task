import React from "react";
import { useNavigate } from "react-router";

const NavBar = () => {
  const username = localStorage.getItem("username");

  let navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar static-top shadow">
      <form className="form-inline">
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
        >
          <i className="fa fa-bars"></i>
        </button>
      </form>
      <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block"></div>
        <li className="nav-item dropdown no-arrow">
          <a
            className="nav-link dropdown-toggle"
            href="/"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {username}
            </span>
            <img
              alt=""
              className="img-profile rounded-circle"
              src="img/undraw_profile.svg"
            />
          </a>
          <div
            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown"
          >
            <div className="dropdown-divider"></div>
            <a
              onClick={logout}
              className="dropdown-item"
              href="/"
              data-toggle="modal"
              data-target="#logoutModal"
            >
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
