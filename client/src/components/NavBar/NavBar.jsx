import { useContext, useState } from "react";
import "./NavBar.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest.js";
function NavBar() {
  const [open, setOpen] = useState(false);

  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      // localStorage.removeItem("user")
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  // const currentUser = false;
  // const user = true;
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>To Do List</span>
        </a>
        {/* <a href="/">Home</a> */}
        {/* <a href="/">Tasks</a> */}
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            {/* <img
              src={currentUser.avatar || "/noavatar.jpg"}
              alt="user"
            /> */}
            <span className="username">Hi {currentUser.username}!</span>
            <Link>
              <button className="profile" onClick={handleLogout}>
                <span>Logout</span>
              </button>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img src="/menu.png" alt="menu" onClick={() => setOpen(!open)} />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">Tasks</a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
