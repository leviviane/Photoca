import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
	const dispatch = useDispatch();
	const { history } = useHistory();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		let newErrors = {};

		if (!firstName) newErrors.firstName = "First name is required";
		if (!lastName) newErrors.lastName = "Last name is required";
		if (!email.includes("@")) newErrors.email = "Must be a valid email";
		if (username.length <= 4)
			newErrors.username = "Username must be at least four characters";
		if (password.length < 6)
			newErrors.password = "Password must be at least six characters";
		if (password !== confirmPassword)
			newErrors.confirmPassword =
				"Passwords must match";


		if (Object.keys(newErrors).length === 0) {
			const data = await dispatch(
				signUp(firstName, lastName, username, email, password)
			);
			if (data) {
				setErrors(data);
			} else {
				closeModal();
				history("/");
			}
		} else {
			setErrors(newErrors);
		}
	};

	return (
		<div className="sign-up-container">
			<h1 className="Sign-up-title">Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<div>
					{errors && errors.length >= 1 && errors.map((error, idx) => (
						<div className="error" key={idx}>{error}</div>
					))}
				</div>
				<label>
					First Name
				</label>
				{errors.firstName && <p className="signup-errors">{errors.firstName}</p>}
				<input
					type="text"
					placeholder="First Name"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
				/>
				<label>
					Last Name
				</label>
				{errors.lastName && <p className="signup-errors">{errors.lastName}</p>}
				<input
					type="text"
					placeholder="Last Name"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
				/>
				<label>
					Email
				</label>
				{errors.email && <p className="signup-errors">{errors.email}</p>}
				<input
					type="text"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<label>
					Username
				</label>
				{errors.username && <p className="signup-errors">{errors.username}</p>}
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<label>
					Password
				</label>
				{errors.password && <p className="signup-errors">{errors.password}</p>}
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<label>
					Confirm Password
				</label>
				{errors.confirmPassword && (
					<p className="signup-errors">{errors.confirmPassword}</p>
				)}
				<input
					type="password"
					placeholder="Confirm Password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;



// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
// import { signUp } from "../../store/session";
// import './SignupForm.css';

// function SignupFormPage() {
//   const dispatch = useDispatch();
//   const sessionUser = useSelector((state) => state.session.user);
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState([]);

//   if (sessionUser) return <Redirect to="/" />;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password === confirmPassword) {
//         const data = await dispatch(signUp(username, email, firstName, lastName, password));
//         if (data) {
//           setErrors(data)
//         }
//     } else {
//         setErrors(['Confirm Password field must be the same as the Password field']);
//     }
//   };

//   return (
//     <>
//       <h1>Sign Up</h1>
//       <form onSubmit={handleSubmit}>
//         <ul>
//           {errors.map((error, idx) => <li key={idx}>{error}</li>)}
//         </ul>
//         <label>
//           Email
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Username
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </label>
// 		<label>
// 			First Name
// 			<input
// 			type="text"
// 			value={firstName}
// 			onChange={(e) => setFirstName(e.target.value)}
// 			required
// 			/>
// 		</label>
// 		<label>
// 			Last name
// 			<input
// 			type="text"
// 			value={lastName}
// 			onChange={(e) => setLastName(e.target.value)}
// 			required
// 			/>
// 		</label>
//         <label>
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Confirm Password
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </label>
//         <button type="submit">Sign Up</button>
//       </form>
//     </>
//   );
// }

// export default SignupFormPage;
