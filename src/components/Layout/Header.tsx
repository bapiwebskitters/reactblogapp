import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  selectAuthLoading,
  selectUser,
} from "../../redux/features/auth/authSelectors";
import { logout } from "../../redux/features/auth/authSlice";
import { AppDispatch } from "../../redux/store";

const Header: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMobileNav = () => {
    setIsActive((prevState) => !prevState);
  };

  useEffect(() => {
    const body = document.body;
    if (isActive) {
      body.classList.add("mobile-nav-active");
    } else {
      body.classList.remove("mobile-nav-active");
    }
  }, [isActive]);

  useEffect(() => {
    const handleNavLinkClick = () => {
      if (isActive) {
        toggleMobileNav();
      }
    };

    const navLinks = document.querySelectorAll("#navmenu a");
    navLinks.forEach((link) => {
      link.addEventListener("click", handleNavLinkClick as EventListener);
    });

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleNavLinkClick as EventListener);
      });
    };
  }, [isActive]);

  useEffect(() => {
    const handleDropdownToggleClick = (e: MouseEvent) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLElement;
      const parent = target.parentNode as HTMLElement;
      parent.classList.toggle("active");
      const nextElement = parent.nextElementSibling as HTMLElement;
      if (nextElement) {
        nextElement.classList.toggle("dropdown-active");
      }
      e.stopImmediatePropagation();
    };

    const dropdownToggles = document.querySelectorAll(
      ".navmenu .toggle-dropdown"
    );
    dropdownToggles.forEach((toggle) => {
      toggle.addEventListener(
        "click",
        handleDropdownToggleClick as EventListener
      );
    });

    return () => {
      dropdownToggles.forEach((toggle) => {
        toggle.removeEventListener(
          "click",
          handleDropdownToggleClick as EventListener
        );
      });
    };
  }, []);

  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectAuthLoading);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
        <Link to="/" className="logo d-flex align-items-center me-auto">
          <h1 className="sitename">Arsha</h1>
        </Link>
        <nav id="navmenu" className="navmenu">
          <ul>
            <li>
              <a href="#hero" className="active">
                Home
              </a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#portfolio">Portfolio</a>
            </li>
            <li>
              <a href="#team">Team</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li className="dropdown">
              <a href="#">
                <span>Pages</span>{" "}
                <i className="bi bi-chevron-down toggle-dropdown"></i>
              </a>
              <ul>
                <li>
                  <Link to={`/blogs`}>Blogs</Link>
                </li>
                {/* <li className="dropdown">
                  <a href="#">
                    <span>Deep Dropdown</span>{" "}
                    <i className="bi bi-chevron-down toggle-dropdown"></i>
                  </a>
                  <ul>
                    <li>
                      <a href="#">Deep Dropdown 1</a>
                    </li>
                    <li>
                      <a href="#">Deep Dropdown 2</a>
                    </li>
                    <li>
                      <a href="#">Deep Dropdown 3</a>
                    </li>
                    <li>
                      <a href="#">Deep Dropdown 4</a>
                    </li>
                    <li>
                      <a href="#">Deep Dropdown 5</a>
                    </li>
                  </ul>
                </li> */}
              </ul>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            {user ? (
              <li className="auth-dropdown">
                <img src={user.avatar || "default-avatar.png"} alt="User Avatar" className="user-avatar"/>
                <ul>
                  <li>
                    <Link to="/profile">My Profile</Link>
                  </li>
                  <li>
                    <Link to="/settings">Settings</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} disabled={isLoading}>
                      {isLoading ? "Logging out..." : "Logout"}
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <Link className="btn-getstarted" to="/login">
                Login
              </Link>
            )}
          </ul>
          <i
            className={`mobile-nav-toggle bi ${isActive ? "bi-x" : "bi-list"}`}
            onClick={toggleMobileNav}
          ></i>
        </nav>
      </div>
    </header>
  );
};

export default Header;
