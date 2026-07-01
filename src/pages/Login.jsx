import React from 'react';
import './Login.css';

function Login() {
  return (
   <div className="login-container">
  <div className="login-card">
    <div className="login-header">
      <h1>Task Manager</h1>
      <p>Welcome back! Sign in to continue.</p>
    </div>

    <form className="login-form">
      <div className="input-group">
        <label>Email</label>
        <input type="email" placeholder="Enter your email" />
      </div>

      <div className="input-group">
        <label>Password</label>
        <input type="password" placeholder="Enter your password" />
      </div>

      <button className="login-btn">Login</button>
    </form>

    <p className="register-text">
      Don't have an account?
      <span> Register</span>
    </p>
  </div>
</div>
  )
}

export default Login
