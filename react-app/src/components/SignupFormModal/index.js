import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
    const dispatch = useDispatch();
    const history = useHistory();
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
        if (username.length <= 4) newErrors.username = "Username must be at least four characters";
        if (password.length < 6) newErrors.password = "Password must be at least six characters";
        if (password !== confirmPassword) newErrors.confirmPassword = "Passwords must match";

        if (Object.keys(newErrors).length === 0) {
            const data = await dispatch(
                signUp(firstName, lastName, username, email, password)
            );
            if (data) {
                setErrors(data);
            } else {
                closeModal();
                history.push("/");
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="sign-up-container">
            <h1 className="sign-up-title">Welcome,</h1>
            <p className="sign-up-snippet">sign up to continue</p>
            <form onSubmit={handleSubmit}>
                <div>
                    {errors && errors.length >= 1 && errors.map((error, idx) => (
                        <div className="error" key={idx}>{error}</div>
                    ))}
                </div>

                <div className="form-group">
                    {/* <label className="firstName">First Name</label> */}
                    <input
                        type="text"
                        id="firstName"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    {errors.firstName && <p className="sign-up-errors">{errors.firstName}</p>}
                </div>
                <div className="form-group">
                    {/* <label className="lastName">Last Name</label> */}
                    {errors.lastName && <p className="sign-up-errors">{errors.lastName}</p>}
                    <input
                        type="text"
                        id="lastName"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    {/* <label className="email">Email</label> */}
                    <input
                        type="text"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors.email && <p className="sign-up-errors">{errors.email}</p>}
                </div>
                <div className="form-group">
                    {/* <label className="username">Username</label> */}
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {errors.username && <p className="sign-up-errors">{errors.username}</p>}
                </div>
                <div className="form-group">
                    {/* <label className="password">Password</label> */}
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <p className="sign-up-errors">{errors.password}</p>}
                </div>
                <div className="form-group">
                    {/* <label className="confirmPassword">Confirm Password</label> */}
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {errors.confirmPassword && (
                    <p className="sign-up-errors">{errors.confirmPassword}</p>)}
                </div>
                <button type="submit" className='sign-up-button'>Sign Up</button>
            </form>
        </div>
    );
}

export default SignupFormModal;
