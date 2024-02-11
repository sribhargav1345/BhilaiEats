import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar3 from '../../components/Common_In_All/Navbar_signup';
import './signup.css';

export default function SignUp() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "",contactNumber: ""});

    const handleSubmit = async (e) => {
        e.preventDefault();

        let apiUrl = "http://localhost:5000/api/CreateUser";

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                contact: credentials.contactNumber,
            }),
        });

        const json = await response.json();

        if (!json.success) {
            alert("Failed to create user. Please check your input and try again.");
        } else {
            alert("User created successfully!");
        }
    };

    const onChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    return (
        <div className='login-container'>
            <Navbar3 />
            <div className='container'>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <div className="card" style={{ width: "500px", height: "600px" }}>
                            <div className="card-body">
                                <h2 className="text-center mb-4">Sign Up</h2>
                                <hr />
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                                        <input type="text" className="form-control" name='contactNumber' value={credentials.contactNumber} onChange={onChange} />
                                    </div>
                                    <button type="submit" className="btn btn-success w-100 mb-3">Submit</button>
                                    <p className="text-center mb-0">Already have an account? <Link to="../login">Login</Link></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

