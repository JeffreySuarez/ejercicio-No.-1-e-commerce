import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import { Icon } from "react-icons-kit";
import { shoppingCart } from "react-icons-kit/feather/shoppingCart";
import { auth } from "../Firebase/Config";
import { useHistory } from "react-router-dom";

export const Navbar = ({ user, totalProducts }) => {
  const history = useHistory();

  const handleLogout = () => {
    auth.signOut().then(() => {
      history.push("/login");
    });
  };

  return (
    <div className="navbar navbox">
      <div className="leftside">
        <div className="logo">
          <img src={logo} alt="logo" width="100" />
        </div>
      </div>
      <div className="rightside d-flex">
        {!user && (
          <>
            <span>
              <Link className="navlink" to="signup">
                SIGN UP
              </Link>
            </span>
            <span>
              <Link className="navlink" to="login">
                LOGIN
              </Link>
            </span>
          </>
        )}
        {user && (
          <>
            <span>
              <Link className="navlink text1" to="/">
                Bienvenido: {user}
              </Link>
            </span>
            <div className="no-of-products">
              <Link className="navlink" to="/cart">
                <Icon icon={shoppingCart} size={20} />
              </Link>
              <span className="cart-indicator">{totalProducts}</span>
            </div>
            <div
              className="btn btn-danger btn-md logout-btn"
              onClick={handleLogout}
            >
              LOGOUT
            </div>
          </>
        )}
      </div>
    </div>
  );
};
