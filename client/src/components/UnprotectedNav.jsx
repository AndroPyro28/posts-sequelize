import React from "react";
import { Link } from "react-router-dom";
import "./unprotectedDesign.css";
import Cookies from "js-cookie";
import { useHistory } from "react-router";
function UnprotectedNav({ auth }) {
  let history = useHistory();

  const handleLogout = () => {
    Cookies.remove("userToken");
    window.location.reload();
  }
  return (
    <div className="navbar">
      <div className="logo" onClick={() => history.push("/")}>
        <span className="logo-span">LOGO</span>
      </div>

      <ul>
        {!auth ? (
          <React.Fragment>
            <Link to="/login">
              <li>Login</li>
            </Link>
            <Link to="/signup">
              <li>Register</li>
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>

          <Link to="/createpost">
            <li>Create post</li>
          </Link>
          <a onClick={handleLogout}>
            <li>Logout</li>
          </a>
          </React.Fragment>
        )}
      </ul>
    </div>
  );
}

export default UnprotectedNav;
