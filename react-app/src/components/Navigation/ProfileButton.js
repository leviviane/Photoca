import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu();
    history.push("/")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const closeMenu = () => setShowMenu(false);

  return (
    <div className='login-container'>
      <div className='profile-icons-container' onClick={openMenu}>
        <div className='rounded-icon-container'>
          <img src='/images/bars.png' alt='Bars Icon' className='bars-icon' />
          <i className="fas fa-user-circle" />
        </div>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className='greeting-box'>
            <li>Hello {user.first_name}</li>
            <li>{user.email}</li>
            <li className='manage-photocard-profile'>
              <NavLink className='manage-line' to='/photocards/current'>
                Manage Photocards
              </NavLink>
            </li>
            <li>
              <button className='log-out-button' onClick={handleLogout}>Log Out</button>
            </li>
          </div>
        ) : (
          <div className='login-signup-container'>
            <OpenModalButton
            className='login-button'
            buttonText="Log In"
            styling='log-in-pop-up'
            onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
            />
            <OpenModalButton
            className='signup-button'
            buttonText="Sign Up"
            styling='sign-up-pop-up'
            onItemClick={closeMenu}
            modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
