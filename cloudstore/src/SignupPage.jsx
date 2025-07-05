import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "aws-amplify/auth";
import "./SignupPage.css";

const SignupPage = () => {
  const [name, setName] = useState("");
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
      await signUp({
        username: email,
        password,
        attributes: {
          email,
          name,
        },
        autoSignIn: true,
      });
      setLoading(false);
      navigate("/"); // Redirect to login or confirmation page
    } catch (err) {
      setLoading(false);
      setError(err.message || "Sign up failed");
    }
  };

  return (
    <div className="signup-container">
      {/* Left Side - Cloud Storage Illustration */}
      <div className="signup-left">
        <div className="cloud-illustration">
          <div className="cloud-icon">
            <div className="small-cloud"></div>
          </div>
        </div>
        <h2 className="storage-title">Join Cloud Storage</h2>
        <p className="storage-subtitle">
          Create your account and start storing your files securely in the cloud with unlimited access.
        </p>
      </div>

      {/* Right Side - Signup Form */}
      <div className="signup-right">
        <div className="signup-form-container">
          <h1 className="signup-title">Create Account</h1>
          <p className="signup-subtitle">
            Sign up to get started with your cloud storage
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-wrapper">
                <span className="input-icon">🧑🏻</span>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Email address"
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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? "Creating Account..." : "Create Your Account"}
            </button>
          </form>

          <div className="divider">
            <span>OR CONTINUE WITH</span>
          </div>

          <button className="google-button">
            <div className="google-icon"></div>
            Sign up with Google
          </button>

          <p className="login-link">
            Already have an account? <Link to="/">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;