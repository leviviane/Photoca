import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div id='logo-container'>
		<NavLink exact to='/'>
		  <div id='logo-name-container'>
		  {/* <i class="fa-thin fa-crown fa-2xl"></i> */}
		  <i class="fa fa-crown"></i>
			<h1>PHOTOCA</h1>
		  </div>
		</NavLink>

	  {/* <div id='manage-your-photocard-container'>
		{sessionUser && (
			<NavLink className='nav-link' to='/photocards/current'>
				<span>Manage Photocards</span>
			</NavLink>
		)}
	  </div> */}
      {isLoaded && (
        <div id='nav-container'>
          {/* <i className="fa-solid fa-bars"></i> */}
		  <div id='login-button-container'>
          <ProfileButton user={sessionUser} />
		  </div>
        </div>
      )}
		</div>
	);
}

export default Navigation;
