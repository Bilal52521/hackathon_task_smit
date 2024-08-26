import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import "../App.scss";

const initialize = { email: "", password: "" };

function Register({ toggleLogin }) {
  const [state, setState] = useState(initialize);

  const handler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();

    const { email, password } = state;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User Registration Successful", user);
        toggleLogin(); // Switch back to login after registration
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("User Registration Error", errorCode, errorMessage);
      });
  };



  

  return (
    <div className="auth-container-2 container">
      <div className="card-2">
        <h1 className="mb-4 text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              onChange={handler}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={handler}
            />
          </div>
          <div className="text-center">
            <button className="btn btn-outline-success w-50">Register</button>
          </div>
          <div className="text-center mt-3">
            <p>
              Already have an account?{" "}
              <span
                className="text-primary"
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={toggleLogin}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
