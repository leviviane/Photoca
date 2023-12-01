import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div>
		<div id='logo-container'>
		<NavLink className='nav-link' exact to='/'>
		  <div id='logo-name-container'>
		  <i class="fa fa-crown"></i>
			<h1 className='main-page-title'>PHOTOCA</h1>
		  </div>
		</NavLink>
		</div>

      {isLoaded && (
        <div id='nav-container'>
		  <div id='login-button-container'>
		  <i class="fa-solid fa-bars"></i>
		  <i class="fa-solid fa-user"></i>
          <ProfileButton user={sessionUser} />
		  </div>
        </div>
      )}
		</div>
	);
}

export default Navigation;


// import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import './Navigation.css';

// function Navigation({ isLoaded }) {
//   const history = useHistory();
//   const sessionUser = useSelector(state => state.session.user);

//   const handlePhotocaClick = () => {
//     history.push('/');
//   };

//   return (
//     <div>
//       <div id='logo-container'>
//         <div className='nav-link' id='logo-name-container' onClick={handlePhotocaClick}>
//           <i className="fa fa-crown"></i>
//           <h1 className='main-page-title'>PHOTOCA</h1>
//         </div>
//       </div>

//       {isLoaded && (
//         <div id='nav-container'>
//           <div id='login-button-container'>
//             <i className="fa-solid fa-bars"></i>
//             <ProfileButton user={sessionUser} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Navigation;
