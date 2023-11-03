import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul id='logo-container'>
		<NavLink exact to='/'>
		  <div id='logo-name-container'>
		  {/* <i class="fa-thin fa-crown fa-2xl"></i> */}
			<h1>Photoca</h1>
		  </div>
		</NavLink>

		<div id='create-photocard-container'>
        {sessionUser && (
          <NavLink className='nav-link' exact to='/photocard/create'>
            <span>Post a Photocard Listing</span>
          </NavLink>
        )}
      </div>

      {isLoaded && (
        <div id='nav-container'>
          {/* <i className="fa-solid fa-bars"></i> */}
		  <div id='login-button-container'>
          <ProfileButton user={sessionUser} />
		  </div>
        </div>
      )}
		</ul>
	);
}

export default Navigation;
