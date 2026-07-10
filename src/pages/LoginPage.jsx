import { useState } from "react";
import "./LoginPage.css";
import heroImage from "../assets/hero.png";
import { FaLeaf, FaEye, FaEyeSlash } from "react-icons/fa";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      {/* Left Side */}
      <div className="login-left">
        <img src={heroImage} alt="EcoTrack" />
      </div>

      {/* Right Side */}
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

          {!isLogin && (
            <input type="text" placeholder="Full Name" />
          )}

          <input type="email" placeholder="Email Address" />

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
            />
          )}

          {isLogin && (
            <p className="forgot">Forgot Password?</p>
          )}

          <button>
            {isLogin ? "Login" : "Register"}
          </button>

          <p className="switch">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}

            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Register" : " Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;