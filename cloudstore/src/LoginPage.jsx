
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "aws-amplify/auth";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn({ username: email, password });
      setLoading(false);
      navigate("/dashboard"); // Change to your dashboard route
    } catch (err) {
      setLoading(false);
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      {/* Left Side - Cloud Storage Illustration */}
      <div className="login-left">
        <div className="cloud-illustration">
          <div className="cloud-icon">
            <div className="small-cloud"></div>
          </div>
        </div>
        <h2 className="storage-title">Secure Cloud Storage</h2>
        <p className="storage-subtitle">
          Access your files anywhere, anytime with our secure and reliable cloud storage solution.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="login-right">
        <div className="login-form-container">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">
            Login to your account to access your files
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-options">
              <div className="checkbox-wrapper">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" className="checkbox-label">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login to Your Account"}
            </button>
          </form>

          <div className="divider">
            <span>OR CONTINUE WITH</span>
          </div>

          <button className="google-button">
            <div className="google-icon"></div>
            Continue with Google
          </button>

          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;