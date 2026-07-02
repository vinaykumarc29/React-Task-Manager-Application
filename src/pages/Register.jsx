import React, { useState } from 'react';
import z from 'zod';
import './Register.css';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

function Register() {

    let [name, setName] = useState(``);
    let [email, setEmail] = useState(``);
    let [password, setPassword] = useState(``);
    let [errorMsg, setErrorMsg] = useState(``);
    let [loading, setLoading] = useState(false);

    const {register} = useAuth();
    const navigate = useNavigate();


    const userSchema = z.object({
        name: z.string().min(3, { message: `Name Should have atleast 3 characters` }),
        email: z.email({ message: "Enter a valid Email" }),
        password: z.string().min(6, { message: "Password Should have minimum 6 characters" }),
    });

    const handleSubmit = async(e) => {

        try {
            e.preventDefault();
            setLoading(true);
            userSchema.parse({name , email, password });
            console.log(`fields verified`);

            try {
                await register(name, email, password);
                navigate('/');

                setName(``);
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
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <h1>Create Account</h1>
                    <p>Join Task Manager and organize your work efficiently.</p>
                </div>

                {errorMsg && <p className='error'>{errorMsg}</p>}

                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>

                    <button className="register-btn" disabled={loading} > {loading? `Submitting..`:`Register`}
                    </button>
                </form>

                <p className="login-text">
                    Already have an account?
                    <Link to='/login'>
                        <span> Login</span>
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register
