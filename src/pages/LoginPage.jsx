import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

import heroImage from "../assets/hero.png";

import { FaLeaf, FaEye, FaEyeSlash } from "react-icons/fa";

import {
  registerUser,
  loginUser,
} from "../utils/storage";


function LoginPage() {

  const [isLogin, setIsLogin] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();


  const handleSubmit = () => {

    // =========================
    // REGISTER
    // =========================

    if (!isLogin) {

      if (!name || !email || !password || !confirmPassword) {
        alert("Please fill all fields.");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const result = registerUser({
        name,
        email,
        password,
      });

      if (!result.success) {
        alert(result.message);
        return;
      }

      alert("Registration Successful!");

      // Clear fields
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Go back to Login
      setIsLogin(true);

      return;
    }


    // =========================
    // LOGIN
    // =========================

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    const result = loginUser(email, password);

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert("Login Successful!");

    navigate("/dashboard");
  };


  return (
    <div className="login-container">

      {/* LEFT SIDE */}

      <div className="login-left">

        <img
          src={heroImage}
          alt="EcoTrack"
        />

      </div>


      {/* RIGHT SIDE */}

      <div className="login-right">

        <div className="login-card">

          <h2>
            <FaLeaf /> EcoTrack
          </h2>


          <p className="subtitle">

            {isLogin
              ? "Welcome Back!"
              : "Create your EcoTrack Account"}

          </p>


          {/* NAME */}

          {!isLogin && (

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

          )}


          {/* EMAIL */}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />


          {/* PASSWORD */}

          <div className="password-box">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <span
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >

              {showPassword
                ? <FaEyeSlash />
                : <FaEye />
              }

            </span>

          </div>


          {/* CONFIRM PASSWORD */}

          {!isLogin && (

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

          )}


          {/* FORGOT PASSWORD */}

          {isLogin && (

            <p className="forgot">
              Forgot Password?
            </p>

          )}


          {/* SUBMIT */}

          <button onClick={handleSubmit}>

            {isLogin
              ? "Login"
              : "Register"}

          </button>


          {/* SWITCH LOGIN / REGISTER */}

          <p className="switch">

            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}

            <span
              onClick={() =>
                setIsLogin(!isLogin)
              }
            >

              {isLogin
                ? " Register"
                : " Login"}

            </span>

          </p>

        </div>

      </div>

    </div>
  );
}

export default LoginPage;