import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const demoUser = () => {
    setEmail("demo@aa.io");
    setPassword("password");
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Log In</h1>
      <div className="login-fields">
        <form onSubmit={handleSubmit}>
          <ul className="login-error">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="email-fields">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="password-fields">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="login-submit-button">
            <button type="submit">Log In</button>
          </div>
          <div className="demo-user-container">
            <button type="submit" onClick={demoUser}>
              Log in as Demo User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
