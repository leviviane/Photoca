import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div id='logo-container'>
		<NavLink className='nav-link' exact to='/'>
		  <div id='logo-name-container'>
		  {/* <i class="fa-thin fa-crown fa-2xl"></i> */}
		  <i class="fa fa-crown"></i>
			<h1 className='main-page-title'>PHOTOCA</h1>
		  </div>
		</NavLink>

      {isLoaded && (
        <div id='nav-container'>
		  <div id='login-button-container'>
		  <i class="fa-solid fa-bars"></i>
          <ProfileButton user={sessionUser} />
		  </div>
        </div>
      )}
		</div>
	);
}

export default Navigation;
