import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import Register from "./signup";
import "../App.scss";

const initialize = { email: "", password: "" };

function Login({ setUser }) {
  const [state, setState] = useState(initialize);
  const [isLogin, setIsLogin] = useState(true);

  const handler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        console.log("User Login Successfully", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("User Login Error", errorCode, errorMessage);
      });
  };

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <div className="card p-4">
        {isLogin ? (
          <>
            <h1 className="text-center mb-4">Login</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                name="email"
                onChange={handler}
              />
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                name="password"
                onChange={handler}
              />
              <div className="text-center">
                <button className="btn btn-outline-success w-50 mb-3">
                  Login
                </button>
                <p>
                  Don’t have an account?{" "}
                  <span
                    className="text-primary"
                    style={{ cursor: "pointer" , textDecoration: "underline" }}
                    onClick={toggleLogin}
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            </form>
          </>
        ) : (
          <Register toggleLogin={toggleLogin} />
        )}
      </div>
    </div>
  );
}

export default Login;
