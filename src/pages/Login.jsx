import React, { useState } from 'react';
import { email, z } from 'zod';
import { useAuth } from '../hooks/useAuth';
import './Login.css';
import { Link, useNavigate } from 'react-router';

function Login() {

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [errorMsg, setErrorMsg] = useState('');
  let [loading , setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const userSchema = z.object({
    email: z.email({ message: "Enter a valid Email" }),
    password: z.string().min(6, { message: "Password Should have minimum 6 characters" })
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      userSchema.parse({ email, password });
      console.log(`fields verified`);

      try {
        await login(email, password);
        navigate('/');

        setEmail(``);
        setPassword(``);
        setErrorMsg(``);

      } catch (error) {
        console.log(error)
        setErrorMsg(error.message);
      }

    } catch (err) {
      console.log(err.issues[0].message);
      setErrorMsg(err.issues[0].message);
    }finally{
      setLoading(false);
    }
  }




  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Task Manager</h1>
          <p>Welcome back! Sign in to continue.</p>
        </div>

        {errorMsg && <p className='error'>{errorMsg}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
          </div>

          <button className="login-btn" disabled={loading} > {loading? `Submitting..`:`Login`} </button>
        </form>

        <p className="register-text">
          Don't have an account?
          <Link to='/register'>
          <span> Register</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
